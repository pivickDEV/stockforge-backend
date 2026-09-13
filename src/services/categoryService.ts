import Category from "../models/category";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types/category.types";



export const getAllCategories = async (search?: string) => {
  const query = search
    ? { name: { $regex: search, $options: "i" } } 
    : {};
    
  return Category.find(query);
};



export const getCategoryById = async (id: string) => {

  return Category.findById(id);

};



export const createCategory = async (
  category: CreateCategoryInput
) => {

  return Category.create(category);

};



export const updateCategory = async (id: string,data: UpdateCategoryInput) => {

  return Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

};



export const deleteCategory = async (id: string) => {

  return Category.findByIdAndDelete(id);

};