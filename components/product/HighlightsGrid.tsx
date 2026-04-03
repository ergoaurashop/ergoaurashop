import React from "react";

interface HighlightsGridProps {
  highlightsRaw?: string;
}

export function HighlightsGrid({ highlightsRaw }: HighlightsGridProps) {
  if (!highlightsRaw) return null;

  const highlights = highlightsRaw.split("|").map(s => s.trim()).filter(Boolean);
  if (highlights.length === 0) return null;

  return (
    <div className="bg-ergo-surface p-6 rounded-2xl border border-ergo-border mb-8">
      <h3 className="text-lg font-bold text-ergo-navy-deep mb-5">Why you'll love it</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-5 h-5 text-ergo-green shrink-0 mt-0.5"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-ergo-text leading-snug">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
