import Customer from "../models/customer";
import Sale from "../models/sale";
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "../types/customer.types";



export const getAllCustomers = async () => {

  return Customer.find();

};



export const getCustomerById = async (id: string) => {

  return Customer.findById(id);

};



export const createCustomer = async (customer: CreateCustomerInput) => {

  return Customer.create(customer);

};



export const updateCustomer = async (id: string, data: UpdateCustomerInput) => {
  return Customer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();
};

export const deleteCustomer = async (id: string) => {
  return Customer.findByIdAndDelete(id).lean();
};

export const getCustomerPurchases = async (customerId: string) => {
  return await Sale.find({ customer: customerId })
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });
};