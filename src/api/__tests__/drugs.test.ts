import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDrugs, addDrug, updateDrug, deleteDrug } from "../drugs";
import { api } from "../client";
import type { Drug } from "../../types/drug";

vi.mock("../client", () => ({
  api: vi.fn(),
}));

describe("Drug API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDrugs", () => {
    it("should fetch drugs successfully", async () => {
      const mockDrugs: Drug[] = [
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
          name: "Aspirin",
          manufacturer: "MedCorp",
          batch: "B202404",
          expiry: "2025-12-31",
          stock: 80,
          limit: 150,
        },
      ];

      vi.mocked(api).mockResolvedValue(mockDrugs);

      const result = await getDrugs();

      expect(api).toHaveBeenCalledWith("/drugs");
      expect(result).toEqual(mockDrugs);
    });

    it("should handle empty response", async () => {
      vi.mocked(api).mockResolvedValue([]);

      const result = await getDrugs();

      expect(api).toHaveBeenCalledWith("/drugs");
      expect(result).toEqual([]);
    });

    it("should handle API errors", async () => {
      const error = new Error("Network error");
      vi.mocked(api).mockRejectedValue(error);

      await expect(getDrugs()).rejects.toThrow("Network error");
      expect(api).toHaveBeenCalledWith("/drugs");
    });

    it("should handle server errors", async () => {
      const error = new Error("Server error");
      error.message = "500 Internal Server Error";
      vi.mocked(api).mockRejectedValue(error);

      await expect(getDrugs()).rejects.toThrow("500 Internal Server Error");
    });
  });

  describe("addDrug", () => {
    it("should add drug successfully", async () => {
      const newDrug: Omit<Drug, "id"> = {
        name: "Paracetamol",
        manufacturer: "HealthCorp",
        batch: "B202405",
        expiry: "2026-06-30",
        stock: 200,
        limit: 300,
      };

      const createdDrug: Drug = {
        id: "D003",
        ...newDrug,
      };

      vi.mocked(api).mockResolvedValue(createdDrug);

      const result = await addDrug(newDrug);

      expect(api).toHaveBeenCalledWith("/drugs", {
        method: "POST",
        body: JSON.stringify(newDrug),
      });
      expect(result).toEqual(createdDrug);
    });

    it("should handle validation errors", async () => {
      const invalidDrug = {
        name: "", // Invalid: empty name
        manufacturer: "Test Pharma",
        batch: "B202405",
        expiry: "2026-06-30",
        stock: 200,
        limit: 300,
      };

      const error = new Error("Validation failed");
      error.message = "Name is required";
      vi.mocked(api).mockRejectedValue(error);

      await expect(addDrug(invalidDrug)).rejects.toThrow("Name is required");
      expect(api).toHaveBeenCalledWith("/drugs", {
        method: "POST",
        body: JSON.stringify(invalidDrug),
      });
    });

    it("should handle duplicate drug errors", async () => {
      const duplicateDrug: Omit<Drug, "id"> = {
        name: "Ibuprofen",
        manufacturer: "ACME Pharma",
        batch: "B202403",
        expiry: "2026-01-01",
        stock: 150,
        limit: 200,
      };

      const error = new Error("Drug already exists");
      vi.mocked(api).mockRejectedValue(error);

      await expect(addDrug(duplicateDrug)).rejects.toThrow(
        "Drug already exists",
      );
    });

    it("should handle network timeout", async () => {
      const newDrug: Omit<Drug, "id"> = {
        name: "Test Drug",
        manufacturer: "Test Pharma",
        batch: "B202405",
        expiry: "2026-06-30",
        stock: 200,
        limit: 300,
      };

      const error = new Error("Request timeout");
      vi.mocked(api).mockRejectedValue(error);

      await expect(addDrug(newDrug)).rejects.toThrow("Request timeout");
    });
  });

  describe("updateDrug", () => {
    it("should update drug successfully", async () => {
      const drugId = "D001";
      const updates = {
        stock: 200,
        limit: 250,
      };

      const updatedDrug: Drug = {
        id: drugId,
        name: "Ibuprofen",
        manufacturer: "ACME Pharma",
        batch: "B202403",
        expiry: "2026-01-01",
        stock: 200,
        limit: 250,
      };

      vi.mocked(api).mockResolvedValue(updatedDrug);

      const result = await updateDrug(drugId, updates);

      expect(api).toHaveBeenCalledWith(`/drugs/${drugId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
      expect(result).toEqual(updatedDrug);
    });

    it("should handle drug not found error", async () => {
      const drugId = "D999";
      const updates = { stock: 200 };

      const error = new Error("Drug not found");
      vi.mocked(api).mockRejectedValue(error);

      await expect(updateDrug(drugId, updates)).rejects.toThrow(
        "Drug not found",
      );
      expect(api).toHaveBeenCalledWith(`/drugs/${drugId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    });

    it("should handle invalid update data", async () => {
      const drugId = "D001";
      const invalidUpdates = {
        stock: -1, // Invalid: negative stock
        limit: 0,
      };

      const error = new Error("Invalid update data");
      vi.mocked(api).mockRejectedValue(error);

      await expect(updateDrug(drugId, invalidUpdates)).rejects.toThrow(
        "Invalid update data",
      );
    });
  });

  describe("deleteDrug", () => {
    it("should delete drug successfully", async () => {
      const drugId = "D001";

      vi.mocked(api).mockResolvedValue(undefined);

      await deleteDrug(drugId);

      expect(api).toHaveBeenCalledWith(`/drugs/${drugId}`, {
        method: "DELETE",
      });
    });

    it("should handle drug not found error", async () => {
      const drugId = "D999";

      const error = new Error("Drug not found");
      vi.mocked(api).mockRejectedValue(error);

      await expect(deleteDrug(drugId)).rejects.toThrow("Drug not found");
      expect(api).toHaveBeenCalledWith(`/drugs/${drugId}`, {
        method: "DELETE",
      });
    });

    it("should handle drug in use error", async () => {
      const drugId = "D001";

      const error = new Error("Cannot delete drug: drug is in use");
      vi.mocked(api).mockRejectedValue(error);

      await expect(deleteDrug(drugId)).rejects.toThrow(
        "Cannot delete drug: drug is in use",
      );
    });

    it("should handle permission denied error", async () => {
      const drugId = "D001";

      const error = new Error("Permission denied");
      vi.mocked(api).mockRejectedValue(error);

      await expect(deleteDrug(drugId)).rejects.toThrow("Permission denied");
    });
  });

  describe("API Client Integration", () => {
    it("should use correct HTTP methods", async () => {
      const mockDrug: Drug = {
        id: "D001",
        name: "Test Drug",
        manufacturer: "Test Pharma",
        batch: "B202403",
        expiry: "2026-01-01",
        stock: 100,
        limit: 200,
      };

      // Test GET
      vi.mocked(api).mockResolvedValue([mockDrug]);
      await getDrugs();
      expect(api).toHaveBeenCalledWith("/drugs");

      // Test POST
      vi.mocked(api).mockResolvedValue(mockDrug);
      await addDrug(mockDrug);
      expect(api).toHaveBeenCalledWith("/drugs", {
        method: "POST",
        body: JSON.stringify(mockDrug),
      });

      // Test PUT
      vi.mocked(api).mockResolvedValue(mockDrug);
      await updateDrug("D001", { stock: 150 });
      expect(api).toHaveBeenCalledWith("/drugs/D001", {
        method: "PUT",
        body: JSON.stringify({ stock: 150 }),
      });

      // Test DELETE
      vi.mocked(api).mockResolvedValue(undefined);
      await deleteDrug("D001");
      expect(api).toHaveBeenCalledWith("/drugs/D001", {
        method: "DELETE",
      });
    });

    it("should handle JSON serialization", async () => {
      const newDrug: Omit<Drug, "id"> = {
        name: "Test Drug",
        manufacturer: "Test Pharma",
        batch: "B202403",
        expiry: "2026-01-01",
        stock: 100,
        limit: 200,
      };

      vi.mocked(api).mockResolvedValue({ id: "D001", ...newDrug });

      await addDrug(newDrug);

      expect(api).toHaveBeenCalledWith("/drugs", {
        method: "POST",
        body: JSON.stringify(newDrug),
      });
    });
  });

  describe("Error Scenarios", () => {
    it("should handle malformed JSON response", async () => {
      const error = new Error("Unexpected token < in JSON at position 0");
      vi.mocked(api).mockRejectedValue(error);

      await expect(getDrugs()).rejects.toThrow(
        "Unexpected token < in JSON at position 0",
      );
    });

    it("should handle connection refused", async () => {
      const error = new Error("Connection refused");
      vi.mocked(api).mockRejectedValue(error);

      await expect(getDrugs()).rejects.toThrow("Connection refused");
    });

    it("should handle rate limiting", async () => {
      const error = new Error("Too many requests");
      error.message = "429 Too Many Requests";
      vi.mocked(api).mockRejectedValue(error);

      await expect(getDrugs()).rejects.toThrow("429 Too Many Requests");
    });
  });
});
