export type Prescription = {
  id: string
  patientId: string
  patientName?: string
  pharmacyId: string
  pharmacyName?: string
  drugs: PrescriptionDrug[]
  status: 'PENDING' | 'FULFILLED' | 'FAILED'
  createdAt?: string
}

export type PrescriptionDrug = {
  drugId: string
  drugName?: string
  dosage: number
}

export type FulfillmentResponse = {
  success: boolean
  errors?: string[]
}
