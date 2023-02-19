import express, { Application, Request, Response, NextFunction } from "express";
import User from "../models/user";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(JSON.parse(req.body.body))
    const newUser = await User.create(JSON.parse(req.body.body));
    const token = await newUser.genUserAuthToken();

    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.status(201).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ user_name: req.params.user });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({
      status: "success",
      user: user
    });
  } catch (error) {
    res.status(500).json({ error: "No user found" });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body.body)
  try {
    const { email, password } = JSON.parse(req.body.body);

    const user = await User.findUserByCredentials(email, password);
    console.log(email, password)
    const token = await user.genUserAuthToken();
    console.log(token)
    res.status(200).json({ user, token });
  } catch (error: any) {
    console.log(error)
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user;
  try {
    const user = await User.findById(id);

    if (user !== null) {
      await user.remove();
      res.status(204);
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
