import React from 'react';
import { Check } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
}

export default function PricingSection(): React.JSX.Element {
  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: "BASIC",
      price: 47,
      period: "year",
      features: [
        "Reliable cargo tracking",
        "Standard shipping options",
        "24/7 customer support",
        "Basic insurance coverage",
        "Limited customization"
      ]
    },
    {
      id: 2,
      name: "PREMIUM",
      price: 200,
      period: "year",
      features: [
        "Priority cargo tracking",
        "Express shipping options",
        "24/7 customer support",
        "Enhanced insurance coverage",
        "Customization options"
      ],
      isPopular: true
    },
    {
      id: 3,
      name: "PROFESSIONAL",
      price: 750,
      period: "year",
      features: [
        "Premium cargo tracking features",
        "Global shipping options",
        "24/7 dedicated customer support",
        "Comprehensive insurance coverage",
        "Full customization options"
      ]
    }
  ];

  return (
    <section className="w-full bg-gray-50">
      <SectionPadding className="py-30">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl font-medium tracking-wide text-gray-950 md:text-5xl">
            OUR PRICING PLANS
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            Discover our flexible and affordable pricing plans tailored to meet your shipping needs.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg p-8 relative ${
                plan.isPopular ? 'ring-2 ring-slate-300 transform scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="rounded-md bg-slate-800 px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="text-center mb-6">
                <h3 className="mb-4 text-2xl font-medium text-gray-900">
                  {plan.name}
                </h3>
                
                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-medium text-gray-950">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">
                    / {plan.period}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-500" />
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    plan.isPopular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionPadding>
    </section>
  );
}
