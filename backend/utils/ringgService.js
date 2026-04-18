import axios from 'axios';

const DEFAULT_BASE_URL = 'https://prod-api.ringg.ai/ca/api/v0';

function buildClient(apiKey, baseURL) {
  if (!apiKey) {
    throw new Error('Missing Ringg API key. Set RINGG_API_KEY or pass apiKey.');
  }

  return axios.create({
    baseURL: baseURL || DEFAULT_BASE_URL,
    timeout: 20000,
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
  });
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function toFiniteNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeCallRecord(call) {
  const id = call?.id || call?.call_id || call?.callId || null;
  const status = call?.status || call?.call_status || call?.sub_status || call?.call_sub_status || 'unknown';
  const callType = call?.call_type || call?.call_direction || call?.type || 'unknown';

  return {
    id,
    name: call?.name || call?.callee_name || call?.calleeName || 'Unknown Citizen',
    toNumber: call?.to_number || call?.to || null,
    fromNumber: call?.from_number || call?.from || null,
    status,
    callType,
    callDirection: callType,
    createdAt:
      call?.created_at ||
      call?.called_on ||
      call?.call_attempt_time ||
      call?.initiation_time ||
      null,
    callDuration: toFiniteNumber(call?.call_duration),
    callCost: toFiniteNumber(call?.call_cost),
    currency: call?.currency || null,
    agentName:
      call?.agent_name ||
      (call?.agent && typeof call.agent === 'object' ? call.agent.name || call.agent.agent_name : null) ||
      null,
    raw: call,
  };
}

function pickCallsFromHistoryPayload(payload) {
  if (!payload || typeof payload !== 'object') return [];

  const topLevelCandidates = [
    payload.calls,
    payload.call_history,
    payload.history,
    payload.data,
  ];

  for (const candidate of topLevelCandidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  if (payload.data && typeof payload.data === 'object') {
    const nestedCandidates = [
      payload.data.calls,
      payload.data.call_history,
      payload.data.history,
      payload.data.data,
    ];
    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) return candidate;
    }
  }

  return [];
}

function pickCallFromDetailsPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;

  if (payload.call && typeof payload.call === 'object') return payload.call;
  if (payload.data && typeof payload.data === 'object') return payload.data;
  return payload;
}

function extractTranscriptTurns(callDetails) {
  const raw =
    asArray(callDetails?.transcript).length
      ? asArray(callDetails?.transcript)
      : asArray(callDetails?.transcription_url).length
        ? asArray(callDetails?.transcription_url)
        : asArray(callDetails?.transcription);

  if (!raw.length && typeof callDetails?.transcription_url === 'string') {
    return callDetails.transcription_url
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^([a-zA-Z_]+)\s*:\s*(.*)$/);
        if (!match) return { speaker: 'unknown', text: line };

        const speaker = match[1].toLowerCase().includes('bot') ? 'assistant' : match[1].toLowerCase();
        const text = match[2].trim();
        return text ? { speaker, text } : null;
      })
      .filter(Boolean);
  }

  return raw
    .map((turn) => {
      if (!turn || typeof turn !== 'object') return null;

      if (typeof turn.bot === 'string') {
        return { speaker: 'assistant', text: turn.bot.trim() };
      }
      if (typeof turn.user === 'string') {
        return { speaker: 'user', text: turn.user.trim() };
      }

      const speaker = String(turn.role || turn.speaker || '').toLowerCase();
      const text = String(turn.content || turn.text || '').trim();
      if (!text) return null;

      return {
        speaker: speaker || 'unknown',
        text,
      };
    })
    .filter(Boolean);
}

function fallbackSummaryFromTranscript(turns) {
  if (!turns.length) {
    return 'No transcript available yet for this call.';
  }

  const userTurns = turns.filter((t) => t.speaker.includes('user')).map((t) => t.text);
  const assistantTurns = turns.filter((t) => t.speaker.includes('assistant') || t.speaker.includes('bot')).map((t) => t.text);

  const userPart = userTurns.slice(0, 2).join(' ');
  const assistantPart = assistantTurns.slice(0, 2).join(' ');

  if (userPart && assistantPart) {
    return `Assistant discussed: ${assistantPart} User responses included: ${userPart}`;
  }
  if (assistantPart) {
    return `Assistant conversation highlights: ${assistantPart}`;
  }
  return `User conversation highlights: ${userPart}`;
}

