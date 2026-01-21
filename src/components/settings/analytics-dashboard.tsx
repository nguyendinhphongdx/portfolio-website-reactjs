"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  Users,
  Clock,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  ExternalLink,
  Loader2,
  Eye,
  MapPin,
  Chrome,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  totalViews: number;
  periodViews: number;
  uniqueVisitors: number;
  avgDuration: number;
  chartData: { date: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  topCountries: { country: string; count: number }[];
  devices: { device: string; count: number; percentage: number }[];
  browsers: { browser: string; count: number; percentage: number }[];
  recentViews: {
    id: string;
    path: string;
    country: string | null;
    city: string | null;
    device: string | null;
    browser: string | null;
    referrer: string | null;
    duration: number | null;
    createdAt: string;
  }[];
}

const deviceIcons: Record<string, React.ElementType> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} giờ trước`;
  return `${days} ngày trước`;
}

// Simple bar chart component
function SimpleBarChart({
  data,
}: {
  data: { date: string; views: number }[];
}) {
  const maxViews = Math.max(...data.map((d) => d.views), 1);

  return (
    <div className="flex items-end gap-1 h-32">
      {data.slice(-14).map((item, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center gap-1"
          title={`${formatDate(item.date)}: ${item.views} views`}
        >
          <div
            className="w-full bg-primary/80 hover:bg-primary rounded-t transition-all cursor-pointer min-h-[2px]"
            style={{
              height: `${(item.views / maxViews) * 100}%`,
            }}
          />
          {index % 2 === 0 && (
            <span className="text-[9px] text-muted-foreground">
              {formatDate(item.date)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    async function fetchAnalytics() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/analytics?period=${period}`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalytics();
  }, [period]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-muted animate-pulse" />
          <Loader2 className="absolute inset-0 m-auto h-5 w-5 animate-spin text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Đang tải dữ liệu thống kê...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Không có dữ liệu thống kê</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[15px]">Thống kê truy cập</h3>
            <p className="text-[11px] text-muted-foreground">
              Theo dõi lượt xem portfolio của bạn
            </p>
          </div>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px] h-8 text-[12px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d" className="text-[12px]">
              7 ngày
            </SelectItem>
            <SelectItem value="30d" className="text-[12px]">
              30 ngày
            </SelectItem>
            <SelectItem value="90d" className="text-[12px]">
              90 ngày
            </SelectItem>
            <SelectItem value="all" className="text-[12px]">
              Tất cả
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Tổng lượt xem</span>
          </div>
          <p className="text-2xl font-bold">{data.totalViews.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Trong kỳ</span>
          </div>
          <p className="text-2xl font-bold">{data.periodViews.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Khách riêng lẻ</span>
          </div>
          <p className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Thời gian TB</span>
          </div>
          <p className="text-2xl font-bold">{formatDuration(data.avgDuration)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border bg-card p-4">
        <h4 className="text-[13px] font-medium mb-4">Lượt xem theo ngày</h4>
        <SimpleBarChart data={data.chartData} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top Referrers */}
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-[13px] font-medium">Nguồn truy cập</h4>
          </div>
          {data.topReferrers.length > 0 ? (
            <div className="space-y-2">
              {data.topReferrers.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[12px]"
                >
                  <span className="truncate flex-1">{item.referrer}</span>
                  <span className="text-muted-foreground ml-2">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-muted-foreground">Chưa có dữ liệu</p>
          )}
        </div>

        {/* Top Countries */}
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-[13px] font-medium">Quốc gia</h4>
          </div>
          {data.topCountries.length > 0 ? (
            <div className="space-y-2">
              {data.topCountries.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-[12px]"
                >
                  <span>{item.country}</span>
                  <span className="text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[12px] text-muted-foreground">Chưa có dữ liệu</p>
          )}
        </div>

        {/* Devices */}
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-[13px] font-medium">Thiết bị</h4>
          </div>
          <div className="space-y-3">
            {data.devices.map((item, index) => {
              const Icon = deviceIcons[item.device] || Monitor;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-[12px] mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="capitalize">{item.device}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        item.device === "desktop" && "bg-blue-500",
                        item.device === "mobile" && "bg-green-500",
                        item.device === "tablet" && "bg-orange-500"
                      )}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Browsers */}
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 mb-4">
            <Chrome className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-[13px] font-medium">Trình duyệt</h4>
          </div>
          <div className="space-y-3">
            {data.browsers.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-[12px] mb-1">
                  <span>{item.browser}</span>
                  <span className="text-muted-foreground">
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Views */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-[13px] font-medium">Lượt xem gần đây</h4>
        </div>
        {data.recentViews.length > 0 ? (
          <div className="space-y-3">
            {data.recentViews.map((view) => (
              <div
                key={view.id}
                className="flex items-center justify-between text-[12px] py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    {view.device === "mobile" ? (
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                    ) : view.device === "tablet" ? (
                      <Tablet className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {view.country && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {view.city ? `${view.city}, ` : ""}
                          {view.country}
                        </span>
                      )}
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                      {view.browser} • {view.referrer || "Direct"}
                    </div>
                  </div>
                </div>
                <div className="text-right text-muted-foreground">
                  <div>{formatTimeAgo(view.createdAt)}</div>
                  {view.duration && (
                    <div className="text-[10px]">
                      {formatDuration(view.duration)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-muted-foreground text-center py-4">
            Chưa có lượt xem nào
          </p>
        )}
      </div>
    </div>
  );
}
