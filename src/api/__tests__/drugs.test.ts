import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getDrugs, addDrug } from '../drugs'
import type { Drug } from '../../types/drug'

// Mock the API client
vi.mock('../client', () => ({
  api: vi.fn()
}))

import { api } from '../client'

describe('Drugs API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getDrugs', () => {
    it('should fetch drugs successfully', async () => {
      const mockDrugs: Drug[] = [
        {
          id: 'D001',
          name: 'Ibuprofen',
          manufacturer: 'ACME Pharma',
          batch: 'B202403',
          expiry: '2026-01-01',
          stock: 150,
          limit: 200
        }
      ]

      vi.mocked(api).mockResolvedValue(mockDrugs)

      const result = await getDrugs()

      expect(api).toHaveBeenCalledWith('/drugs')
      expect(result).toEqual(mockDrugs)
    })

    it('should handle API errors', async () => {
      const error = new Error('Network error')
      vi.mocked(api).mockRejectedValue(error)

      await expect(getDrugs()).rejects.toThrow('Network error')
    })
  })

  describe('addDrug', () => {
    it('should add a new drug successfully', async () => {
      const newDrug: Omit<Drug, 'id'> = {
        name: 'Aspirin',
        manufacturer: 'MedCorp',
        batch: 'B202404',
        expiry: '2025-12-31',
        stock: 80,
        limit: 150
      }

      const createdDrug: Drug = {
        id: 'D002',
        ...newDrug
      }

      vi.mocked(api).mockResolvedValue(createdDrug)

      const result = await addDrug(newDrug)

      expect(api).toHaveBeenCalledWith('/drugs', {
        method: 'POST',
        body: JSON.stringify(newDrug)
      })
      expect(result).toEqual(createdDrug)
    })

    it('should handle validation errors', async () => {
      const invalidDrug = {
        name: '',
        manufacturer: 'MedCorp',
        batch: 'B202404',
        expiry: '2025-12-31',
        stock: 80,
        limit: 150
      }

      const error = new Error('Validation failed')
      vi.mocked(api).mockRejectedValue(error)

      await expect(addDrug(invalidDrug)).rejects.toThrow('Validation failed')
    })
  })
})
