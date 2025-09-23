import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { addDrug, deleteDrug, getDrugs, updateDrug } from "../api/drugs";
import type { Drug } from "../types/drug";

export const useDrugsStore = defineStore("drugs", () => {
  // State
  const drugs = ref<Drug[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const totalDrugs = computed(() => drugs.value.length);

  const lowStockDrugs = computed(() =>
    drugs.value.filter((drug) => drug.stock < 20),
  );

  const expiredDrugs = computed(() =>
    drugs.value.filter((drug) => new Date(drug.expiry) <= new Date()),
  );

  const getDrugById = (id: string) =>
    drugs.value.find((drug) => drug.id === id);

  // Actions
  const fetchDrugs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getDrugs();
      drugs.value = data;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch drugs";
      drugs.value = [];
    } finally {
      loading.value = false;
    }
  };

  const addDrugAction = async (newDrug: Omit<Drug, "id">) => {
    loading.value = true;
    error.value = null;

    try {
      const createdDrug = await addDrug(newDrug);
      drugs.value.push(createdDrug);
    } catch (err: any) {
      error.value = err.message || "Failed to add drug";
    } finally {
      loading.value = false;
    }
  };

  const updateDrugAction = async (id: string, updates: Partial<Drug>) => {
    loading.value = true;
    error.value = null;

    try {
      const updatedDrug = await updateDrug(id, updates);
      const index = drugs.value.findIndex((drug) => drug.id === id);
      if (index !== -1) {
        drugs.value[index] = updatedDrug;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to update drug";
    } finally {
      loading.value = false;
    }
  };

  const deleteDrugAction = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      await deleteDrug(id);
      drugs.value = drugs.value.filter((drug) => drug.id !== id);
    } catch (err: any) {
      error.value = err.message || "Failed to delete drug";
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    drugs,
    loading,
    error,

    // Getters
    totalDrugs,
    lowStockDrugs,
    expiredDrugs,
    getDrugById,

    // Actions
    fetchDrugs,
    addDrug: addDrugAction,
    updateDrug: updateDrugAction,
    deleteDrug: deleteDrugAction,
    clearError,
  };
});
