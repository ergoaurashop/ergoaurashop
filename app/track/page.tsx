"use client";

import { useState } from "react";
import { getTrackingInfo, AfterShipTracking } from "@/lib/aftership/actions";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AfterShipTracking | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    const result = await getTrackingInfo(trackingNumber.trim());

    if (!result) {
      setError("No tracking information found for this number. Check your entry and try again.");
    } else {
      setData(result);
    }
    setLoading(false);
  };

  const getStatusColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "delivered": return "bg-ergo-green text-white";
      case "in_transit": return "bg-[#3B82F6] text-white";
      case "out_for_delivery": return "bg-yellow-500 text-white";
      case "exception": return "bg-red-500 text-white";
      default: return "bg-ergo-navy-deep text-white";
    }
  };

  return (
    <div className="flex flex-col w-full bg-white font-sans min-h-screen selection:bg-ergo-navy selection:text-white">
      {/* Hero Section */}
      <div className="bg-ergo-surface py-16 md:py-24 border-b border-ergo-border">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-ergo-border">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-ergo-navy-deep">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-ergo-navy-deep tracking-tighter mb-4">
            Track Your Order
          </h1>
          <p className="text-ergo-muted font-bold md:text-lg mb-8 max-w-lg">
            Enter your tracking number below to get real-time updates on your delivery status.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md relative flex items-center group">
            <input
              type="text"
              placeholder="e.g. EA123456789AE"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
              className="w-full pl-6 pr-32 py-4 rounded-full bg-white border border-ergo-border outline-none focus:border-ergo-navy focus:ring-4 focus:ring-ergo-navy/10 transition-all font-bold text-ergo-navy-deep placeholder:text-ergo-muted/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 px-6 py-2 rounded-full bg-ergo-navy text-white font-black text-xs uppercase tracking-widest hover:bg-ergo-navy-deep transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Locating..." : "Track"}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20 w-full min-h-[40vh]">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-50 text-red-500 border border-red-100 rounded-2xl p-6 text-center text-sm font-bold">
              {error}
            </motion.div>
          )}

          {data && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8">
              
              {/* Status Header */}
              <div className="bg-ergo-surface rounded-3xl p-8 border border-ergo-border flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(data.tag)}`}>
                      {data.tag.replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-bold text-ergo-muted">{data.slug.toUpperCase()}</span>
                  </div>
                  <h2 className="text-2xl font-black text-ergo-navy-deep">{data.tracking_number}</h2>
                </div>
                
                {data.expected_delivery && (
                  <div className="bg-white p-4 rounded-2xl border border-ergo-border min-w-[200px]">
                    <p className="text-[10px] font-black text-ergo-muted uppercase tracking-widest mb-1">Expected Delivery</p>
                    <p className="text-lg font-black text-ergo-navy-deep">
                      {new Date(data.expected_delivery).toLocaleDateString("en-AE", { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>

              {/* Timeline */}
              {data.checkpoints && data.checkpoints.length > 0 && (
                <div className="px-4">
                  <h3 className="text-lg font-black text-ergo-navy-deep mb-8 tracking-tight">Delivery History</h3>
                  <div className="relative border-l-2 border-ergo-border/50 ml-3 space-y-8 pb-4">
                    {[...data.checkpoints].reverse().map((cp, idx) => (
                      <div key={idx} className="relative pl-8">
                        <div className={`absolute w-4 h-4 rounded-full -left-[9px] top-1 border-4 border-white ${idx === 0 ? "bg-ergo-green" : "bg-ergo-border"}`} />
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-black text-ergo-navy-deep leading-tight">{cp.message}</span>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-ergo-muted">
                            <span>{new Date(cp.checkpoint_time).toLocaleString("en-AE", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                            {cp.location && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-ergo-border" />
                                <span>{cp.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
