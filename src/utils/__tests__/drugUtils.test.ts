import { describe, it, expect, vi } from 'vitest'
import { isDrugExpired, isLowStock, getStockStatus, formatDrugExpiry } from '../drugUtils'
import type { Drug } from '../../types/drug'

describe('Drug Utility Functions', () => {
  // Mock Date for consistent testing of expiry
  const MOCK_DATE = new Date('2024-07-20T10:00:00Z')
  vi.useFakeTimers()
  vi.setSystemTime(MOCK_DATE)

  const mockDrug: Drug = {
    id: 'D001',
    name: 'Ibuprofen',
    manufacturer: 'ACME Pharma',
    batch: 'B202403',
    expiry: '2026-01-01',
    stock: 150,
    limit: 200
  }

  const expiredDrug: Drug = {
    ...mockDrug,
    expiry: '2024-01-01' // Past date
  }

  const lowStockDrug: Drug = {
    ...mockDrug,
    stock: 15
  }

  const criticalStockDrug: Drug = {
    ...mockDrug,
    stock: 5
  }

  describe('isDrugExpired', () => {
    it('should return false for future expiry date', () => {
      expect(isDrugExpired(mockDrug)).toBe(false)
    })

    it('should return true for past expiry date', () => {
      expect(isDrugExpired(expiredDrug)).toBe(true)
    })

    it('should return true for today expiry date', () => {
      const todayDrug: Drug = {
        ...mockDrug,
        expiry: '2024-07-20' // Today's date
      }
      expect(isDrugExpired(todayDrug)).toBe(true)
    })

    it('should handle different date formats', () => {
      const drugWithISODate: Drug = {
        ...mockDrug,
        expiry: '2024-01-01T00:00:00Z'
      }
      expect(isDrugExpired(drugWithISODate)).toBe(true)
    })

    it('should handle edge case dates', () => {
      const yesterdayDrug: Drug = {
        ...mockDrug,
        expiry: '2024-07-19' // Yesterday
      }
      expect(isDrugExpired(yesterdayDrug)).toBe(true)

      const tomorrowDrug: Drug = {
        ...mockDrug,
        expiry: '2024-07-21' // Tomorrow
      }
      expect(isDrugExpired(tomorrowDrug)).toBe(false)
    })
  })

  describe('isLowStock', () => {
    it('should return false for normal stock', () => {
      expect(isLowStock(mockDrug)).toBe(false)
    })

    it('should return true for low stock', () => {
      expect(isLowStock(lowStockDrug)).toBe(true)
    })

    it('should use default threshold of 20', () => {
      const drugWithStock20: Drug = {
        ...mockDrug,
        stock: 20
      }
      expect(isLowStock(drugWithStock20)).toBe(false)

      const drugWithStock19: Drug = {
        ...mockDrug,
        stock: 19
      }
      expect(isLowStock(drugWithStock19)).toBe(true)
    })

    it('should use custom threshold', () => {
      expect(isLowStock(mockDrug, 200)).toBe(true)
      expect(isLowStock(mockDrug, 100)).toBe(false)
      expect(isLowStock(mockDrug, 150)).toBe(false)
    })

    it('should handle zero stock', () => {
      const zeroStockDrug: Drug = {
        ...mockDrug,
        stock: 0
      }
      expect(isLowStock(zeroStockDrug)).toBe(true)
    })

    it('should handle negative stock', () => {
      const negativeStockDrug: Drug = {
        ...mockDrug,
        stock: -5
      }
      expect(isLowStock(negativeStockDrug)).toBe(true)
    })
  })

  describe('getStockStatus', () => {
    it('should return "normal" for high stock', () => {
      expect(getStockStatus(mockDrug)).toBe('normal')
    })

    it('should return "low" for medium stock', () => {
      expect(getStockStatus(lowStockDrug)).toBe('low')
    })

    it('should return "critical" for very low stock', () => {
      expect(getStockStatus(criticalStockDrug)).toBe('critical')
    })

    it('should handle boundary values', () => {
      const drugWithStock10: Drug = {
        ...mockDrug,
        stock: 10
      }
      expect(getStockStatus(drugWithStock10)).toBe('low')

      const drugWithStock20: Drug = {
        ...mockDrug,
        stock: 20
      }
      expect(getStockStatus(drugWithStock20)).toBe('normal')

      const drugWithStock21: Drug = {
        ...mockDrug,
        stock: 21
      }
      expect(getStockStatus(drugWithStock21)).toBe('normal')
    })

    it('should handle zero and negative stock', () => {
      const zeroStockDrug: Drug = {
        ...mockDrug,
        stock: 0
      }
      expect(getStockStatus(zeroStockDrug)).toBe('critical')

      const negativeStockDrug: Drug = {
        ...mockDrug,
        stock: -5
      }
      expect(getStockStatus(negativeStockDrug)).toBe('critical')
    })
  })

  describe('formatDrugExpiry', () => {
    it('should format date correctly', () => {
      const formatted = formatDrugExpiry('2026-01-01')
      expect(formatted).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/)
    })

    it('should handle different date formats', () => {
      const formatted = formatDrugExpiry('2026-12-25')
      expect(formatted).toContain('2026')
      expect(formatted).toContain('12')
      expect(formatted).toContain('25')
    })

    it('should handle ISO date strings', () => {
      const formatted = formatDrugExpiry('2026-01-01T00:00:00Z')
      expect(formatted).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/)
    })

    it('should handle invalid date strings gracefully', () => {
      const formatted = formatDrugExpiry('invalid-date')
      expect(formatted).toBe('Invalid Date')
    })

    it('should handle empty string', () => {
      const formatted = formatDrugExpiry('')
      expect(formatted).toBe('Invalid Date')
    })

    it('should use Chinese locale', () => {
      const formatted = formatDrugExpiry('2026-01-01')
      // Should contain Chinese date format indicators
      expect(formatted).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/)
    })
  })

  describe('Integration Tests', () => {
    it('should work together for drug analysis', () => {
      const drugs: Drug[] = [
        { ...mockDrug, stock: 5, expiry: '2024-01-01' }, // Critical stock, expired
        { ...mockDrug, stock: 15, expiry: '2026-01-01' }, // Low stock, not expired
        { ...mockDrug, stock: 100, expiry: '2024-01-01' }, // Normal stock, expired
        { ...mockDrug, stock: 100, expiry: '2026-01-01' } // Normal stock, not expired
      ]

      const analysis = drugs.map(drug => ({
        id: drug.id,
        isExpired: isDrugExpired(drug),
        isLowStock: isLowStock(drug),
        stockStatus: getStockStatus(drug),
        formattedExpiry: formatDrugExpiry(drug.expiry)
      }))

      expect(analysis[0]).toEqual({
        id: 'D001',
        isExpired: true,
        isLowStock: true,
        stockStatus: 'critical',
        formattedExpiry: expect.stringMatching(/\d{4}\/\d{1,2}\/\d{1,2}/)
      })

      expect(analysis[1]).toEqual({
        id: 'D001',
        isExpired: false,
        isLowStock: true,
        stockStatus: 'low',
        formattedExpiry: expect.stringMatching(/\d{4}\/\d{1,2}\/\d{1,2}/)
      })

      expect(analysis[2]).toEqual({
        id: 'D001',
        isExpired: true,
        isLowStock: false,
        stockStatus: 'normal',
        formattedExpiry: expect.stringMatching(/\d{4}\/\d{1,2}\/\d{1,2}/)
      })

      expect(analysis[3]).toEqual({
        id: 'D001',
        isExpired: false,
        isLowStock: false,
        stockStatus: 'normal',
        formattedExpiry: expect.stringMatching(/\d{4}\/\d{1,2}\/\d{1,2}/)
      })
    })
  })

  afterAll(() => {
    vi.useRealTimers()
  })
})