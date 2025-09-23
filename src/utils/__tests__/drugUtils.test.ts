import { describe, expect, it } from "vitest";
import type { Drug } from "../../types/drug";

// 药品工具函数
export const isDrugExpired = (drug: Drug): boolean => {
  return new Date(drug.expiry) <= new Date();
};

export const isLowStock = (drug: Drug, threshold: number = 20): boolean => {
  return drug.stock < threshold;
};

export const getStockStatus = (drug: Drug): "normal" | "low" | "critical" => {
  if (drug.stock < 10) return "critical";
  if (drug.stock < 20) return "low";
  return "normal";
};

export const formatDrugExpiry = (expiry: string): string => {
  const date = new Date(expiry);
  return date.toLocaleDateString("zh-CN");
};

describe("Drug Utils", () => {
  const mockDrug: Drug = {
    id: "D001",
    name: "Ibuprofen",
    manufacturer: "ACME Pharma",
    batch: "B202403",
    expiry: "2026-01-01",
    stock: 150,
    limit: 200,
  };

  const expiredDrug: Drug = {
    ...mockDrug,
    expiry: "2024-01-01", // Past date
  };

  const lowStockDrug: Drug = {
    ...mockDrug,
    stock: 15,
  };

  const criticalStockDrug: Drug = {
    ...mockDrug,
    stock: 5,
  };

  describe("isDrugExpired", () => {
    it("should return false for future expiry date", () => {
      expect(isDrugExpired(mockDrug)).toBe(false);
    });

    it("should return true for past expiry date", () => {
      expect(isDrugExpired(expiredDrug)).toBe(true);
    });

    it("should return true for today expiry date", () => {
      const todayDrug: Drug = {
        ...mockDrug,
        expiry: new Date().toISOString().split("T")[0],
      };
      expect(isDrugExpired(todayDrug)).toBe(true);
    });
  });

  describe("isLowStock", () => {
    it("should return false for normal stock", () => {
      expect(isLowStock(mockDrug)).toBe(false);
    });

    it("should return true for low stock", () => {
      expect(isLowStock(lowStockDrug)).toBe(true);
    });

    it("should use custom threshold", () => {
      expect(isLowStock(mockDrug, 200)).toBe(true);
      expect(isLowStock(mockDrug, 100)).toBe(false);
    });
  });

  describe("getStockStatus", () => {
    it("should return normal for high stock", () => {
      expect(getStockStatus(mockDrug)).toBe("normal");
    });

    it("should return low for medium stock", () => {
      expect(getStockStatus(lowStockDrug)).toBe("low");
    });

    it("should return critical for very low stock", () => {
      expect(getStockStatus(criticalStockDrug)).toBe("critical");
    });
  });

  describe("formatDrugExpiry", () => {
    it("should format date correctly", () => {
      const formatted = formatDrugExpiry("2026-01-01");
      expect(formatted).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/);
    });

    it("should handle different date formats", () => {
      const formatted = formatDrugExpiry("2026-12-25");
      expect(formatted).toContain("2026");
    });
  });
});
