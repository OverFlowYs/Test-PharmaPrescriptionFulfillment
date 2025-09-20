import { describe, it, expect, vi } from 'vitest';
import {
  isDrugExpired,
  isLowStock,
  getStockStatus,
  formatDrugExpiry,
} from '../../../utils/drugUtils';
import type { Drug } from '../../../types/drug';

describe('Drug Utils Core Functions', () => {
  // Mock Date for consistent testing
  const MOCK_DATE = new Date('2024-07-20T10:00:00Z');
  vi.useFakeTimers();
  vi.setSystemTime(MOCK_DATE);

  const mockDrug: Drug = {
    id: 'D001',
    name: 'Ibuprofen',
    manufacturer: 'ACME Pharma',
    batch: 'B202403',
    expiry: '2026-01-01',
    stock: 150,
    limit: 200,
  };

  describe('isDrugExpired', () => {
    it('should return false for future expiry date', () => {
      expect(isDrugExpired(mockDrug)).toBe(false);
    });

    it('should return true for past expiry date', () => {
      const expiredDrug: Drug = {
        ...mockDrug,
        expiry: '2024-01-01',
      };
      expect(isDrugExpired(expiredDrug)).toBe(true);
    });
  });

  describe('isLowStock', () => {
    it('should return false for normal stock', () => {
      expect(isLowStock(mockDrug)).toBe(false);
    });

    it('should return true for low stock', () => {
      const lowStockDrug: Drug = {
        ...mockDrug,
        stock: 15,
      };
      expect(isLowStock(lowStockDrug)).toBe(true);
    });
  });

  describe('getStockStatus', () => {
    it('should return "normal" for high stock', () => {
      expect(getStockStatus(mockDrug)).toBe('normal');
    });

    it('should return "low" for medium stock', () => {
      const lowStockDrug: Drug = {
        ...mockDrug,
        stock: 15,
      };
      expect(getStockStatus(lowStockDrug)).toBe('low');
    });

    it('should return "critical" for very low stock', () => {
      const criticalStockDrug: Drug = {
        ...mockDrug,
        stock: 5,
      };
      expect(getStockStatus(criticalStockDrug)).toBe('critical');
    });
  });

  describe('formatDrugExpiry', () => {
    it('should format date correctly', () => {
      const formatted = formatDrugExpiry('2026-01-01');
      expect(formatted).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/);
    });

    it('should handle invalid date strings', () => {
      const formatted = formatDrugExpiry('invalid-date');
      expect(formatted).toBe('Invalid Date');
    });
  });

  afterAll(() => {
    vi.useRealTimers();
  });
});
