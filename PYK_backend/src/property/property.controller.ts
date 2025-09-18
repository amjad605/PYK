import { Request, Response } from "express";
import { PropertyModel } from "./property.model";
import propertyService from "./property.service";
import { AsyncWrapper } from "../utils/AsyncWrapper";
import { ParsedPropertyFilters, PropertyFilterRequest } from "./property.type";
class PropertyController {
  private propertyService;
  constructor() {
    this.propertyService = propertyService;
  }

  getProperties = AsyncWrapper(
    async (req: PropertyFilterRequest, res, next) => {
      const filters = req.query;

      const parsedFilters: ParsedPropertyFilters = {
        ...filters,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
        minArea: filters.minArea ? parseInt(filters.minArea) : undefined,
        maxArea: filters.maxArea ? parseInt(filters.maxArea) : undefined,
        bedrooms: filters.bedrooms ? parseInt(filters.bedrooms) : undefined,
        bathrooms: filters.bathrooms ? parseInt(filters.bathrooms) : undefined,

        // pagination
        page: filters.page ? parseInt(filters.page) : 1,
        limit: filters.limit ? parseInt(filters.limit) : 10,
      };
      const result = await propertyService.getFilteredProperties(parsedFilters);

      res.json(result);
    }
  );
  createProperty = AsyncWrapper(async (req, res, next) => {
    const property = req.body;
    const result = await propertyService.createProperty(property);
    res.json(result);
  });
}
export default new PropertyController();
