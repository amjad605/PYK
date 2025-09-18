import { useState, useEffect } from "react";
import axios from "../lib/axios";
import type { PropertyData } from "../components/property/PropertyCard.type";
import { mapPropertyFromApi } from "../utils/PropertyMapper";

export const useProperty = (filters?: Record<string, any>) => {
  const [data, setData] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, String(v)));
              } else {
                params.append(key, String(value));
              }
            }
          });
        }

        const { data } = await axios.get(
          `/property/filter?${params.toString()}`
        );

        const propertiesArray = data.data ?? [];
        setTotalCount(data.pagination.total ?? 0);
        setData(propertiesArray.map((doc: any) => mapPropertyFromApi(doc)));
      } catch (err: any) {
        setError(err.message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [JSON.stringify(filters)]);

  return { data, totalCount, loading, error };
};
