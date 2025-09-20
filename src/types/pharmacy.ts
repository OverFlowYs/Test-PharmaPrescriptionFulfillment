export type Pharmacy = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  allocatedDrugs: AllocatedDrug[];
};

export type AllocatedDrug = {
  drugId: string;
  drugName: string;
  limit: number;
};
