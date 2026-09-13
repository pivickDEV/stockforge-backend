import Supplier from "../models/supplier";
import { CreateSupplierInput, UpdateSupplierInput } from "../types/supplier.types";

export const getAllSuppliers = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { contactPerson: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  const [rawSuppliers, totalRecords] = await Promise.all([
    Supplier.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Supplier.countDocuments(query),
  ]);

  const suppliers = rawSuppliers.map((s) => ({
    id: s._id.toString(),
    name: s.name,
    contactPerson: s.contactPerson,
    email: s.email,
    phone: s.phone,
    address: s.address,
    status: s.status || "ACTIVE",
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  return {
    suppliers,
    totalRecords,
    totalPages,
    currentPage: page,
  };
};

export const getSupplierById = async (id: string) => {
  return Supplier.findById(id);
};

export const createSupplier = async (data: CreateSupplierInput) => {
  const supplier = await Supplier.create(data);
  return {
    id: supplier._id.toString(),
    name: supplier.name,
    contactPerson: supplier.contactPerson,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
    status: supplier.status,
    createdAt: supplier.createdAt.toISOString(),
    updatedAt: supplier.updatedAt.toISOString(),
  };
};

export const updateSupplier = async (id: string, data: UpdateSupplierInput) => {
  return Supplier.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteSupplier = async (id: string) => {
  return Supplier.findByIdAndDelete(id);
};