import { IPropertyDoc } from "./property.model";
import { ParsedPropertyFilters } from "./property.type";
import { PropertyModel } from "./property.model";
import { AppError } from "../utils/AppError";

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
    const query: any = {};

    // 📌 Price filter
    if (filters.minPrice || filters.maxPrice) {
      if (filters.listingType === "rent") {
        query["price.monthlyRent"] = {};
        if (filters.minPrice)
          query["price.monthlyRent"].$gte = filters.minPrice;
        if (filters.maxPrice)
          query["price.monthlyRent"].$lte = filters.maxPrice;
      } else {
        query["price.amount"] = {};
        if (filters.minPrice) query["price.amount"].$gte = filters.minPrice;
        if (filters.maxPrice) query["price.amount"].$lte = filters.maxPrice;
      }
    }

    // 📌 Area filter
    if (filters.minArea || filters.maxArea) {
      const field = "areas.builtUp";
      query[field] = {};
      if (filters.minArea) query[field].$gte = filters.minArea;
      if (filters.maxArea) query[field].$lte = filters.maxArea;
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

    let properties = [];
    let total = 0;

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    // 📌 Advanced Search
    if (filters.search) {
      const terms = normalizeSearchTerm(filters.search);

      // Text search first
      const textQuery = { ...query, $text: { $search: terms.join(" ") } };

      [properties, total] = await Promise.all([
        PropertyModel.find(textQuery, { score: { $meta: "textScore" } })
          .skip(skip)
          .limit(limit)
          .sort({ score: { $meta: "textScore" } }),
        PropertyModel.countDocuments(textQuery),
      ]);

      // Fallback → regex search
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
          PropertyModel.find(regexQuery).skip(skip).limit(limit),
          PropertyModel.countDocuments(regexQuery),
        ]);
      }
    } else {
      [properties, total] = await Promise.all([
        PropertyModel.find(query).skip(skip).limit(limit),
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

      const exists = await PropertyModel.exists({ title: property.title });
      if (exists) {
        throw new AppError("Property already exists", 400);
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
}

export default new PropertyService();
