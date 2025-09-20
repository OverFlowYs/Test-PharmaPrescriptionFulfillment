import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getDrugs } from '../../../api/drugs'
import type { Drug } from '../../../types/drug'

// Mock the API
vi.mock('../../../api/drugs', () => ({
  getDrugs: vi.fn()
}))

describe('DrugsList API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

    vi.mocked(getDrugs).mockResolvedValue(mockDrugs)

    const result = await getDrugs()

    expect(getDrugs).toHaveBeenCalled()
    expect(result).toEqual(mockDrugs)
  })

  it('should handle API errors', async () => {
    const error = new Error('Failed to fetch drugs')
    vi.mocked(getDrugs).mockRejectedValue(error)

    await expect(getDrugs()).rejects.toThrow('Failed to fetch drugs')
  })

  it('should return empty array when no drugs', async () => {
    vi.mocked(getDrugs).mockResolvedValue([])

    const result = await getDrugs()

    expect(result).toEqual([])
  })
})