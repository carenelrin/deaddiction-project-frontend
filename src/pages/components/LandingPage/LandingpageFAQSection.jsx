import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a variety of healthcare services including consultations, prescriptions, and emergency care.",
    },
    {
      question: "How can I schedule an appointment?",
      answer:
        "You can schedule an appointment through our mobile app or website.",
    },
    {
      question: "Is there a cost for consultations?",
      answer:
        "Consultations may be free or subject to a fee, depending on the type of service you choose.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach customer support through our app or by calling our hotline.",
    },
    {
      question: "Do you offer telehealth services?",
      answer: "Yes, we provide telehealth services for your convenience.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-[#458FF6]">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col items-center">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-full max-w-[90%] md:max-w-[1100px] mb-4 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
            >
              <div
                className="flex justify-between items-center p-4 md:p-5 cursor-pointer hover:bg-blue-50 transition duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-xl text-gray-600">
                  {activeIndex === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </span>
              </div>
              {activeIndex === index && (
                <div className="p-4 md:p-5 text-gray-700 bg-gray-100">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
