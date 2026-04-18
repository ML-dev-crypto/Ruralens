import mongoose from 'mongoose';
import RinggCall from '../models/RinggCall.js';

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

function parseDateOrNull(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function sanitizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || '').trim())
    .filter(Boolean);
}

function sanitizeTranscriptTurns(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((turn) => {
      const speaker = String(turn?.speaker || 'unknown').trim() || 'unknown';
      const text = String(turn?.text || '').trim();
      if (!text) return null;
      return { speaker, text };
    })
    .filter(Boolean);
}

export async function persistRinggCallRecords({ records = [], assistantId = null }) {
  if (!isDatabaseConnected() || !Array.isArray(records) || records.length === 0) {
    return { persisted: 0, skipped: true };
  }

  const ops = records
    .filter((record) => Boolean(record?.id))
    .map((record) => ({
      updateOne: {
        filter: { callId: String(record.id) },
        update: {
          $set: {
            assistantId,
            name: record.name || null,
            toNumber: record.toNumber || null,
            fromNumber: record.fromNumber || null,
            status: record.status || 'unknown',
            callType: record.callType || null,
            callDirection: record.callDirection || null,
            createdAtRingg: parseDateOrNull(record.createdAt),
            callDuration: Number.isFinite(Number(record.callDuration)) ? Number(record.callDuration) : null,
            callCost: Number.isFinite(Number(record.callCost)) ? Number(record.callCost) : null,
            currency: record.currency || null,
            agentName: record.agentName || null,
            raw: record.raw || null,
            lastSyncedAt: new Date(),
          },
          $setOnInsert: {
            callId: String(record.id),
            source: 'ringg',
          },
        },
        upsert: true,
      },
    }));

  if (ops.length === 0) return { persisted: 0, skipped: true };

  const result = await RinggCall.bulkWrite(ops, { ordered: false });
  const persisted = (result.modifiedCount || 0) + (result.upsertedCount || 0);
  return { persisted, skipped: false };
}

export async function persistRinggCallSummary({
  assistantId = null,
  callId = null,
  lang = 'en',
  summary = '',
  keyPoints = [],
  actionItems = [],
  classification = null,
  transcriptTurns = [],
  callMeta = null,
}) {
  if (!isDatabaseConnected() || !callId) {
    return { persisted: 0, skipped: true };
  }

  const normalizedLang = String(lang || 'en').toLowerCase() === 'hi' ? 'hi' : 'en';
  const cleanSummary = String(summary || '').trim();
  const cleanKeyPoints = sanitizeStringArray(keyPoints);
  const cleanActionItems = sanitizeStringArray(actionItems);
  const cleanTranscriptTurns = sanitizeTranscriptTurns(transcriptTurns);

  const languageSummaryField = normalizedLang === 'hi' ? 'summaryByLang.hi' : 'summaryByLang.en';

  await RinggCall.updateOne(
    { callId: String(callId) },
    {
      $set: {
        assistantId,
        summary: cleanSummary,
        [languageSummaryField]: cleanSummary,
        keyPoints: cleanKeyPoints,
        actionItems: cleanActionItems,
        classification: classification || null,
        transcriptTurns: cleanTranscriptTurns,
        callMeta: callMeta || null,
        status: callMeta?.status || undefined,
        callType: callMeta?.callType || undefined,
        createdAtRingg: parseDateOrNull(callMeta?.calledOn) || undefined,
        callDuration: Number.isFinite(Number(callMeta?.callDuration)) ? Number(callMeta.callDuration) : undefined,
        agentName: callMeta?.agentName || undefined,
        lastSyncedAt: new Date(),
      },
      $setOnInsert: {
        callId: String(callId),
        source: 'ringg',
      },
    },
    { upsert: true }
  );

  return { persisted: 1, skipped: false };
}
