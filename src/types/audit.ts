export type AuditLog = {
  id: string
  prescriptionId: string
  patientId: string
  patientName?: string
  pharmacyId: string
  pharmacyName?: string
  status: 'SUCCESS' | 'FAILED'
  drugsRequested: PrescriptionDrug[]
  drugsDispensed: PrescriptionDrug[]
  failureReasons?: string[]
  timestamp: string
}

export type PrescriptionDrug = {
  drugId: string
  drugName?: string
  dosage: number
}
