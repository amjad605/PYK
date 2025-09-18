import { IPropertyDoc } from "./property.model";
import { ParsedPropertyFilters, PropertyFilters } from "./property.type";
import { PropertyModel } from "./property.model";
import { AppError } from "../utils/AppError";
class PropertyService {
  async getFilteredProperties(filters: ParsedPropertyFilters) {
    const query: any = {};

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

      // بدل $all خليك في $in
      query.facilities = { $in: facilitiesArray };
    }
    let properties = [];
    let total = 0;

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    if (filters.search) {
      // 1. Try text search
      const textQuery = { ...query, $text: { $search: filters.search.trim() } };

      [properties, total] = await Promise.all([
        PropertyModel.find(textQuery)
          .skip(skip)
          .limit(limit)
          .sort({ score: { $meta: "textScore" } }),
        PropertyModel.countDocuments(textQuery),
      ]);

      // 2. If no results → fallback to regex (partial match)
      if (total === 0) {
        const regexQuery = {
          ...query,
          $or: [
            {
              title: { $regex: filters.search, $options: "i" },
            },
            { "location.city": { $regex: filters.search, $options: "i" } },
            { "location.district": { $regex: filters.search, $options: "i" } },
            { "location.compound": { $regex: filters.search, $options: "i" } },
            { "developer.name": { $regex: filters.search, $options: "i" } },
          ],
        };

        [properties, total] = await Promise.all([
          PropertyModel.find(regexQuery).skip(skip).limit(limit),
          PropertyModel.countDocuments(regexQuery),
        ]);
      }
    } else {
      // No search, only filters
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
      // Validate required fields early (avoid DB call if obvious missing fields)
      if (!property.title || !property.listingType || !property.propertyType) {
        throw new AppError("Missing required property fields", 400);
      }

      // Use `exists()` instead of `findOne()` for better performance (no full doc returned)
      const exists = await PropertyModel.exists({ title: property.title });
      if (exists) {
        throw new AppError("Property already exists", 400);
      }

      // `create()` already saves, no need to call `save()` again
      const createdProperty = await PropertyModel.create(property);

      return createdProperty;
    } catch (error: any) {
      // Wrap mongoose validation errors nicely
      if (error.name === "ValidationError") {
        throw new AppError(error.message, 400);
      }

      throw error; // rethrow unhandled errors (let global handler catch them)
    }
  }
}

export default new PropertyService();
