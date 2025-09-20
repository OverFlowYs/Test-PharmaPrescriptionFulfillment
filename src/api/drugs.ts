import type { Drug } from '../types/drug'
import { api } from './client'

export const getDrugs = () => api<Drug[]>('/drugs')
export const addDrug = (payload: Omit<Drug, 'id'>) =>
  api<Drug>('/drugs', { method: 'POST', body: JSON.stringify(payload) })
