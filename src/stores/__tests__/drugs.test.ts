import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDrugsStore } from '../drugs'
import { getDrugs, addDrug, updateDrug, deleteDrug } from '../../api/drugs'
import type { Drug } from '../../types/drug'

// Mock the API
vi.mock('../../api/drugs', () => ({
  getDrugs: vi.fn(),
  addDrug: vi.fn(),
  updateDrug: vi.fn(),
  deleteDrug: vi.fn()
}))

describe('Drugs Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const store = useDrugsStore()
      
      expect(store.drugs).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
    })
  })

  describe('fetchDrugs', () => {
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

      const store = useDrugsStore()
      await store.fetchDrugs()

      expect(store.drugs).toEqual(mockDrugs)
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should handle fetch errors', async () => {
      const error = new Error('Failed to fetch drugs')
      vi.mocked(getDrugs).mockRejectedValue(error)

      const store = useDrugsStore()
      await store.fetchDrugs()

      expect(store.drugs).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Failed to fetch drugs')
    })

    it('should set loading state during fetch', async () => {
      let resolvePromise: (value: Drug[]) => void
      const promise = new Promise<Drug[]>((resolve) => {
        resolvePromise = resolve
      })
      vi.mocked(getDrugs).mockReturnValue(promise)

      const store = useDrugsStore()
      const fetchPromise = store.fetchDrugs()

      expect(store.loading).toBe(true)

      resolvePromise!([])
      await fetchPromise

      expect(store.loading).toBe(false)
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

      vi.mocked(addDrug).mockResolvedValue(createdDrug)

      const store = useDrugsStore()
      store.drugs = [{ id: 'D001', name: 'Existing Drug', manufacturer: 'Test', batch: 'B001', expiry: '2025-01-01', stock: 100, limit: 50 }]
      
      await store.addDrug(newDrug)

      expect(store.drugs).toHaveLength(2)
      expect(store.drugs[1]).toEqual(createdDrug)
    })

    it('should handle add drug errors', async () => {
      const newDrug: Omit<Drug, 'id'> = {
        name: 'Test Drug',
        manufacturer: 'Test Pharma',
        batch: 'B202403',
        expiry: '2026-01-01',
        stock: 100,
        limit: 200
      }

      const error = new Error('Failed to add drug')
      vi.mocked(addDrug).mockRejectedValue(error)

      const store = useDrugsStore()
      await store.addDrug(newDrug)

      expect(store.drugs).toEqual([])
      expect(store.error).toBe('Failed to add drug')
    })
  })

  describe('updateDrug', () => {
    it('should update drug successfully', async () => {
      const existingDrug: Drug = {
        id: 'D001',
        name: 'Ibuprofen',
        manufacturer: 'ACME Pharma',
        batch: 'B202403',
        expiry: '2026-01-01',
        stock: 150,
        limit: 200
      }

      const updatedDrug: Drug = {
        ...existingDrug,
        stock: 200
      }

      vi.mocked(updateDrug).mockResolvedValue(updatedDrug)

      const store = useDrugsStore()
      store.drugs = [existingDrug]
      
      await store.updateDrug('D001', { stock: 200 })

      expect(store.drugs[0]).toEqual(updatedDrug)
    })

    it('should handle update drug errors', async () => {
      const error = new Error('Failed to update drug')
      vi.mocked(updateDrug).mockRejectedValue(error)

      const store = useDrugsStore()
      await store.updateDrug('D001', { stock: 200 })

      expect(store.error).toBe('Failed to update drug')
    })
  })

  describe('deleteDrug', () => {
    it('should delete drug successfully', async () => {
      const drugToDelete: Drug = {
        id: 'D001',
        name: 'Ibuprofen',
        manufacturer: 'ACME Pharma',
        batch: 'B202403',
        expiry: '2026-01-01',
        stock: 150,
        limit: 200
      }

      vi.mocked(deleteDrug).mockResolvedValue(undefined)

      const store = useDrugsStore()
      store.drugs = [drugToDelete]
      
      await store.deleteDrug('D001')

      expect(store.drugs).toEqual([])
    })

    it('should handle delete drug errors', async () => {
      const error = new Error('Failed to delete drug')
      vi.mocked(deleteDrug).mockRejectedValue(error)

      const store = useDrugsStore()
      await store.deleteDrug('D001')

      expect(store.error).toBe('Failed to delete drug')
    })
  })

  describe('computed properties', () => {
    it('should calculate total drugs count', () => {
      const store = useDrugsStore()
      store.drugs = [
        { id: 'D001', name: 'Drug 1', manufacturer: 'Test', batch: 'B001', expiry: '2025-01-01', stock: 100, limit: 50 },
        { id: 'D002', name: 'Drug 2', manufacturer: 'Test', batch: 'B002', expiry: '2025-01-01', stock: 100, limit: 50 }
      ]

      expect(store.totalDrugs).toBe(2)
    })

    it('should find drugs by id', () => {
      const drug: Drug = {
        id: 'D001',
        name: 'Ibuprofen',
        manufacturer: 'ACME Pharma',
        batch: 'B202403',
        expiry: '2026-01-01',
        stock: 150,
        limit: 200
      }

      const store = useDrugsStore()
      store.drugs = [drug]

      expect(store.getDrugById('D001')).toEqual(drug)
      expect(store.getDrugById('D999')).toBeUndefined()
    })

    it('should filter low stock drugs', () => {
      const store = useDrugsStore()
      store.drugs = [
        { id: 'D001', name: 'Drug 1', manufacturer: 'Test', batch: 'B001', expiry: '2025-01-01', stock: 5, limit: 50 },
        { id: 'D002', name: 'Drug 2', manufacturer: 'Test', batch: 'B002', expiry: '2025-01-01', stock: 100, limit: 50 },
        { id: 'D003', name: 'Drug 3', manufacturer: 'Test', batch: 'B003', expiry: '2025-01-01', stock: 15, limit: 50 }
      ]

      const lowStockDrugs = store.lowStockDrugs
      expect(lowStockDrugs).toHaveLength(2)
      expect(lowStockDrugs.map(d => d.id)).toEqual(['D001', 'D003'])
    })

    it('should filter expired drugs', () => {
      const store = useDrugsStore()
      store.drugs = [
        { id: 'D001', name: 'Drug 1', manufacturer: 'Test', batch: 'B001', expiry: '2024-01-01', stock: 100, limit: 50 },
        { id: 'D002', name: 'Drug 2', manufacturer: 'Test', batch: 'B002', expiry: '2026-01-01', stock: 100, limit: 50 },
        { id: 'D003', name: 'Drug 3', manufacturer: 'Test', batch: 'B003', expiry: '2023-12-31', stock: 100, limit: 50 }
      ]

      const expiredDrugs = store.expiredDrugs
      expect(expiredDrugs).toHaveLength(2)
      expect(expiredDrugs.map(d => d.id)).toEqual(['D001', 'D003'])
    })
  })
})
