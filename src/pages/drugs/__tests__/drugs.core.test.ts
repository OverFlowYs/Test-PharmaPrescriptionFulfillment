import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getDrugs, addDrug, updateDrug, deleteDrug } from '../../../api/drugs'
import { api } from '../../../api/client'
import type { Drug } from '../../../types/drug'

// Mock the API client
vi.mock('../../../api/client', () => ({
  api: vi.fn()
}))

describe('Drug API Core Functions', () => {
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
    it('should add drug successfully', async () => {
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
  })

  describe('updateDrug', () => {
    it('should update drug successfully', async () => {
      const drugId = 'D001'
      const updates = { stock: 200 }

      const updatedDrug: Drug = {
        id: drugId,
        name: 'Ibuprofen',
        manufacturer: 'ACME Pharma',
        batch: 'B202403',
        expiry: '2026-01-01',
        stock: 200,
        limit: 200
      }

      vi.mocked(api).mockResolvedValue(updatedDrug)

      const result = await updateDrug(drugId, updates)

      expect(api).toHaveBeenCalledWith(`/drugs/${drugId}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      })
      expect(result).toEqual(updatedDrug)
    })
  })

  describe('deleteDrug', () => {
    it('should delete drug successfully', async () => {
      const drugId = 'D001'

      vi.mocked(api).mockResolvedValue(undefined)

      await deleteDrug(drugId)

      expect(api).toHaveBeenCalledWith(`/drugs/${drugId}`, {
        method: 'DELETE'
      })
    })
  })
})