function extractSummary(callDetails) {
  const platformAnalysis =
    callDetails?.platform_analysis?.analysis_data ||
    callDetails?.platform_analysis ||
    callDetails?.analysis_data ||
    {};

  const clientAnalysis =
    callDetails?.client_analysis?.analysis_data ||
    callDetails?.client_analysis ||
    {};

  const summary =
    platformAnalysis?.summary ||
    clientAnalysis?.summary ||
    callDetails?.platform_analysis?.summary ||
    callDetails?.analysis_data?.summary ||
    callDetails?.summary ||
    callDetails?.analysis_summary ||
    null;

  const keyPoints = asArray(
    platformAnalysis?.key_points ||
    clientAnalysis?.key_points ||
    callDetails?.platform_analysis?.key_points ||
    callDetails?.analysis_data?.key_points ||
    callDetails?.key_points
  );
  const actionItems = asArray(
    platformAnalysis?.action_items ||
    clientAnalysis?.action_items ||
    callDetails?.platform_analysis?.action_items ||
    callDetails?.analysis_data?.action_items ||
    callDetails?.action_items
  );
  const classification =
    platformAnalysis?.classification ||
    clientAnalysis?.classification ||
    callDetails?.platform_analysis?.classification ||
    callDetails?.analysis_data?.classification ||
    callDetails?.classification ||
    null;

  const transcriptTurns = extractTranscriptTurns(callDetails);

  return {
    summary: summary || fallbackSummaryFromTranscript(transcriptTurns),
    keyPoints,
    actionItems,
    classification,
    transcriptTurns,
  };
}

export async function getAssistants({ apiKey, baseURL }) {
  const client = buildClient(apiKey, baseURL);
  const { data } = await client.get('/agent/all');
  return data;
}

export async function getCallHistory({ apiKey, baseURL, assistantId, page, limit = 20, offset }) {
  const client = buildClient(apiKey, baseURL);
  const params = {};

  if (typeof page === 'number' && Number.isFinite(page)) {
    params.page = page;
  }

  if (typeof limit === 'number' && Number.isFinite(limit)) {
    params.limit = limit;
  }

  if (typeof offset === 'number' && Number.isFinite(offset)) {
    params.offset = offset;
  }

  if (assistantId) {
    params.agent_id = assistantId;
  }

  const { data } = await client.get('/calling/history', { params });
  const calls = pickCallsFromHistoryPayload(data);
  const total =
    toFiniteNumber(data?.total) ||
    toFiniteNumber(data?.count) ||
    toFiniteNumber(data?.data?.total) ||
    calls.length;

  return { raw: data, calls, total };
}

export async function getCallRecords({ apiKey, baseURL, assistantId, limit = 20, offset = 0 }) {
  const { calls, total } = await getCallHistory({
    apiKey,
    baseURL,
    assistantId,
    limit,
    offset,
  });

  return {
    calls: calls.map(normalizeCallRecord).filter((c) => Boolean(c.id)),
    total,
    limit,
    offset,
  };
}

export async function getCallDetails({ apiKey, baseURL, callId }) {
  if (!callId) {
    throw new Error('callId is required to fetch call details.');
  }

  const client = buildClient(apiKey, baseURL);
  let data;
  try {
    // Ringg call-details expects query parameter `id`.
    ({ data } = await client.get('/calling/call-details', {
      params: { id: callId, send_analysis: true },
    }));
  } catch (error) {
    // Backward-compatible fallback for providers/proxies expecting call_id.
    if (error?.response?.status === 422 || error?.response?.status === 400) {
      ({ data } = await client.get('/calling/call-details', {
        params: { call_id: callId, send_analysis: true },
      }));
    } else {
      throw error;
    }
  }

  const call = pickCallFromDetailsPayload(data);
  return { raw: data, call };
}

export async function getLatestCallSummary({ apiKey, baseURL, assistantId }) {
  if (!assistantId) {
    throw new Error('assistantId is required when callId is not provided.');
  }

  const { calls } = await getCallHistory({
    apiKey,
    baseURL,
    assistantId,
    page: 1,
    limit: 20,
  });

  if (!calls.length) {
    return {
      callId: null,
      summary: 'No calls found yet for this assistant.',
      keyPoints: [],
      actionItems: [],
      transcriptTurns: [],
      callMeta: null,
    };
  }

  const matching = calls.find((c) => {
    const agentId = c?.agent_id || c?.agentId;
    return String(agentId || '') === String(assistantId);
  }) || calls[0];

  const callId = matching?.call_id || matching?.callId || matching?.id;
  if (!callId) {
    throw new Error('Could not identify call_id from Ringg call history response.');
  }

  const { call } = await getCallDetails({ apiKey, baseURL, callId });
  const extracted = extractSummary(call || {});

  return {
    callId,
    ...extracted,
    callMeta: {
      status: call?.status || call?.call_status || call?.sub_status || call?.call_sub_status || null,
      callType: call?.call_type || call?.call_direction || null,
      calledOn: call?.called_on || call?.initiation_time || null,
      callDuration: call?.call_duration || null,
      agentName: call?.agent_name || null,
    },
  };
}

export async function getCallSummaryById({ apiKey, baseURL, callId }) {
  const { call } = await getCallDetails({ apiKey, baseURL, callId });
  const extracted = extractSummary(call || {});

  return {
    callId,
    ...extracted,
    callMeta: {
      status: call?.status || call?.call_status || call?.sub_status || call?.call_sub_status || null,
      callType: call?.call_type || call?.call_direction || null,
      calledOn: call?.called_on || call?.initiation_time || null,
      callDuration: call?.call_duration || null,
      agentName: call?.agent_name || null,
      agentId: call?.agent_id || null,
    },
  };
}
