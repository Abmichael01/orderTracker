import { useState } from 'react';
import SectionPadding from '../../../layouts/SectionPadding';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate()

  return (
    <section id="home" className="relative h-[500px] w-full scroll-mt-6">
      <img src="/sea2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50" />

      <SectionPadding className="relative z-10 h-full">
        <div className="flex h-full w-full items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              TRACK DIFFERENT SHIPMENTS GLOBALLY IN REAL TIME
            </h1>
            <p className="mb-8 max-w-xl text-lg font-semibold leading-relaxed text-white/90">
              Follow parcels, freight, cargo, and delivery updates across global carriers from one tracking number.
            </p>
            
            {/* Tracking Form */}
            <form onSubmit={(event) => { event.preventDefault(); if (trackingCode.trim()) navigate(`/?trackingId=${encodeURIComponent(trackingCode.trim())}`); }} className="flex max-w-md flex-col gap-0 sm:flex-row">
              <input
                required
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter tracking number..."
                className="flex-1 px-4 py-3 text-gray-900 bg-white border-0 rounded-l-md sm:rounded-r-none rounded-r-md focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-500"
              />
              <button type="submit" className="rounded-r-md rounded-l-md bg-[#0d1f1b] px-6 py-3 font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#142f28] sm:rounded-l-none">
                Track Now
              </button>
            </form>
          </div>
        </div>
      </SectionPadding>
    </section>
  );
}
