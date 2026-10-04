import { Headphones, PackageSearch } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#091713] px-4 py-14 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <div className="flex items-center gap-3"><img src="/logo.png" alt="" className="size-9" /><p className="text-xl font-bold">ParcelFinda</p></div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">Track parcel records with one ID and contact the right support team when a shipment needs attention.</p>
        </div>
        <div>
          <p className="font-semibold text-emerald-300">Explore</p>
          <div className="mt-5 space-y-3 text-sm text-white/60"><a className="block hover:text-white" href="/#home">Track a parcel</a><a className="block hover:text-white" href="/#faq">Help centre</a><a className="block hover:text-white" href="/#contact">Contact support</a></div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Headphones className="size-6 text-emerald-300" />
          <p className="mt-4 font-semibold">Need help with a parcel?</p>
          <p className="mt-2 text-sm leading-6 text-white/50">Have your tracking ID ready so your message reaches the correct team.</p>
          <a href="/#contact" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-[#091713]"><PackageSearch className="size-4" /> Contact support</a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/35">© {new Date().getFullYear()} ParcelFinda. Tracking information is supplied by the record owner.</p>
    </footer>
  );
}
