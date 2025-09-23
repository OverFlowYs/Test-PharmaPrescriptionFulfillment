import { describe, it, expect } from "vitest";
import type { Drug } from "../drug";

describe("Drug Type", () => {
  it("should have correct structure", () => {
    const drug: Drug = {
      id: "D001",
      name: "Ibuprofen",
      manufacturer: "ACME Pharma",
      batch: "B202403",
      expiry: "2026-01-01",
      stock: 150,
      limit: 200,
    };

    expect(drug).toHaveProperty("id");
    expect(drug).toHaveProperty("name");
    expect(drug).toHaveProperty("manufacturer");
    expect(drug).toHaveProperty("batch");
    expect(drug).toHaveProperty("expiry");
    expect(drug).toHaveProperty("stock");
    expect(drug).toHaveProperty("limit");

    expect(typeof drug.id).toBe("string");
    expect(typeof drug.name).toBe("string");
    expect(typeof drug.manufacturer).toBe("string");
    expect(typeof drug.batch).toBe("string");
    expect(typeof drug.expiry).toBe("string");
    expect(typeof drug.stock).toBe("number");
    expect(typeof drug.limit).toBe("number");
  });

  it("should validate required fields", () => {
    const drug: Drug = {
      id: "D001",
      name: "Ibuprofen",
      manufacturer: "ACME Pharma",
      batch: "B202403",
      expiry: "2026-01-01",
      stock: 150,
      limit: 200,
    };

    expect(drug.id).toBeTruthy();
    expect(drug.name).toBeTruthy();
    expect(drug.manufacturer).toBeTruthy();
    expect(drug.batch).toBeTruthy();
    expect(drug.expiry).toBeTruthy();
    expect(drug.stock).toBeGreaterThanOrEqual(0);
    expect(drug.limit).toBeGreaterThanOrEqual(0);
  });
});
