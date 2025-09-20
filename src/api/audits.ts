import type { AuditLog } from '../types/audit'
import { api } from './client'

export interface AuditLogFilters {
  patientId?: string
  pharmacyId?: string
  status?: string
}

export const getAuditLogs = (filters?: AuditLogFilters) => {
  const params = new URLSearchParams()
  if (filters?.patientId) params.append('patientId', filters.patientId)
  if (filters?.pharmacyId) params.append('pharmacyId', filters.pharmacyId)
  if (filters?.status) params.append('status', filters.status)
  
  const queryString = params.toString()
  const url = queryString ? `/audit-logs?${queryString}` : '/audit-logs'
  
  return api<AuditLog[]>(url)
}
