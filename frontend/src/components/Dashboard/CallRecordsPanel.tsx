import { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Phone,
  RefreshCw,
  UserCircle2,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  fetchRinggCallRecords,
  fetchRinggCallSummary,
  type RinggCallRecord,
  type RinggCallSummary,
} from '../../services/ringgService';

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  ongoing: 'bg-blue-100 text-blue-800 border-blue-200',
  registered: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  failed: 'bg-rose-100 text-rose-800 border-rose-200',
  retry: 'bg-amber-100 text-amber-800 border-amber-200',
  cancelled: 'bg-slate-100 text-slate-700 border-slate-200',
  error: 'bg-rose-100 text-rose-800 border-rose-200',
};

function formatDateTime(value: string | null) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function formatDuration(seconds: number | null | undefined) {
  if (seconds == null || !Number.isFinite(seconds)) return '-';
  const total = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}m ${secs}s`;
}

function normalizeStatus(value: string | null | undefined) {
  return String(value || 'unknown').toLowerCase();
}

function parseCallTimestamp(value: string | null | undefined) {
  if (!value) return 0;
  const ts = new Date(value).getTime();
  return Number.isFinite(ts) ? ts : 0;
}

function sortCallsByLatest(records: RinggCallRecord[]) {
  return [...records].sort((a, b) => parseCallTimestamp(b.createdAt) - parseCallTimestamp(a.createdAt));
}

export default function CallRecordsPanel() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const tx = (en: string, hiText: string) => (hi ? hiText : en);

  const [calls, setCalls] = useState<RinggCallRecord[]>([]);
  const [loadingCalls, setLoadingCalls] = useState(false);
  const [callsError, setCallsError] = useState<string | null>(null);

  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<RinggCallSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const loadCalls = async () => {
    setLoadingCalls(true);
    setCallsError(null);
    try {
      const result = await fetchRinggCallRecords(30, 0);
      const sortedCalls = sortCallsByLatest(result.calls || []);
      setCalls(sortedCalls);

      const currentlySelectedStillExists = sortedCalls.some((call) => call.id === selectedCallId);
      if (!selectedCallId || !currentlySelectedStillExists) {
        const nextCallId = sortedCalls[0]?.id || null;
        setSelectedCallId(nextCallId);
        if (nextCallId) {
          await loadSummary(nextCallId);
        } else {
          setSelectedSummary(null);
        }
      }
    } catch (error: any) {
      setCallsError(error?.message || 'Failed to load calls');
    } finally {
      setLoadingCalls(false);
    }
  };

  const loadSummary = async (callId: string) => {
    setLoadingSummary(true);
    setSummaryError(null);
    try {
      const result = await fetchRinggCallSummary(callId, lang);
      setSelectedSummary(result);
    } catch (error: any) {
      setSummaryError(error?.message || 'Failed to load call summary');
      setSelectedSummary(null);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    loadCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedCallId) return;
    loadSummary(selectedCallId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleSelectCall = async (callId: string) => {
    setSelectedCallId(callId);
    await loadSummary(callId);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Phone size={18} className="text-blue-600" />
              {tx('Citizen Call Records', 'नागरिक कॉल रिकॉर्ड')}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {tx(
                'Ringg-style history: select a call to see summary and full details.',
                'Ringg हिस्ट्री जैसा दृश्य: कॉल चुनें और सारांश व विवरण देखें।'
              )}
            </p>
          </div>

          <button
            onClick={loadCalls}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <RefreshCw size={14} />
            {tx('Refresh', 'रिफ्रेश')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[420px]">
        <div className="lg:col-span-2 border-r border-slate-200">
          {loadingCalls ? (
            <div className="p-6 flex items-center gap-2 text-slate-600">
              <Loader2 size={16} className="animate-spin" />
              {tx('Loading calls...', 'कॉल लोड हो रही हैं...')}
            </div>
          ) : callsError ? (
            <div className="p-6 text-rose-700 bg-rose-50 border-b border-rose-100 flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5" />
              <span>{callsError}</span>
            </div>
          ) : calls.length === 0 ? (
            <div className="p-6 text-slate-500">{tx('No call records found.', 'कोई कॉल रिकॉर्ड नहीं मिला।')}</div>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">
              {calls.map((call, index) => {
                const isSelected = selectedCallId === call.id;
                const status = normalizeStatus(call.status);
                return (
                  <button
                    key={call.id}
                    onClick={() => handleSelectCall(call.id)}
                    className={`w-full text-left px-4 py-3 border-b border-slate-100 transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="font-medium text-slate-900 truncate">
                        {tx('Call Record', 'कॉल रिकॉर्ड')} #{calls.length - index}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                          STATUS_COLORS[status] || 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center justify-between gap-2">
                      <span className="truncate font-mono">{call.id}</span>
                      <span>{formatDuration(call.callDuration)}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{formatDateTime(call.createdAt)}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-3 p-5 bg-white">
          {!selectedCallId ? (
            <div className="h-full min-h-[220px] flex items-center justify-center text-slate-500">
              {tx('Select a call to view details.', 'विवरण देखने के लिए कॉल चुनें।')}
            </div>
          ) : loadingSummary ? (
            <div className="h-full min-h-[220px] flex items-center gap-2 text-slate-600">
              <Loader2 size={16} className="animate-spin" />
              {tx('Loading call details...', 'कॉल विवरण लोड हो रहा है...')}
            </div>
          ) : summaryError ? (
            <div className="text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-4 flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5" />
              <span>{summaryError}</span>
            </div>
          ) : selectedSummary ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 mb-1">{tx('Call ID', 'कॉल आईडी')}</div>
                  <div className="text-xs font-mono text-slate-800 break-all">{selectedSummary.callId}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 mb-1">{tx('Status', 'स्थिति')}</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedSummary.callMeta?.status || '-'}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-xs text-slate-500 mb-1">{tx('Duration', 'अवधि')}</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {formatDuration(selectedSummary.callMeta?.callDuration ?? null)}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="text-xs uppercase tracking-wider text-blue-700 font-semibold mb-2">
                  {tx('Conversation Summary', 'वार्तालाप सारांश')}
                </div>
                <p className="text-slate-900 leading-relaxed">{selectedSummary.summary || '-'}</p>
                {selectedSummary.classification ? (
                  <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-white border border-blue-200 text-blue-700">
                    <CheckCircle2 size={12} />
                    {tx('Classification', 'वर्गीकरण')}: {selectedSummary.classification}
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{tx('Key Points', 'मुख्य बिंदु')}</h4>
                  {selectedSummary.keyPoints?.length ? (
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedSummary.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">{tx('No key points available.', 'कोई मुख्य बिंदु उपलब्ध नहीं।')}</p>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{tx('Action Items', 'कार्रवाई बिंदु')}</h4>
                  {selectedSummary.actionItems?.length ? (
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedSummary.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500">{tx('No action items available.', 'कोई कार्रवाई बिंदु उपलब्ध नहीं।')}</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock3 size={14} className="text-slate-600" />
                  {tx('Transcript Preview', 'ट्रांसक्रिप्ट प्रीव्यू')}
                </h4>
                {selectedSummary.transcriptTurns?.length ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedSummary.transcriptTurns.slice(0, 12).map((turn, index) => (
                      <div key={`${turn.speaker}-${index}`} className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                        <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1 flex items-center gap-1">
                          <UserCircle2 size={12} />
                          {turn.speaker}
                        </div>
                        <div className="text-sm text-slate-800">{turn.text}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">{tx('No transcript available.', 'कोई ट्रांसक्रिप्ट उपलब्ध नहीं।')}</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
