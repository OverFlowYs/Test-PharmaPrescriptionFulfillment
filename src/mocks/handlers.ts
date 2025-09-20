import { http, HttpResponse } from 'msw'
import { drugs, pharmacies, prescriptions, auditLogs } from './data'
import type { FulfillmentResponse } from '../types/prescription'

export const handlers = [
  // Drugs API
  http.get('/drugs', () => {
    return HttpResponse.json(drugs)
  }),
  http.post('/drugs', async ({ request }) => {
    const body = await request.json() as any
    // 简单校验：必填 & expiry 必须在未来
    if (!body.name || !body.batch || !body.expiry) {
      return HttpResponse.json({ message: '字段缺失' }, { status: 400 })
    }
    if (new Date(body.expiry) <= new Date()) {
      return HttpResponse.json({ message: '有效期必须是未来日期' }, { status: 400 })
    }
    const id = 'D' + String(1 + drugs.length).padStart(3, '0')
    const created = { id, ...body }
    drugs.push(created)
    return HttpResponse.json(created, { status: 201 })
  }),

  // Pharmacies API
  http.get('/pharmacies', () => {
    return HttpResponse.json(pharmacies)
  }),
  http.get('/pharmacies/:id', ({ params }) => {
    const pharmacy = pharmacies.find(p => p.id === params.id)
    if (!pharmacy) {
      return HttpResponse.json({ message: 'Pharmacy not found' }, { status: 404 })
    }
    return HttpResponse.json(pharmacy)
  }),

  // Prescriptions API
  http.get('/prescriptions', () => {
    return HttpResponse.json(prescriptions)
  }),
  http.get('/prescriptions/:id', ({ params }) => {
    const prescription = prescriptions.find(p => p.id === params.id)
    if (!prescription) {
      return HttpResponse.json({ message: 'Prescription not found' }, { status: 404 })
    }
    return HttpResponse.json(prescription)
  }),
  http.post('/prescriptions/:id/fulfill', async ({ params }) => {
    const prescription = prescriptions.find(p => p.id === params.id)
    if (!prescription) {
      return HttpResponse.json({ message: 'Prescription not found' }, { status: 404 })
    }

    // 模拟业务逻辑验证
    const errors: string[] = []
    
    for (const drug of prescription.drugs) {
      const drugData = drugs.find(d => d.id === drug.drugId)
      if (!drugData) {
        errors.push(`Drug ${drug.drugId} not found`)
        continue
      }
      
      // 检查是否过期
      if (new Date(drugData.expiry) <= new Date()) {
        errors.push(`Drug ${drug.drugId} is expired`)
      }
      
      // 检查库存
      if (drugData.stock < drug.dosage) {
        errors.push(`Drug ${drug.drugId} insufficient stock`)
      }
      
      // 检查药房分配限制
      const pharmacy = pharmacies.find(p => p.id === prescription.pharmacyId)
      const allocatedDrug = pharmacy?.allocatedDrugs.find(ad => ad.drugId === drug.drugId)
      if (allocatedDrug && drug.dosage > allocatedDrug.limit) {
        errors.push(`Drug ${drug.drugId} exceeds pharmacy allocation`)
      }
    }

    if (errors.length > 0) {
      const response: FulfillmentResponse = { success: false, errors }
      return HttpResponse.json(response, { status: 400 })
    }

    // 成功处理
    prescription.status = 'FULFILLED'
    const response: FulfillmentResponse = { success: true }
    return HttpResponse.json(response)
  }),

  // Audit Logs API
  http.get('/audit-logs', ({ request }) => {
    const url = new URL(request.url)
    const patientId = url.searchParams.get('patientId')
    const pharmacyId = url.searchParams.get('pharmacyId')
    const status = url.searchParams.get('status')
    
    let filteredLogs = auditLogs
    
    if (patientId) {
      filteredLogs = filteredLogs.filter(log => log.patientId === patientId)
    }
    if (pharmacyId) {
      filteredLogs = filteredLogs.filter(log => log.pharmacyId === pharmacyId)
    }
    if (status) {
      filteredLogs = filteredLogs.filter(log => log.status === status)
    }
    
    return HttpResponse.json(filteredLogs)
  }),
]
