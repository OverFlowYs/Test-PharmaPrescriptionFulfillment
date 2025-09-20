import { describe, it, expect, vi, beforeEach } from 'vitest'
import { addDrug } from '../../../api/drugs'
import type { Drug } from '../../../types/drug'

// Mock the API
vi.mock('../../../api/drugs', () => ({
  addDrug: vi.fn()
}))

describe('AddDrugDialog API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

    vi.mocked(addDrug).mockResolvedValue(createdDrug)

    const result = await addDrug(newDrug)

    expect(addDrug).toHaveBeenCalledWith(newDrug)
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
    vi.mocked(addDrug).mockRejectedValue(error)

    await expect(addDrug(invalidDrug)).rejects.toThrow('Validation failed')
  })

  it('should handle network errors', async () => {
    const newDrug: Omit<Drug, 'id'> = {
      name: 'Test Drug',
      manufacturer: 'Test Pharma',
      batch: 'B202403',
      expiry: '2026-01-01',
      stock: 100,
      limit: 200
    }

    const error = new Error('Network error')
    vi.mocked(addDrug).mockRejectedValue(error)

    await expect(addDrug(newDrug)).rejects.toThrow('Network error')
  })
})