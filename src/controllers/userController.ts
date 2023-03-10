import express, { Application, Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

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
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = await user.genUserAuthToken();
    res.status(200).json({ user, token });
  } catch (error: any) {
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

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(user)
    if (user) {
      const { password } = user;
      const isMatch = await bcrypt.compare(oldPassword, password);
      console.log("isMatch", isMatch);
      
      if (!isMatch) {
        return res.status(400).json("Incorrect Password")
      }

      const reset = await User.findByIdAndUpdate({ _id: user.id }, { $set: { password: newPassword } });
      console.log("reset", reset)
      if (reset) {
         res.status(201).json("Password reset successful...")
      }
    }
  } catch (err) {
    console.log(err)
    res.status(404).json("user not found")
  }

}
