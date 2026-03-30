import type { FormField } from "@/types";

export function getValueByTrackingRole(fields: FormField[], role: string): string {
  const field = fields.find(
    (f) => f.trackingRole === role || f.trackingRole === `track_${role}`
  );
  return field ? String(field.currentValue || field.defaultValue || "") : "";
}

export function getStatusEnum(
  statusText: string
): "processing" | "in_transit" | "delivered" {
  const s = statusText.toLowerCase();
  if (s.includes("processing") || s.includes("pending")) return "processing";
  if (s.includes("transit") || s.includes("shipped")) return "in_transit";
  if (s.includes("delivered") || s.includes("completed")) return "delivered";
  return "processing";
}
