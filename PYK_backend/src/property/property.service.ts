import { IPropertyDoc } from "./property.model";
import { ParsedPropertyFilters } from "./property.type";
import { PropertyModel } from "./property.model";
import { AppError } from "../utils/AppError";
import { FilterQuery, SortOrder } from "mongoose";

// 🔹 Helper function to normalize search terms
function normalizeSearchTerm(term: string): string[] {
  const lower = term.toLowerCase().trim();

  const synonyms: Record<string, string[]> = {
    fifth: [
      "5th",
      "fifth",
      "خامس",
      "el khames",
      "fifth settlement",
      "tagmo3 el khames",
      "التجمع الخامس",
    ],
    "new cairo": ["new cairo", "el tagmo3", "القاهرة الجديدة"],
    "6 october": [
      "6 october",
      "october",
      "٦ اكتوبر",
      "مدينة 6 اكتوبر",
      "6 october city",
      "اكتوبر",
    ],
  };

  let expanded = [lower];
  for (const [key, values] of Object.entries(synonyms)) {
    if (values.includes(lower)) {
      expanded = [...expanded, ...values];
    }
  }

  return [...new Set(expanded)];
}

class PropertyService {
  async getFilteredProperties(filters: ParsedPropertyFilters) {
    // 1. Initialize Query with strict typing
    const query: FilterQuery<typeof PropertyModel> = {};

    // 📌 Price filter logic (Stayed the same, but typed)
    if (filters.minPrice || filters.maxPrice) {
      const priceField =
        filters.listingType === "rent" ? "price.monthlyRent" : "price.amount";
      query[priceField] = {};
      if (filters.minPrice) query[priceField].$gte = filters.minPrice;
      if (filters.maxPrice) query[priceField].$lte = filters.maxPrice;
    }

    // 📌 Range & Equality Filters
    if (filters.minArea || filters.maxArea) {
      query["areas.builtUp"] = {};
      if (filters.minArea) query["areas.builtUp"].$gte = filters.minArea;
      if (filters.maxArea) query["areas.builtUp"].$lte = filters.maxArea;
    }

    if (filters.bedrooms) query.bedrooms = filters.bedrooms;
    if (filters.bathrooms) query.bathrooms = filters.bathrooms;
    if (filters.furnishing) query.furnishing = filters.furnishing;
    if (filters.listingType) query.listingType = filters.listingType;
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.location) query["location.district"] = filters.location;
    if (filters.compound) query.compound = filters.compound;

    if (filters.facilities) {
      const facilitiesArray = Array.isArray(filters.facilities)
        ? filters.facilities
        : [filters.facilities];
      query.facilities = { $in: facilitiesArray };
    }

    // 📌 2. Dynamic Sorting Logic
    const sortOptions: { [key: string]: SortOrder } = {};

    if (filters.sortBy) {
      const order: SortOrder = filters.sortOrder === "asc" ? 1 : -1;

      switch (filters.sortBy) {
        case "price":
          const priceField =
            filters.listingType === "rent"
              ? "price.monthlyRent"
              : "price.amount";
          sortOptions[priceField] = order;
          break;
        case "area":
          sortOptions["areas.builtUp"] = order;
          break;
        case "createdAt":
        default:
          sortOptions["createdAt"] = order;
      }
    } else if (!filters.search) {
      // Default sort for browsing if no search term is provided
      sortOptions["createdAt"] = -1;
    }

    // 📌 3. Pagination Setup
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, Math.min(100, filters.limit || 20)); // Cap limit at 100
    const skip = (page - 1) * limit;

    let properties = [];
    let total = 0;

    // 📌 4. Execution Logic (Search vs. Filter)
    if (filters.search) {
      const terms = normalizeSearchTerm(filters.search);
      const textQuery = { ...query, $text: { $search: terms.join(" ") } };

      // If user provided an explicit sort, use it. Otherwise, use textScore relevance.
      const textSort =
        Object.keys(sortOptions).length > 0
          ? sortOptions
          : { score: { $meta: "textScore" } };

      [properties, total] = await Promise.all([
        PropertyModel.find(textQuery, { score: { $meta: "textScore" } })
          .sort(textSort as any)
          .skip(skip)
          .limit(limit)
          .lean(), // lean() for better performance on read-only
        PropertyModel.countDocuments(textQuery),
      ]);

      // Fallback to Regex if Text Search yields nothing
      if (total === 0) {
        const regexQuery = {
          ...query,
          $or: terms.map((t) => ({
            $or: [
              { title: { $regex: t, $options: "i" } },
              { "location.city": { $regex: t, $options: "i" } },
              { "location.district": { $regex: t, $options: "i" } },
              { "location.compound": { $regex: t, $options: "i" } },
              { "developer.name": { $regex: t, $options: "i" } },
            ],
          })),
        };

        [properties, total] = await Promise.all([
          PropertyModel.find(regexQuery)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean(),
          PropertyModel.countDocuments(regexQuery),
        ]);
      }
    } else {
      // Standard Filtered Query
      [properties, total] = await Promise.all([
        PropertyModel.find(query)
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .lean(),
        PropertyModel.countDocuments(query),
      ]);
    }

    return {
      data: properties,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createProperty(property: Partial<IPropertyDoc>): Promise<IPropertyDoc> {
    try {
      if (!property.title || !property.listingType || !property.propertyType) {
        throw new AppError("Missing required property fields", 400);
      }

      // Process location if it exists
      if (property.location) {
        if (property.propertyLocation?.city) {
          property.propertyLocation.city = property.propertyLocation.city
            .toLowerCase()
            .replace(/\s+/g, "");
        }

        if (property.propertyLocation?.district) {
          property.propertyLocation.district =
            property.propertyLocation.district
              .toLowerCase()
              .replace(/\s+/g, "");
        }
      }

      const createdProperty = await PropertyModel.create(property);
      return createdProperty;
    } catch (error: any) {
      if (error.name === "ValidationError") {
        throw new AppError(error.message, 400);
      }
      throw error;
    }
  }
  async deleteProperty(propertyId: string): Promise<void> {
    const result = await PropertyModel.findByIdAndDelete(propertyId);
    if (!result) {
      throw new AppError("Property not found", 404);
    }
  }
}

export default new PropertyService();
