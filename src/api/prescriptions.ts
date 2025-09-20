import type { Prescription, FulfillmentResponse } from '../types/prescription';
import { api } from './client';

export const getPrescriptions = () => api<Prescription[]>('/prescriptions');
export const getPrescription = (id: string) =>
  api<Prescription>(`/prescriptions/${id}`);
export const fulfillPrescription = (id: string) =>
  api<FulfillmentResponse>(`/prescriptions/${id}/fulfill`, { method: 'POST' });
