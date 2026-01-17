"use client";

import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PortfolioTemplate } from "@/components/portfolio/templates";
import type { PortfolioData } from "@/types/portfolio";

interface LivePreviewProps {
  data: PortfolioData;
  className?: string;
}

type DeviceType = "desktop" | "tablet" | "mobile";

const deviceConfigs = {
  desktop: { width: 1280, height: 800, icon: Monitor, label: "Desktop" },
  tablet: { width: 768, height: 1024, icon: Tablet, label: "Tablet" },
  mobile: { width: 375, height: 667, icon: Smartphone, label: "Mobile" },
};

const zoomLevels = [0.25, 0.5, 0.75, 1];

export function LivePreview({ data, className }: LivePreviewProps) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [zoom, setZoom] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  const config = deviceConfigs[device];
  const scaledWidth = config.width * zoom;
  const scaledHeight = config.height * zoom;

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex < zoomLevels.length - 1) {
      setZoom(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex > 0) {
      setZoom(zoomLevels[currentIndex - 1]);
    }
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(false)}
          >
            <Minimize2 className="h-4 w-4 mr-2" />
            Exit Fullscreen
          </Button>
        </div>
        <div className="h-full w-full overflow-auto p-8">
          <div
            className="mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
            style={{ width: config.width, height: config.height }}
          >
            <div className="h-full overflow-auto">
              <PortfolioTemplate key={key} data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30 shrink-0">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 p-1 bg-background rounded-lg border">
          {(Object.keys(deviceConfigs) as DeviceType[]).map((deviceType) => {
            const Icon = deviceConfigs[deviceType].icon;
            return (
              <button
                key={deviceType}
                onClick={() => setDevice(deviceType)}
                className={cn(
                  "p-2 rounded-md transition-all",
                  device === deviceType
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                title={deviceConfigs[deviceType].label}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom === zoomLevels[0]}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs font-medium text-muted-foreground min-w-[40px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom === zoomLevels[zoomLevels.length - 1]}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="h-8 w-8"
            title="Refresh preview"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(true)}
            className="h-8 w-8"
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 min-h-0 overflow-auto bg-[repeating-conic-gradient(#f5f5f5_0%_25%,#fafafa_0%_50%)] bg-[length:20px_20px] p-4">
        <div className="flex items-center justify-center min-h-full">
          {/* Device Frame */}
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              width: scaledWidth,
              height: scaledHeight,
            }}
          >
            {/* Browser Chrome - scaled container */}
            <div
              className="bg-[#1f1f1f] rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={{
                width: config.width,
                height: config.height,
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
              }}
            >
              {/* Browser Header */}
              <div className="h-8 bg-[#2d2d2d] flex items-center px-3 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#1f1f1f] rounded-md px-3 py-1 text-[10px] text-gray-400 truncate">
                    portfolio.com/{data.fullName?.split(" ")[0]?.toLowerCase() || "username"}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white overflow-auto">
                <PortfolioTemplate key={key} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="px-4 py-2 border-t bg-muted/30 shrink-0">
        <p className="text-xs text-muted-foreground text-center">
          {config.label} • {config.width} x {config.height}px
        </p>
      </div>
    </div>
  );
}
