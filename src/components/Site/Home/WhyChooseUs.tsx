import React from 'react';
import { Check, BadgeCheck, FileSearch, Headphones, MailCheck, PackageCheck } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface Feature {
  id: number;
  text: string;
  icon: React.ReactNode;
}

export default function WhyChooseUsSection(): React.JSX.Element {
  const features: Feature[] = [
    {
      id: 1,
      text: "No account required for tracking",
      icon: <FileSearch className="w-5 h-5" />
    },
    {
      id: 2,
      text: "Tracking ID verified before support intake",
      icon: <BadgeCheck className="w-5 h-5" />
    },
    {
      id: 3,
      text: "Clear parcel details without carrier claims",
      icon: <PackageCheck className="w-5 h-5" />
    },
    {
      id: 4,
      text: "Questions routed to the record owner",
      icon: <Headphones className="w-5 h-5" />
    },
    {
      id: 5,
      text: "Email-based follow-up",
      icon: <MailCheck className="w-5 h-5" />
    }
  ];

  return (
    <SectionPadding id="why-us" className="bg-white py-30 scroll-mt-6">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                WHY CHOOSE US
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                TRACKING THAT STAYS CONNECTED
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                ParcelFinda keeps shipment details and support connected. The tracking ID on your parcel is also the reference our support team uses to find the right record quickly.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary group-hover:text-primary/80 transition-colors duration-200">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 font-medium text-lg">
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a href="#contact" className="inline-flex bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl">Contact support</a>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 h-full">
            <img src="/sea.jpg" alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}
