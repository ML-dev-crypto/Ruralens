import cron from 'node-cron';
import mongoose from 'mongoose';
import Issue from '../models/Issue.js';
import { LEVEL_ASSIGNEES } from '../controllers/issuesController.js';

const LEVEL_THRESHOLDS_HOURS = {
  1: 48,
  2: 72,
  3: 120
};

const MAX_LEVEL = 3;

function getLastEscalationTime(issue) {
  if (issue.escalation_history && issue.escalation_history.length > 0) {
    return issue.escalation_history[issue.escalation_history.length - 1].escalated_at;
  }
  return issue.created_at;
}

export function startEscalationCron() {
  cron.schedule('0 * * * *', async () => {
    try {
      if (mongoose.connection.readyState !== 1) {
        console.log('⚠️ Escalation cron skipped: MongoDB not connected');
        return;
      }

      const issues = await Issue.find({ status: { $ne: 'resolved' } });
      const now = new Date();

      for (const issue of issues) {
        const lastEscalationAt = getLastEscalationTime(issue);
        const elapsedHours = (now.getTime() - new Date(lastEscalationAt).getTime()) / (1000 * 60 * 60);
        const thresholdHours = LEVEL_THRESHOLDS_HOURS[issue.current_level] || LEVEL_THRESHOLDS_HOURS[1];

        if (elapsedHours < thresholdHours) {
          continue;
        }

        if (issue.current_level >= MAX_LEVEL) {
          console.log(`ℹ️ Max escalation level reached for issue ${issue._id}`);
          continue;
        }

        const nextLevel = issue.current_level + 1;
        const nextAssignee = LEVEL_ASSIGNEES[nextLevel] || 'unassigned';

        issue.current_level = nextLevel;
        issue.assigned_to = nextAssignee;
        issue.escalation_history.push({
          level: nextLevel,
          assigned_to: nextAssignee,
          escalated_at: now
        });
        issue.updated_at = now;

        await issue.save();

        console.log(`🚨 Issue ${issue._id} escalated to level ${nextLevel} (${nextAssignee})`);
      }
    } catch (error) {
      console.error('❌ Escalation cron failed:', error);
    }
  });
}
