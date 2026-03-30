import { describe, it, expect } from "vitest";
import { getValueByTrackingRole, getStatusEnum } from "./trackingRoles";
import type { FormField } from "@/types";

const makeField = (trackingRole: string, currentValue?: string, defaultValue?: string): FormField => ({
  id: "test_field",
  name: "Test Field",
  type: "text",
  trackingRole,
  currentValue,
  defaultValue,
});

describe("getValueByTrackingRole", () => {
  it("returns currentValue for exact role match", () => {
    const fields = [makeField("status", "In Transit")];
    expect(getValueByTrackingRole(fields, "status")).toBe("In Transit");
  });

  it("returns currentValue when role is stored with track_ prefix", () => {
    const fields = [makeField("track_status", "Delivered")];
    expect(getValueByTrackingRole(fields, "status")).toBe("Delivered");
  });

  it("falls back to defaultValue when currentValue is empty", () => {
    const fields = [makeField("status", "", "Processing")];
    expect(getValueByTrackingRole(fields, "status")).toBe("Processing");
  });

  it("returns empty string when role is not found", () => {
    const fields = [makeField("name", "John")];
    expect(getValueByTrackingRole(fields, "status")).toBe("");
  });

  it("returns empty string for empty fields array", () => {
    expect(getValueByTrackingRole([], "status")).toBe("");
  });

  it("resolves all standard shipping roles", () => {
    const fields = [
      makeField("package", "Laptop"),
      makeField("shipment_date", "2025-01-15"),
      makeField("destination", "New York"),
      makeField("arrival", "2025-01-20"),
      makeField("name", "Jane Doe"),
      makeField("weight", "2.5kg"),
      makeField("email", "jane@example.com"),
      makeField("error_message", ""),
    ];
    expect(getValueByTrackingRole(fields, "package")).toBe("Laptop");
    expect(getValueByTrackingRole(fields, "destination")).toBe("New York");
    expect(getValueByTrackingRole(fields, "name")).toBe("Jane Doe");
  });
});

describe("getStatusEnum", () => {
  it("maps Processing to processing", () => {
    expect(getStatusEnum("Processing")).toBe("processing");
  });

  it("maps In Transit to in_transit", () => {
    expect(getStatusEnum("In Transit")).toBe("in_transit");
  });

  it("maps Shipped to in_transit", () => {
    expect(getStatusEnum("Shipped")).toBe("in_transit");
  });

  it("maps Delivered to delivered", () => {
    expect(getStatusEnum("Delivered")).toBe("delivered");
  });

  it("maps Completed to delivered", () => {
    expect(getStatusEnum("Completed")).toBe("delivered");
  });

  it("maps Pending to processing", () => {
    expect(getStatusEnum("Pending")).toBe("processing");
  });

  it("defaults to processing for unknown status", () => {
    expect(getStatusEnum("Some Unknown Status")).toBe("processing");
  });

  it("is case-insensitive", () => {
    expect(getStatusEnum("IN TRANSIT")).toBe("in_transit");
    expect(getStatusEnum("delivered")).toBe("delivered");
  });
});
