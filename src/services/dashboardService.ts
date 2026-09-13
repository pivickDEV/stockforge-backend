import Category from "../models/category";
import Customer from "../models/customer";
import Product from "../models/product";
import Supplier from "../models/supplier";

export const getDashboard = async () => {

  const [totalProducts, totalCategories, totalSuppliers, totalCustomers] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Supplier.countDocuments(),
      Customer.countDocuments(),
    ]);

  return {
    totalProducts,
    totalCategories,
    totalSuppliers,
    totalCustomers,
  };
};