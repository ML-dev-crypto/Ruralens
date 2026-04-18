import express from 'express';
import {
  getAssistants,
  getCallRecords,
  getLatestCallSummary,
  getCallSummaryById,
} from '../utils/ringgService.js';
import { translateTextToHindi } from '../utils/geminiService.js';
import {
  persistRinggCallRecords,
  persistRinggCallSummary,
} from '../utils/ringgPersistenceService.js';

const router = express.Router();

function resolveConfig(req) {
  const fromQuery = req.query || {};
  const fromBody = req.body || {};

  const apiKey = fromBody.apiKey || fromQuery.apiKey || process.env.RINGG_API_KEY;
  const assistantId = fromBody.assistantId || fromQuery.assistantId || process.env.RINGG_ASSISTANT_ID;
  const callId = fromBody.callId || fromQuery.callId || null;
  const lang = String(fromBody.lang || fromQuery.lang || 'en').toLowerCase() === 'hi' ? 'hi' : 'en';
  const baseURL = process.env.RINGG_API_BASE_URL || 'https://prod-api.ringg.ai/ca/api/v0';

  return { apiKey, assistantId, callId, baseURL, lang };
}

router.get('/status', async (req, res) => {
  const { apiKey, baseURL } = resolveConfig(req);

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'Missing Ringg API key. Set RINGG_API_KEY or pass apiKey.',
    });
  }

  try {
    const assistantPayload = await getAssistants({ apiKey, baseURL });
    const assistants = assistantPayload?.data?.agents || assistantPayload?.agents || [];

    return res.json({
      success: true,
      baseURL,
      assistantsCount: Array.isArray(assistants) ? assistants.length : 0,
      configuredAssistantId: process.env.RINGG_ASSISTANT_ID || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get('/call-summary', async (req, res) => {
  const { apiKey, assistantId, callId, baseURL, lang } = resolveConfig(req);

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'Missing Ringg API key. Set RINGG_API_KEY or pass apiKey.',
    });
  }

  try {
    const result = callId
      ? await getCallSummaryById({ apiKey, baseURL, callId })
      : await getLatestCallSummary({ apiKey, baseURL, assistantId });

    const translatedSummary = lang === 'hi'
      ? await translateTextToHindi(result.summary || '')
      : (result.summary || '');

    try {
      await persistRinggCallSummary({
        assistantId: assistantId || null,
        callId: result.callId || callId || null,
        lang,
        summary: translatedSummary,
        keyPoints: result.keyPoints || [],
        actionItems: result.actionItems || [],
        classification: result.classification || null,
        transcriptTurns: result.transcriptTurns || [],
        callMeta: result.callMeta || null,
      });
    } catch (persistError) {
      console.warn('⚠️ Failed to persist Ringg call summary:', persistError.message);
    }

    return res.json({
      success: true,
      source: callId ? 'call-id' : 'assistant-latest',
      assistantId: assistantId || null,
      lang,
      ...result,
      summary: translatedSummary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get('/calls', async (req, res) => {
  const { apiKey, assistantId, baseURL } = resolveConfig(req);

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'Missing Ringg API key. Set RINGG_API_KEY or pass apiKey.',
    });
  }

  const parsedLimit = Number.parseInt(String(req.query.limit || '20'), 10);
  const parsedOffset = Number.parseInt(String(req.query.offset || '0'), 10);
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 100) : 20;
  const offset = Number.isFinite(parsedOffset) ? Math.max(parsedOffset, 0) : 0;

  try {
    const result = await getCallRecords({
      apiKey,
      baseURL,
      assistantId,
      limit,
      offset,
    });

    try {
      await persistRinggCallRecords({
        records: result.calls || [],
        assistantId: assistantId || null,
      });
    } catch (persistError) {
      console.warn('⚠️ Failed to persist Ringg call records:', persistError.message);
    }

    return res.json({
      success: true,
      assistantId: assistantId || null,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post('/call-summary', async (req, res) => {
  const { apiKey, assistantId, callId, baseURL, lang } = resolveConfig(req);

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'Missing Ringg API key. Set RINGG_API_KEY or pass apiKey.',
    });
  }

  try {
    const result = callId
      ? await getCallSummaryById({ apiKey, baseURL, callId })
      : await getLatestCallSummary({ apiKey, baseURL, assistantId });

    const translatedSummary = lang === 'hi'
      ? await translateTextToHindi(result.summary || '')
      : (result.summary || '');

    try {
      await persistRinggCallSummary({
        assistantId: assistantId || null,
        callId: result.callId || callId || null,
        lang,
        summary: translatedSummary,
        keyPoints: result.keyPoints || [],
        actionItems: result.actionItems || [],
        classification: result.classification || null,
        transcriptTurns: result.transcriptTurns || [],
        callMeta: result.callMeta || null,
      });
    } catch (persistError) {
      console.warn('⚠️ Failed to persist Ringg call summary:', persistError.message);
    }

    return res.json({
      success: true,
      source: callId ? 'call-id' : 'assistant-latest',
      assistantId: assistantId || null,
      lang,
      ...result,
      summary: translatedSummary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
