import axios from "axios";
import type {
  PropertyData,
  PropertyFilters,
  PaginationInfo,
} from "@/components/property/PropertyCard.type";
import { mockPropertiesApi, mockOptionsApi } from "./mock-data";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

export interface PropertiesResponse {
  properties: PropertyData[];
  pagination: PaginationInfo;
}

export interface SelectOption {
  value: string;
  label: string;
}

const USE_MOCK_DATA = true; // Set to false when backend is ready

// Properties API
export const propertiesApi = USE_MOCK_DATA
  ? mockPropertiesApi
  : {
      getProperties: async (
        filters: PropertyFilters & { page?: number; limit?: number }
      ): Promise<PropertiesResponse> => {
        const response = await api.get("/properties", { params: filters });
        return response.data;
      },

      createProperty: async (
        property: Omit<PropertyData, "id" | "createdAt" | "updatedAt">
      ): Promise<PropertyData> => {
        const response = await api.post("/properties", property);
        return response.data;
      },

      updateProperty: async (
        id: string,
        property: Partial<PropertyData>
      ): Promise<PropertyData> => {
        const response = await api.put(`/properties/${id}`, property);
        return response.data;
      },

      deleteProperty: async (id: string): Promise<void> => {
        await api.delete(`/properties/${id}`);
      },
    };

// Dynamic options API
export const optionsApi = USE_MOCK_DATA
  ? mockOptionsApi
  : {
      getDevelopers: async (search?: string): Promise<SelectOption[]> => {
        const response = await api.get("/developers", { params: { search } });
        return response.data;
      },

      getCompounds: async (search?: string): Promise<SelectOption[]> => {
        const response = await api.get("/compounds", { params: { search } });
        return response.data;
      },

      getCities: async (search?: string): Promise<SelectOption[]> => {
        const response = await api.get("/cities", { params: { search } });
        return response.data;
      },

      getFacilities: async (search?: string): Promise<SelectOption[]> => {
        const response = await api.get("/facilities", { params: { search } });
        return response.data;
      },
    };
