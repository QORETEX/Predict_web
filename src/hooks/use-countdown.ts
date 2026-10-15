"use client";

import { useState, useEffect } from "react";
import { intervalToDuration } from "date-fns";

export function useCountdown(targetDate: string | Date) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeLeft(targetDate);
      setTimeLeft(remaining);
      if (remaining.total <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(target: string | Date) {
  const end = new Date(target);
  const now = new Date();
  const total = end.getTime() - now.getTime();

  if (total <= 0) {
    return { total: 0, hours: 0, minutes: 0, seconds: 0, label: "Locked" };
  }

  const duration = intervalToDuration({ start: now, end });
  const hours = (duration.days ?? 0) * 24 + (duration.hours ?? 0);
  const minutes = duration.minutes ?? 0;
  const seconds = duration.seconds ?? 0;

  const label =
    hours > 0
      ? `${hours}h ${minutes}m`
      : minutes > 0
        ? `${minutes}m ${seconds}s`
        : `${seconds}s`;

  return { total, hours, minutes, seconds, label };
}
