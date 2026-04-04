"use client";

import React, { useState, useEffect } from "react";

/**
 * Calculates the time remaining until midnight UAE time (GMT+4)
 */
function getTimeRemaining() {
  const now = new Date();
  
  // Create date object for midnight UAE today
  // UAE is GMT+4. 
  // To get UAE time from UTC: UTC + 4 hours
  // To get UTC from local: localTime - offset
  
  // Simplest way: Get current UTC time, add 4 hours to get current UAE time.
  // Then calculate midgnight of the next day in UAE.
  
  const uaeTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (4 * 3600000));
  const midnightUAE = new Date(uaeTime);
  midnightUAE.setHours(24, 0, 0, 0);
  
  const diff = midnightUAE.getTime() - uaeTime.getTime();
  
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  
  return { hours, minutes, seconds };
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeRemaining());

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex gap-4 items-center justify-center font-mono opacity-0">
        <TimeUnit value={0} label="Hours" />
        <TimeUnit value={0} label="Mins" />
        <TimeUnit value={0} label="Secs" />
      </div>
    );
  }

  return (
    <div className="flex gap-3 md:gap-6 items-center justify-center">
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-white/50 -mt-5">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-2xl font-bold text-white/50 -mt-5">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md rounded-lg w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/10 shadow-inner">
        <span className="text-xl md:text-3xl font-black text-white tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
}
