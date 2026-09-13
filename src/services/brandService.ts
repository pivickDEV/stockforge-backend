import Brand from "../models/brand";
import {
  CreateBrandInput,
  UpdateBrandInput,
} from "../types/brand.types";



export const getAllBrands = async (search?: string) => {
  const query = search
    ? { name: { $regex: search, $options: "i" } } 
    : {};

  const brands = await Brand.find(query).sort({ createdAt: -1 });


  return brands.map((b) => ({
    id: b._id.toString(),
    name: b.name,
    description: b.description || "",
    status: b.status || "ACTIVE",
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));
};



export const getBrandById = async (id: string) => {

  return Brand.findById(id);

};



export const createBrand = async (brand: CreateBrandInput) => {

  return Brand.create(brand);

};


export const updateBrand = async (id: string,data: UpdateBrandInput) => {

  return Brand.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

};



export const deleteBrand = async (id: string) => {

  return Brand.findByIdAndDelete(id);

};