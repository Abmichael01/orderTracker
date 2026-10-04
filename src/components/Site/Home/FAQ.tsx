import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Package, CreditCard, Clock, Headphones, Globe, RefreshCw } from 'lucide-react';
import SectionPadding from '../../../layouts/SectionPadding';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: 'payment' | 'shipping' | 'support' | 'policy';
}

export default function FAQSection(): React.JSX.Element {
  const [openItem, setOpenItem] = useState<number | null>(1);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "WHAT DO I NEED TO TRACK A PARCEL?",
      answer: "Enter the tracking ID provided with your document or shipment. ParcelFinda uses that ID to retrieve the latest information available for the record.",
      icon: <CreditCard className="w-5 h-5" />,
      category: 'payment'
    },
    {
      id: 2,
      question: "WHY IS MY TRACKING ID NOT FOUND?",
      answer: "Check every letter, number, and dash in the ID. If it still cannot be found, confirm the ID with the person who sent you the parcel document.",
      icon: <Package className="w-5 h-5" />,
      category: 'shipping'
    },
    {
      id: 3,
      question: "CAN SUPPORT CHANGE MY DELIVERY DETAILS?",
      answer: "Support can review your request and contact the team responsible for the tracking record. Whether a detail can be changed depends on the parcel status.",
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'policy'
    },
    {
      id: 4,
      question: "HOW WILL SUPPORT REPLY?",
      answer: "The team will reply to the email address you enter in the support form, so use an inbox you can access.",
      icon: <Clock className="w-5 h-5" />,
      category: 'support'
    },
    {
      id: 5,
      question: "HOW CAN I TRACK MY SHIPMENTS?",
      answer: "Enter the tracking ID in the search field on the ParcelFinda home page. You do not need to create an account.",
      icon: <Package className="w-5 h-5" />,
      category: 'shipping'
    },
    {
      id: 6,
      question: "DOES PARCELFINDA CARRY MY PACKAGE?",
      answer: "ParcelFinda displays the tracking information attached to your parcel record. The carrier or sender remains responsible for the physical shipment.",
      icon: <Globe className="w-5 h-5" />,
      category: 'shipping'
    },
    {
      id: 7,
      question: "WHAT IS YOUR CUSTOMER SUPPORT AVAILABILITY?",
      answer: "Submit the contact form with your tracking ID. It will be routed to the owner of that parcel record for review.",
      icon: <Headphones className="w-5 h-5" />,
      category: 'support'
    },
    {
      id: 8,
      question: "WHAT SHOULD I INCLUDE IN MY MESSAGE?",
      answer: "Describe the issue clearly and include the email address where you want to receive a reply. Never include passwords or payment card details.",
      icon: <RefreshCw className="w-5 h-5" />,
      category: 'policy'
    }
  ];

  const toggleItem = (id: number): void => {
    setOpenItem(openItem === id ? null : id);
  };

  const getCategoryColor = (category: string): string => {
    const colors = {
      payment: 'bg-blue-50 border-blue-200',
      shipping: 'bg-green-50 border-green-200',
      support: 'bg-purple-50 border-purple-200',
      policy: 'bg-orange-50 border-orange-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (category: string): string => {
    const colors = {
      payment: 'text-blue-600',
      shipping: 'text-green-600',
      support: 'text-purple-600',
      policy: 'text-orange-600'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <SectionPadding id="faq" className="bg-white py-20 px-4 border-b scroll-mt-6">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 tracking-wide">
            FREQUENTLY ASK QUESTIONS
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our shipping services, policies, and support.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl h-fit border-2 transition-all duration-300 hover:shadow-lg ${
                openItem === item.id 
                  ? `${getCategoryColor(item.category)} shadow-md` 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
                      <div className={getIconColor(item.category)}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight pr-4">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <div className={`p-1 rounded-full transition-transform duration-200 ${
                    openItem === item.id ? 'rotate-180' : ''
                  }`}>
                    {openItem === item.id ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="ml-16">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you 24/7
            </p>
            <a href="#contact" className="inline-flex bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">Contact Support</a>
          </div>
        </div>
      </div>
    </SectionPadding>
  );
}
