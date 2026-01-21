"use client";

import { useEffect, useRef } from "react";

interface AnalyticsTrackerProps {
  portfolioId: string;
  path: string;
}

// Generate a simple visitor ID based on browser fingerprint
function generateVisitorId(): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("fingerprint", 0, 0);
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join("|");

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Generate session ID
function getSessionId(): string {
  const key = "portfolio_session_id";
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2);
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

export function AnalyticsTracker({ portfolioId, path }: AnalyticsTrackerProps) {
  const pageViewId = useRef<string | null>(null);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    // Don't track in development or if already tracked
    // if (process.env.NODE_ENV === "development") {
    //   console.log("[Analytics] Skipping tracking in development");
    //   return;
    // }

    const visitorId = generateVisitorId();
    const sessionId = getSessionId();
    const referrer = document.referrer || null;

    // Track page view
    async function trackView() {
      try {
        const response = await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            portfolioId,
            path,
            visitorId,
            sessionId,
            referrer,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          pageViewId.current = data.id;
        }
      } catch (error) {
        console.error("[Analytics] Failed to track view:", error);
      }
    }

    trackView();

    // Track duration on page leave
    function handleLeave() {
      if (pageViewId.current) {
        const duration = Math.round((Date.now() - startTime.current) / 1000);

        // Use sendBeacon for reliable tracking on page leave
        navigator.sendBeacon(
          "/api/analytics/track",
          JSON.stringify({
            pageViewId: pageViewId.current,
            duration,
          })
        );
      }
    }

    // Listen for page leave events
    window.addEventListener("beforeunload", handleLeave);
    window.addEventListener("pagehide", handleLeave);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
      window.removeEventListener("pagehide", handleLeave);
      handleLeave(); // Also track when component unmounts
    };
  }, [portfolioId, path]);

  // This component doesn't render anything
  return null;
}
