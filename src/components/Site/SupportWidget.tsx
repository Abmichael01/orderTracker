import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { Headphones, LoaderCircle, MessageCircle, Send, X } from 'lucide-react';
import Pusher from 'pusher-js';
import { toast } from 'sonner';

import {
  authorizeTrackingSupportRealtime,
  getTrackingSupportThread,
  sendTrackingSupportMessage,
  submitTrackingSupport,
} from '@/api/apiEndpoints';
import {
  forgetSupportSession,
  loadSupportSession,
  rememberSupportSession,
  SUPPORT_SESSION_EVENT,
} from '@/lib/supportSession';
import type { StoredSupportSession, TrackingSupportThread } from '@/types';

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<StoredSupportSession | null>(() => loadSupportSession());
  const [thread, setThread] = useState<TrackingSupportThread | null>(null);
  const [trackingId, setTrackingId] = useState('');
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingThread, setLoadingThread] = useState(Boolean(session));
  const [threadError, setThreadError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshThread = useCallback(async (activeSession: StoredSupportSession) => {
    try {
      setThread(await getTrackingSupportThread(activeSession));
      setThreadError(false);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        forgetSupportSession();
        setSession(null);
        setThread(null);
      } else {
        setThreadError(true);
      }
    } finally {
      setLoadingThread(false);
    }
  }, []);

  useEffect(() => {
    if (session) refreshThread(session);
  }, [refreshThread, session]);

  useEffect(() => {
    const syncSession = (event: Event) => {
      const next = (event as CustomEvent<StoredSupportSession | null>).detail;
      setSession(next);
      if (next) {
        setOpen(true);
        setLoadingThread(true);
      }
    };
    window.addEventListener(SUPPORT_SESSION_EVENT, syncSession);
    return () => window.removeEventListener(SUPPORT_SESSION_EVENT, syncSession);
  }, []);

  useEffect(() => {
    if (!session?.realtime.enabled) return;
    const pusher = new Pusher(session.realtime.key, {
      cluster: session.realtime.cluster,
      forceTLS: true,
      channelAuthorization: {
        customHandler: async (params, callback) => {
          try {
            callback(null, await authorizeTrackingSupportRealtime(session, params.socketId, params.channelName));
          } catch (error) {
            callback(error instanceof Error ? error : new Error('Realtime authorization failed.'), null);
          }
        },
      },
    });
    const channel = pusher.subscribe(session.channel);
    const update = () => refreshThread(session);
    channel.bind('support.updated', update);
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(session.channel);
      pusher.disconnect();
    };
  }, [refreshThread, session]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [thread?.conversation.length, open]);

  const startConversation = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      const response = await submitTrackingSupport({
        tracking_id: trackingId.trim(),
        source: 'parcel_finda',
      });
      const next = rememberSupportSession(response);
      setSession(next);
      setLoadingThread(true);
      setTrackingId('');
    } catch {
      toast.error('Could not start the conversation. Check your tracking ID and details.');
    } finally {
      setBusy(false);
    }
  };

  const sendReply = async (event: FormEvent) => {
    event.preventDefault();
    if (!session || !reply.trim()) return;
    setBusy(true);
    try {
      await sendTrackingSupportMessage(session, reply.trim());
      setReply('');
      await refreshThread(session);
    } catch {
      toast.error('Your message could not be sent. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const startAnother = () => {
    forgetSupportSession();
    setSession(null);
    setThread(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] sm:bottom-7 sm:right-7">
      {open && (
        <section aria-label="Parcel support conversation" className="mb-3 flex h-[min(650px,calc(100dvh-7rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-[0_24px_80px_rgba(15,35,29,0.24)]">
          <header className="flex items-center justify-between bg-[#14231f] px-5 py-4 text-white">
            <div><p className="text-sm font-semibold">Parcel support</p><p className="mt-0.5 text-[11px] text-white/55">{session?.realtime.enabled ? 'Live conversation' : 'Replies continue by email'}</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support" className="grid size-9 place-items-center rounded-lg text-white/65 transition hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
          </header>

          {session ? (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f5f7f5] p-4">
                {loadingThread ? <div className="grid h-full place-items-center"><LoaderCircle className="size-5 animate-spin text-emerald-700" /></div> : threadError && !thread ? <div className="grid h-full place-items-center text-center"><div><p className="text-sm text-slate-600">The conversation could not load.</p><button type="button" onClick={() => refreshThread(session)} className="mt-3 text-sm font-semibold text-emerald-700">Try again</button></div></div> : thread?.conversation.map((entry) => (
                  <article key={entry.id} className={`flex ${entry.direction === 'customer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${entry.direction === 'customer' ? 'rounded-br-md bg-[#14231f] text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'}`}>
                      <p className="whitespace-pre-wrap break-words">{entry.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <form onSubmit={sendReply} className="border-t border-slate-200 bg-white p-3">
                <div className="flex items-end gap-2 rounded-xl border border-slate-300 bg-white p-2 focus-within:border-emerald-700">
                  <textarea aria-label="Message support" rows={1} maxLength={10000} value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a message" className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none" />
                  <button type="submit" disabled={busy || !reply.trim()} aria-label="Send message" className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"><Send className="size-4" /></button>
                </div>
                <button type="button" onClick={startAnother} className="mt-2 text-xs font-medium text-slate-500 hover:text-slate-800">Start a different request</button>
              </form>
            </>
          ) : (
            <form onSubmit={startConversation} className="flex flex-1 flex-col justify-center p-5 text-[#14231f]">
              <div><h2 className="text-xl font-medium">Start a conversation</h2><p className="mt-1 text-xs leading-5 text-slate-500">Enter the tracking ID on your parcel record.</p></div>
              <input required autoFocus value={trackingId} onChange={(event) => setTrackingId(event.target.value)} placeholder="Tracking ID" className="mt-6 h-12 w-full rounded-lg border border-slate-300 px-3 font-mono text-sm outline-none focus:border-emerald-700" />
              <button type="submit" disabled={busy || !trackingId.trim()} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground disabled:opacity-50">{busy ? <LoaderCircle className="size-4 animate-spin" /> : <MessageCircle className="size-4" />} Continue</button>
            </form>
          )}
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close parcel support' : 'Open parcel support'} className="ml-auto grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_14px_35px_rgba(0,135,92,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,135,92,0.38)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
        {open ? <X className="size-5" /> : session ? <MessageCircle className="size-5" /> : <Headphones className="size-5" />}
      </button>
    </div>
  );
}
