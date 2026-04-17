import cron from 'node-cron';
import mongoose from 'mongoose';
import AnonymousReport from '../models/AnonymousReport.js';
import {
  getNextEscalationLevel,
  createEscalationRecord,
  calculateEscalationDeadline
} from './escalationService.js';

const ACTIVE_STATUSES = ['pending', 'acknowledged', 'assigned', 'in_progress'];

export function startAnonymousReportEscalationCron() {
  cron.schedule('0 * * * *', async () => {
    try {
      if (mongoose.connection.readyState !== 1) {
        console.log('⚠️ Anonymous report escalation cron skipped: MongoDB not connected');
        return;
      }

      const now = new Date();
      const reports = await AnonymousReport.find({
        status: { $in: ACTIVE_STATUSES },
        autoEscalateEnabled: true,
        escalationDeadline: { $ne: null, $lte: now }
      });

      for (const report of reports) {
        const nextLevel = getNextEscalationLevel(report.currentEscalationLevel);
        if (!nextLevel) {
          continue;
        }

        const escalationRecord = await createEscalationRecord(
          report.id,
          nextLevel.level,
          'Auto-escalated due to unresolved deadline breach'
        );

        report.escalationHistory.push(escalationRecord);
        report.currentEscalationLevel = nextLevel.level;
        report.escalationDeadline = calculateEscalationDeadline(nextLevel.level, now);

        report.statusUpdates.push({
          status: report.status,
          updatedBy: 'system',
          updatedByRole: 'system',
          message: `Auto-escalated to ${nextLevel.title} after deadline was exceeded`,
          timestamp: now
        });

        await report.save();
        console.log(`🚨 Auto-escalated anonymous report ${report.id} to ${nextLevel.title}`);
      }
    } catch (error) {
      console.error('❌ Anonymous report escalation cron failed:', error);
    }
  });
}
