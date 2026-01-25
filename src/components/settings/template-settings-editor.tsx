"use client";

import { Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TemplateType,
  TemplateFieldConfig,
  getTemplateSettingsConfig,
} from "@/types/portfolio";

interface TemplateSettingsEditorProps {
  template: TemplateType;
  settings: Record<string, unknown> | null;
  onChange: (settings: Record<string, unknown>) => void;
}

export function TemplateSettingsEditor({
  template,
  settings,
  onChange,
}: TemplateSettingsEditorProps) {
  const fields = getTemplateSettingsConfig(template);

  if (fields.length === 0) {
    return null;
  }

  const currentSettings = settings || {};

  const handleFieldChange = (key: string, value: unknown) => {
    onChange({
      ...currentSettings,
      [key]: value,
    });
  };

  const getFieldValue = (field: TemplateFieldConfig) => {
    const value = currentSettings[field.key];
    if (value !== undefined) return value;
    return field.defaultValue;
  };

  const renderField = (field: TemplateFieldConfig) => {
    const value = getFieldValue(field);

    switch (field.type) {
      case "text":
        return (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-[12px] font-medium">{field.label}</Label>
            <Input
              value={(value as string) || ""}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="h-9 text-[13px]"
            />
            {field.description && (
              <p className="text-[11px] text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-[12px] font-medium">{field.label}</Label>
            <Input
              type="number"
              value={value !== undefined && value !== null ? String(value) : ""}
              onChange={(e) => {
                const num = e.target.value === "" ? null : Number(e.target.value);
                handleFieldChange(field.key, num);
              }}
              placeholder={field.placeholder}
              className="h-9 text-[13px]"
            />
            {field.description && (
              <p className="text-[11px] text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-[12px] font-medium">{field.label}</Label>
            <Textarea
              value={(value as string) || ""}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="text-[13px] min-h-[80px]"
            />
            {field.description && (
              <p className="text-[11px] text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-[12px] font-medium">{field.label}</Label>
            <Select
              value={(value as string) || field.defaultValue?.toString() || ""}
              onValueChange={(v) => handleFieldChange(field.key, v)}
            >
              <SelectTrigger className="h-9 text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-[13px]">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-[11px] text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "boolean":
        return (
          <div key={field.key} className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label className="text-[12px] font-medium">{field.label}</Label>
              {field.description && (
                <p className="text-[11px] text-muted-foreground">{field.description}</p>
              )}
            </div>
            <Switch
              checked={value !== undefined ? Boolean(value) : Boolean(field.defaultValue)}
              onCheckedChange={(checked) => handleFieldChange(field.key, checked)}
              className="scale-90"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
          <Settings2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-[15px]">Template Settings</h3>
          <p className="text-[11px] text-muted-foreground">
            Customize settings specific to this template
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 space-y-4">
        {fields.map(renderField)}
      </div>
    </div>
  );
}
