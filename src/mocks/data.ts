import type { Drug } from "../types/drug";
import type { Pharmacy } from "../types/pharmacy";
import type { Prescription } from "../types/prescription";
import type { AuditLog } from "../types/audit";

export const drugs: Drug[] = [
  {
    id: "D001",
    name: "Ibuprofen",
    manufacturer: "ACME Pharma",
    batch: "B202403",
    expiry: "2026-01-01",
    stock: 150,
    limit: 200,
  },
  {
    id: "D002",
    name: "Paracetamol",
    manufacturer: "ACME Pharma",
    batch: "B202312",
    expiry: "2024-06-01",
    stock: 20,
    limit: 100, // 过期样例
  },
  {
    id: "D003",
    name: "Aspirin",
    manufacturer: "MedCorp",
    batch: "B202404",
    expiry: "2025-12-31",
    stock: 80,
    limit: 150,
  },
  {
    id: "D004",
    name: "Amoxicillin",
    manufacturer: "PharmaPlus",
    batch: "B202401",
    expiry: "2024-12-01",
    stock: 5,
    limit: 50, // 即将过期
  },
];

export const pharmacies: Pharmacy[] = [
  {
    id: "PH001",
    name: "Chengdu Main Branch",
    address: "123 Main St, Chengdu",
    phone: "028-12345678",
    allocatedDrugs: [
      { drugId: "D001", drugName: "Ibuprofen", limit: 200 },
      { drugId: "D002", drugName: "Paracetamol", limit: 100 },
      { drugId: "D003", drugName: "Aspirin", limit: 150 },
    ],
  },
  {
    id: "PH002",
    name: "Shanghai Central Pharmacy",
    address: "456 Central Ave, Shanghai",
    phone: "021-87654321",
    allocatedDrugs: [
      { drugId: "D001", drugName: "Ibuprofen", limit: 150 },
      { drugId: "D003", drugName: "Aspirin", limit: 100 },
      { drugId: "D004", drugName: "Amoxicillin", limit: 50 },
    ],
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "RX001",
    patientId: "P001",
    patientName: "张三",
    pharmacyId: "PH001",
    pharmacyName: "Chengdu Main Branch",
    drugs: [
      { drugId: "D001", drugName: "Ibuprofen", dosage: 400 },
      { drugId: "D002", drugName: "Paracetamol", dosage: 500 },
    ],
    status: "PENDING",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "RX002",
    patientId: "P002",
    patientName: "李四",
    pharmacyId: "PH002",
    pharmacyName: "Shanghai Central Pharmacy",
    drugs: [{ drugId: "D003", drugName: "Aspirin", dosage: 100 }],
    status: "FULFILLED",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "RX003",
    patientId: "P003",
    patientName: "王五",
    pharmacyId: "PH001",
    pharmacyName: "Chengdu Main Branch",
    drugs: [{ drugId: "D004", drugName: "Amoxicillin", dosage: 250 }],
    status: "FAILED",
    createdAt: "2024-01-13T09:15:00Z",
  },
];

export const auditLogs: AuditLog[] = [
  {
    id: "A001",
    prescriptionId: "RX001",
    patientId: "P001",
    patientName: "张三",
    pharmacyId: "PH001",
    pharmacyName: "Chengdu Main Branch",
    status: "SUCCESS",
    drugsRequested: [
      { drugId: "D001", drugName: "Ibuprofen", dosage: 400 },
      { drugId: "D002", drugName: "Paracetamol", dosage: 500 },
    ],
    drugsDispensed: [
      { drugId: "D001", drugName: "Ibuprofen", dosage: 400 },
      { drugId: "D002", drugName: "Paracetamol", dosage: 500 },
    ],
    timestamp: "2024-01-15T10:35:00Z",
  },
  {
    id: "A002",
    prescriptionId: "RX003",
    patientId: "P003",
    patientName: "王五",
    pharmacyId: "PH001",
    pharmacyName: "Chengdu Main Branch",
    status: "FAILED",
    drugsRequested: [{ drugId: "D004", drugName: "Amoxicillin", dosage: 250 }],
    drugsDispensed: [],
    failureReasons: ["Drug D004 is expired", "Insufficient stock"],
    timestamp: "2024-01-13T09:20:00Z",
  },
];
