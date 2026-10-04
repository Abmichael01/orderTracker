import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Headphones, Mail, PackageSearch, Send } from 'lucide-react';
import { toast } from 'sonner';

import { submitTrackingSupport } from '@/api/apiEndpoints';

type ContactFormProps = {
  trackingId?: string;
};

const EMPTY_FORM = {
  trackingId: '',
  name: '',
  email: '',
  subject: '',
  message: '',
};

function supportError(error: unknown) {
  if (typeof error === 'object' && error && 'response' in error) {
    const response = (error as { response?: { data?: Record<string, string | string[]> } }).response;
    const data = response?.data;
    const detail = data?.tracking_id || data?.detail || data?.error;
    if (Array.isArray(detail)) return detail[0];
    if (typeof detail === 'string') return detail;
  }
  return 'We could not send your request. Check the details and try again.';
}

export default function ContactForm({ trackingId = '' }: ContactFormProps) {
  const [form, setForm] = useState({ ...EMPTY_FORM, trackingId });
  const [isSending, setIsSending] = useState(false);
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (trackingId) setForm((current) => ({ ...current, trackingId }));
  }, [trackingId]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const response = await submitTrackingSupport({
        tracking_id: form.trackingId.trim(),
        source: 'parcel_finda',
        customer_name: form.name.trim(),
        customer_email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setReference(response.id.slice(0, 8).toUpperCase());
      setForm((current) => ({ ...EMPTY_FORM, trackingId: current.trackingId }));
      toast.success('Support request received');
    } catch (error) {
      toast.error(supportError(error));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-6 bg-[#0d1f1b] px-4 py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#122923] shadow-2xl lg:grid-cols-[0.78fr_1.22fr]">
        <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-300 text-[#0d1f1b]">
              <Headphones className="size-6" />
            </div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">Help with this parcel</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              Include the tracking ID from your parcel page. Your request goes directly to the team responsible for that tracking record.
            </p>
            <div className="mt-10 space-y-5 text-sm">
              <div className="flex gap-3">
                <PackageSearch className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                <div><p className="font-semibold">Matched to the right parcel</p><p className="mt-1 text-white/45">We use the tracking ID to route your message.</p></div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-emerald-300" />
                <div><p className="font-semibold">Response by email</p><p className="mt-1 text-white/45">Use an inbox you can access for the reply.</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f7faf8] p-7 text-[#14231f] sm:p-10">
          {reference ? (
            <div className="flex min-h-[510px] flex-col items-center justify-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><CheckCircle2 className="size-8" /></div>
              <h3 className="mt-6 text-2xl font-bold">Request received</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">The parcel owner can now see your message in their support inbox.</p>
              <p className="mt-6 rounded-full bg-[#14231f] px-4 py-2 font-mono text-xs text-white">Reference {reference}</p>
              <button type="button" onClick={() => setReference('')} className="mt-8 text-sm font-semibold text-emerald-700 hover:text-emerald-800">Send another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-2xl font-bold">Contact parcel support</h3>
                <p className="mt-2 text-sm text-slate-500">All fields are required.</p>
              </div>
              <label className="block text-sm font-semibold">Tracking ID
                <input required value={form.trackingId} onChange={(event) => update('trackingId', event.target.value)} placeholder="e.g. PF-2048" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 font-mono text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold">Your name
                  <input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Full name" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                </label>
                <label className="block text-sm font-semibold">Email address
                  <input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@example.com" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
                </label>
              </div>
              <label className="block text-sm font-semibold">What do you need help with?
                <input required maxLength={160} value={form.subject} onChange={(event) => update('subject', event.target.value)} placeholder="Delivery status, address, parcel details…" className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
              </label>
              <label className="block text-sm font-semibold">Message
                <textarea required maxLength={5000} rows={6} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Describe the issue and include any useful details." className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
              </label>
              <button type="submit" disabled={isSending} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                <Send className="size-4" /> {isSending ? 'Sending…' : 'Send support request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
