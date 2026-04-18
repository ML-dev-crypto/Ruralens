import { API_URL } from '../config/api';

export interface RinggCallRecord {
  id: string;
  name: string;
  toNumber: string | null;
  fromNumber: string | null;
  status: string;
  callType: string;
  callDirection: string;
  createdAt: string | null;
  callDuration: number | null;
  callCost: number | null;
  currency: string | null;
  agentName: string | null;
}

export interface RinggCallSummary {
  callId: string;
  summary: string;
  classification?: string | null;
  keyPoints: string[];
  actionItems: string[];
  transcriptTurns: Array<{ speaker: string; text: string }>;
  callMeta?: {
    status?: string | null;
    callType?: string | null;
    calledOn?: string | null;
    callDuration?: number | null;
    agentName?: string | null;
    agentId?: string | null;
  } | null;
}

interface RinggCallsResponse {
  success: boolean;
  calls: RinggCallRecord[];
  total: number;
  limit: number;
  offset: number;
  error?: string;
}

interface RinggSummaryResponse extends RinggCallSummary {
  success: boolean;
  error?: string;
}

export async function fetchRinggCallRecords(limit = 20, offset = 0): Promise<RinggCallsResponse> {
  const response = await fetch(`${API_URL}/api/ringg/calls?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || 'Failed to fetch call records.');
  }

  return data as RinggCallsResponse;
}

export async function fetchRinggCallSummary(callId: string, lang: 'en' | 'hi' = 'en'): Promise<RinggCallSummary> {
  const response = await fetch(
    `${API_URL}/api/ringg/call-summary?callId=${encodeURIComponent(callId)}&lang=${encodeURIComponent(lang)}`
  );
  const data = await response.json();

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || 'Failed to fetch call summary.');
  }

  return data as RinggSummaryResponse;
}
