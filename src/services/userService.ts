import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";

import {
  CreateUserInput,
  LoginUserInput,
} from "../types/user.types";



export const createUser = async (
  data: CreateUserInput
) => {

  const existingUser = await User.findOne({
    email: data.email,
  });


  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }


  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );


  return User.create({
    ...data,
    password: hashedPassword,
  });

};




export const loginUser = async (
  data: LoginUserInput
) => {

  const user = await User
    .findOne({
      email: data.email,
    })
    .select("+password");


  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }



  const isPasswordValid =
    await bcrypt.compare(
      data.password,
      user.password
    );


  if (!isPasswordValid) {
    throw new Error(
      "Invalid email or password"
    );
  }



  user.lastLogin = new Date();

  await user.save();



  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },

    process.env.JWT_SECRET as string,

    {
      expiresIn: "1d",
    }
  );



  return {
    token,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };

};




export const getAllUsers = async (search?: string) => {
  const query: Record<string, unknown> = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  return User.find(query).select("-password");
};




export const getUserById = async (
  id: string
) => {

  return User
    .findById(id)
    .select("-password");

};




export const updateUser = async (
  id: string,
  data: Partial<CreateUserInput>
) => {


  if (data.password) {

    data.password =
      await bcrypt.hash(
        data.password,
        10
      );

  }


  return User.findByIdAndUpdate(id,data,{new: true, runValidators: true,}
  )
  .select("-password");

};




export const deleteUser = async (
  id: string
) => {

  return User.findByIdAndDelete(id);

};