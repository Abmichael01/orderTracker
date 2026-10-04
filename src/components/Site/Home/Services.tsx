import { AtSign, Clock3, FileSearch, Headphones, PackageCheck, Route } from 'lucide-react';

import SectionPadding from '../../../layouts/SectionPadding';

const features = [
  { icon: FileSearch, title: 'Tracking lookup', description: 'Open the shipment record connected to the tracking ID you received.' },
  { icon: Route, title: 'Route details', description: 'Review the available origin, destination, and movement information in one place.' },
  { icon: PackageCheck, title: 'Delivery status', description: 'See the latest status stored for the parcel without creating an account.' },
  { icon: Clock3, title: 'Updated record', description: 'Know when the shipment information was last changed by the record owner.' },
  { icon: Headphones, title: 'Support routing', description: 'Use the same tracking ID to send a question to the team responsible for the parcel.' },
  { icon: AtSign, title: 'Email follow-up', description: 'Provide your email once so the responsible team can reply outside the tracking page.' },
];

export default function Services() {
  return (
    <section id="services" className="w-full scroll-mt-6 bg-[#f3f7f5]">
      <SectionPadding className="py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold text-slate-600">One tracking ID</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#12231e] lg:text-4xl">Everything needed to understand a parcel record</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">ParcelFinda is a tracking and support surface. It does not pretend to be the carrier handling your physical package.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="bg-white p-7 sm:p-8">
              <Icon className="size-7 text-slate-600" />
              <h3 className="mt-6 text-lg font-medium text-[#12231e]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
            </article>
          ))}
        </div>
      </SectionPadding>
    </section>
  );
}
