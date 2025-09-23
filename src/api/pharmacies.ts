import type { Pharmacy } from "../types/pharmacy";
import { api } from "./client";

export const getPharmacies = () => api<Pharmacy[]>("/pharmacies");
export const getPharmacy = (id: string) => api<Pharmacy>(`/pharmacies/${id}`);
