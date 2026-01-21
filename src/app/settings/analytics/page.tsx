"use client";

import { AnalyticsDashboard } from "@/components/settings/analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Theo dõi lượt truy cập và thống kê portfolio của bạn
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
