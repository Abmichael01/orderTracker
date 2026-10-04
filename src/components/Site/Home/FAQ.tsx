import React, { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQSection(): React.JSX.Element {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "WHAT DO I NEED TO TRACK A PARCEL?",
      answer: "Enter the tracking ID provided with your document or shipment. ParcelFinda uses that ID to retrieve the latest information available for the record.",
    },
    {
      id: 2,
      question: "WHY IS MY TRACKING ID NOT FOUND?",
      answer: "Check every letter, number, and dash in the ID. If it still cannot be found, confirm the ID with the person who sent you the parcel document.",
    },
    {
      id: 3,
      question: "CAN SUPPORT CHANGE MY DELIVERY DETAILS?",
      answer: "Support can review your request and contact the team responsible for the tracking record. Whether a detail can be changed depends on the parcel status.",
    },
    {
      id: 4,
      question: "HOW WILL SUPPORT REPLY?",
      answer: "The team will reply to the email address you enter in the support form, so use an inbox you can access.",
    },
    {
      id: 5,
      question: "HOW CAN I TRACK MY SHIPMENTS?",
      answer: "Enter the tracking ID in the search field on the ParcelFinda home page. You do not need to create an account.",
    },
    {
      id: 6,
      question: "DOES PARCELFINDA CARRY MY PACKAGE?",
      answer: "ParcelFinda displays the tracking information attached to your parcel record. The carrier or sender remains responsible for the physical shipment.",
    },
    {
      id: 7,
      question: "WHAT IS YOUR CUSTOMER SUPPORT AVAILABILITY?",
      answer: "Submit the contact form with your tracking ID. It will be routed to the owner of that parcel record for review.",
    },
    {
      id: 8,
      question: "WHAT SHOULD I INCLUDE IN MY MESSAGE?",
      answer: "Describe the issue clearly and include the email address where you want to receive a reply. Never include passwords or payment card details.",
    }
  ];

  const toggleItem = (id: number): void => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="w-full scroll-mt-6 border-b bg-white">
      <SectionPadding className="py-20">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-medium text-gray-950 md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Find answers about parcel tracking and contacting the team responsible for your record.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-4xl divide-y divide-gray-200 border-y border-gray-200">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-white"
            >
              {/* Question Header */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openItem === item.id}
                aria-controls={`faq-answer-${item.id}`}
                className="flex w-full items-center gap-4 py-6 text-left outline-none transition-colors hover:text-gray-950 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <CircleHelp className="size-5" />
                </div>
                <h3 className="min-w-0 flex-1 text-base font-semibold leading-6 text-gray-900 sm:text-lg">
                  {item.question}
                </h3>
                <ChevronDown className={`size-5 shrink-0 text-gray-400 transition-transform duration-200 ${openItem === item.id ? 'rotate-180 text-gray-700' : ''}`} />
              </button>

              {/* Answer Content */}
              <div
                id={`faq-answer-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="max-w-3xl pb-6 pl-14 pr-10 leading-7 text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mx-auto mt-14 max-w-4xl text-center">
          <div className="rounded-lg bg-slate-50 p-8">
            <h3 className="mb-4 text-2xl font-medium text-gray-900">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <a href="#contact" className="inline-flex bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">Contact Support</a>
          </div>
        </div>
      </SectionPadding>
    </section>
  );
}
