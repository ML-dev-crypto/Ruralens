import mongoose from 'mongoose';

const escalationSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  assigned_to: { type: String, required: true },
  escalated_at: { type: Date, required: true }
}, { _id: false });

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image_url: { type: String, default: '' },
  location: { type: mongoose.Schema.Types.Mixed, required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved'],
    default: 'pending'
  },
  current_level: { type: Number, default: 1 },
  assigned_to: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  escalation_history: { type: [escalationSchema], default: [] }
});

issueSchema.pre('save', function updateTimestamp(next) {
  this.updated_at = new Date();
  next();
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
