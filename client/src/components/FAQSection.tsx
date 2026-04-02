/**
 * FAQSection Component
 * Renders FAQ accordion for species detail pages
 * CRT Terminal style with phosphor green accents
 * 
 * Design: Retro CRT Terminal / Dark + #33ff33
 */

import { useState } from "react";
import type { FAQ } from "@/lib/species-faq";
import { useI18n } from "@/contexts/I18nContext";

interface FAQSectionProps {
  faqs: FAQ[];
  speciesName: string;
}

export default function FAQSection({ faqs, speciesName }: FAQSectionProps) {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="border border-[#33ff33]/20 bg-[#0d1a0d]/60 relative">
      {/* Terminal-style header bar */}
      <div className="h-6 bg-[#0d1a0d] border-b border-[#33ff33]/20 flex items-center px-3">
        <span className="text-[#33ff33]/50 text-[10px]">
          FAQ — {speciesName}
        </span>
      </div>

      <div className="p-5 pt-3 space-y-0">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#33ff33]/10 last:border-b-0"
          >
            {/* Question */}
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-4 flex items-start gap-3 group hover:bg-[#33ff33]/5 transition-colors px-2 -mx-2"
            >
              {/* Terminal prompt indicator */}
              <span className="text-[#33ff33]/40 text-sm mt-0.5 shrink-0 font-mono">
                {openIndex === index ? "[-]" : "[+]"}
              </span>
              <span className="text-[#33ff33]/90 text-sm leading-relaxed group-hover:text-[#33ff33] transition-colors">
                {faq.question}
              </span>
            </button>

            {/* Answer - collapsible */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-8 pr-2 pb-4">
                <div className="border-l-2 border-[#33ff33]/20 pl-4">
                  <p className="text-[#33ff33]/60 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="px-5 pb-3">
        <p className="text-[10px] text-[#33ff33]/30">
          * {t("speciesDetail.faqNote") || "These FAQs are based on the Claude Code Buddy system mechanics."}
        </p>
      </div>
    </div>
  );
}
