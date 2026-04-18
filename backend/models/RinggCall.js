import mongoose from 'mongoose';

const transcriptTurnSchema = new mongoose.Schema({
  speaker: { type: String, default: 'unknown', trim: true },
  text: { type: String, default: '' },
}, { _id: false });

const ringgCallSchema = new mongoose.Schema({
  callId: { type: String, required: true, unique: true, index: true, trim: true },
  assistantId: { type: String, default: null, index: true },

  name: { type: String, default: null },
  toNumber: { type: String, default: null },
  fromNumber: { type: String, default: null },

  status: { type: String, default: 'unknown', index: true },
  callType: { type: String, default: null },
  callDirection: { type: String, default: null },
  createdAtRingg: { type: Date, default: null, index: true },
  callDuration: { type: Number, default: null },
  callCost: { type: Number, default: null },
  currency: { type: String, default: null },
  agentName: { type: String, default: null },

  summary: { type: String, default: '' },
  summaryByLang: {
    en: { type: String, default: '' },
    hi: { type: String, default: '' },
  },
  keyPoints: { type: [String], default: [] },
  actionItems: { type: [String], default: [] },
  classification: { type: String, default: null },
  transcriptTurns: { type: [transcriptTurnSchema], default: [] },

  callMeta: { type: mongoose.Schema.Types.Mixed, default: null },
  raw: { type: mongoose.Schema.Types.Mixed, default: null },

  source: { type: String, default: 'ringg' },
  lastSyncedAt: { type: Date, default: Date.now },
}, { timestamps: true });

ringgCallSchema.index({ createdAtRingg: -1 });
ringgCallSchema.index({ assistantId: 1, createdAtRingg: -1 });

export default mongoose.model('RinggCall', ringgCallSchema);
