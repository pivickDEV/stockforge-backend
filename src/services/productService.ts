import Product from "../models/product";
import {
  CreateProductInput,
  UpdateProductInput
} from "../types/product.types";


export const getAllProducts = async (
  page = 1,
  limit = 10,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const escapedSearch = search?.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

 const filter =
    escapedSearch && escapedSearch !== ""
      ? {
          name: {
            $regex: escapedSearch,
            $options: "i",
          },
        }
      : {};

const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name")
      .populate("brandId", "name")
      .populate("supplierId", "name")
      .populate("createdBy", "name email"),
    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages,
    },
  };
};



export const getProductById = async (id: string) => {

  return Product.findById(id)
    .populate("categoryId", "name")
    .populate("brandId", "name")
    .populate("supplierId", "name");

};



export const createProduct = async (
  product: CreateProductInput,
  createdBy: string
) => {
  const { categoryId, brandId, supplierId, ...rest } = product;

  if (!categoryId || !brandId || !supplierId) {
    throw new Error("Category, brand, and supplier are required");
  }

  return Product.create({
    ...rest,
    categoryId,
    brandId,
    supplierId,
    createdBy,
  });
};



export const updateProduct = async (id: string, data: UpdateProductInput) => {

 return Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .populate("categoryId", "name")
    .populate("brandId", "name")
    .populate("supplierId", "name");
};


export const deleteProduct = async (id: string) => {

  return Product.findByIdAndDelete(id);

};