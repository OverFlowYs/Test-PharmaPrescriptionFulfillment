import type { Drug } from "../types/drug";
import { api } from "./client";

export const getDrugs = () => api<Drug[]>("/drugs");
export const addDrug = (payload: Omit<Drug, "id">) =>
  api<Drug>("/drugs", { method: "POST", body: JSON.stringify(payload) });
export const updateDrug = (id: string, payload: Partial<Drug>) =>
  api<Drug>(`/drugs/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteDrug = (id: string) =>
  api<void>(`/drugs/${id}`, { method: "DELETE" });
