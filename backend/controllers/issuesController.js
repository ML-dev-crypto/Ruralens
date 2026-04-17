import Issue from '../models/Issue.js';

const LEVEL_ASSIGNEES = {
  1: 'ward_officer',
  2: 'zonal_officer',
  3: 'district_officer'
};

const VALID_STATUS = new Set(['pending', 'in_progress', 'resolved']);

export async function createIssue(req, res) {
  try {
    const { title, description, image_url, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ error: 'title, description, and location are required' });
    }

    const assignedTo = LEVEL_ASSIGNEES[1];
    const createdAt = new Date();

    const issue = await Issue.create({
      title,
      description,
      image_url: image_url || '',
      location,
      status: 'pending',
      current_level: 1,
      assigned_to: assignedTo,
      created_at: createdAt,
      updated_at: createdAt,
      escalation_history: [
        {
          level: 1,
          assigned_to: assignedTo,
          escalated_at: createdAt
        }
      ]
    });

    return res.status(201).json(issue);
  } catch (error) {
    console.error('Error creating issue:', error);
    return res.status(500).json({ error: 'Failed to create issue' });
  }
}

export async function listIssues(req, res) {
  try {
    const issues = await Issue.find().sort({ created_at: -1 });
    return res.json(issues);
  } catch (error) {
    console.error('Error listing issues:', error);
    return res.status(500).json({ error: 'Failed to fetch issues' });
  }
}

export async function updateIssueStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUS.has(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    issue.status = status;
    issue.updated_at = new Date();
    await issue.save();

    return res.json(issue);
  } catch (error) {
    console.error('Error updating issue status:', error);
    return res.status(500).json({ error: 'Failed to update issue status' });
  }
}

export { LEVEL_ASSIGNEES };
