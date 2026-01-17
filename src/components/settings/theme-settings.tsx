"use client";

import { Check, Moon, Sun, Type, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ThemeSettingsProps {
  primaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  secondaryColor: string | null;
  onSecondaryColorChange: (color: string | null) => void;
  accentColor?: string | null;
  onAccentColorChange?: (color: string | null) => void;
  fontFamily: string | null;
  onFontFamilyChange: (font: string | null) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
}

const presetColors = [
  { color: "#3b82f6", name: "Blue" },
  { color: "#10b981", name: "Emerald" },
  { color: "#f59e0b", name: "Amber" },
  { color: "#ef4444", name: "Red" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#ec4899", name: "Pink" },
  { color: "#06b6d4", name: "Cyan" },
  { color: "#f97316", name: "Orange" },
  { color: "#84cc16", name: "Lime" },
  { color: "#14b8a6", name: "Teal" },
];

const fontFamilies = [
  { value: "inter", label: "Inter" },
  { value: "poppins", label: "Poppins" },
  { value: "roboto", label: "Roboto" },
  { value: "playfair", label: "Playfair Display" },
  { value: "space-grotesk", label: "Space Grotesk" },
  { value: "dm-sans", label: "DM Sans" },
  { value: "jetbrains-mono", label: "JetBrains Mono" },
  { value: "fira-code", label: "Fira Code" },
];

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  showPresets?: boolean;
}

function ColorPicker({ label, value, onChange, showPresets = true }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[12px] font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg border-2 border-border shadow-sm relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
          style={{ backgroundColor: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 font-mono text-[12px] h-8"
          placeholder="#3b82f6"
        />
      </div>
      {showPresets && (
        <div className="flex flex-wrap gap-1.5">
          {presetColors.map(({ color, name }) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={cn(
                "w-6 h-6 rounded-lg transition-all duration-200",
                "hover:scale-110",
                value === color
                  ? "ring-2 ring-offset-1 ring-offset-background ring-primary scale-110"
                  : ""
              )}
              style={{ backgroundColor: color }}
              title={name}
            >
              {value === color && (
                <Check className="h-3 w-3 text-white m-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ThemeSettings({
  primaryColor,
  onPrimaryColorChange,
  secondaryColor,
  onSecondaryColorChange,
  accentColor,
  onAccentColorChange,
  fontFamily,
  onFontFamilyChange,
  darkMode,
  onDarkModeChange,
}: ThemeSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
          <Palette className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-[15px]">Theme</h3>
          <p className="text-[11px] text-muted-foreground">
            Customize colors and typography
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 space-y-4">
        {/* Primary Color */}
        <ColorPicker
          label="Primary Color"
          value={primaryColor}
          onChange={onPrimaryColorChange}
        />

        {/* Secondary Color */}
        <ColorPicker
          label="Secondary Color"
          value={secondaryColor || "#8b5cf6"}
          onChange={onSecondaryColorChange}
          showPresets={false}
        />

        {/* Accent Color */}
        {onAccentColorChange && (
          <ColorPicker
            label="Accent Color"
            value={accentColor || "#f472b6"}
            onChange={onAccentColorChange}
            showPresets={false}
          />
        )}

        {/* Font Family */}
        <div className="space-y-2">
          <Label className="text-[12px] font-medium flex items-center gap-2">
            <Type className="h-3.5 w-3.5" />
            Font Family
          </Label>
          <Select value={fontFamily || "inter"} onValueChange={onFontFamilyChange}>
            <SelectTrigger className="h-9 text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font.value} value={font.value} className="text-[12px]">
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium flex items-center gap-2">
            {darkMode ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            Dark Mode
          </Label>
          <Switch
            checked={darkMode}
            onCheckedChange={onDarkModeChange}
            className="scale-90"
          />
        </div>
      </div>
    </div>
  );
}
