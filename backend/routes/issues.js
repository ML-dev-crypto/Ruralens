import express from 'express';
import {
  createIssue,
  listIssues,
  updateIssueStatus
} from '../controllers/issuesController.js';

const router = express.Router();

router.post('/', createIssue);
router.get('/', listIssues);
router.patch('/:id/status', updateIssueStatus);

export default router;
