import { productCategories } from "@/entities/product/model/mock-products";

export const pickerFilters = productCategories.map((category) => ({
  id: category.id,
  name: category.name,
}));
