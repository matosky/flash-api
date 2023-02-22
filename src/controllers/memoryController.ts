import express, { Application, Request, Response, NextFunction } from "express";
import Memory from "../models/memory";
import User from "../models/user";
import cloudUpload from "../utils/cloudinary";

export const createMemory = async (req: Request, res: Response) => {
  const photo = req.file?.path;
  const {  title, description, location } = req.body;
  const user_id = req.user;
  console.log(req.file);
  console.log("USERID>>", req.user);

  if (photo) {
    const cloudImage = await cloudUpload.uploader.upload(photo, {
      folder: "memories",
    });

    const memory = new Memory({
      user_id: user_id,
      photo: {
        public_id: cloudImage.public_id,
        url: cloudImage.secure_url,
      },
      title: title,
      description: description,
      location: location,
    });

    try {
      const newMemory = await memory.save();
      console.log(newMemory);
      res.status(201).json({
        status: "success",
        data: {
          memory: newMemory,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  }
};

export const updateMemory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedUpdates = ["description", "title"];
  const updates = Object.keys(req.body);
  const isValidUpdates = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdates)
    return res.status(400).send({ Error: "Unknown update!" });

  try {
    const memory: any = await Memory.findOne({ _id: req.params.id });

    if (!memory) {
      res.status(404).send();
    }

    updates.forEach((update) => (memory[update] = req.body[update]));
    await memory.save();

    res.status(200).json({
      status: "success",
      data: {
        memory,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const deleteMemory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params.id);
  try {
    const memory = await Memory.findByIdAndRemove({ _id: req.params.id });
    if (!memory) {
      res.status(400).json({
        status: "fail",
        message: `No memory with id: ${req.params.id} exist`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          memory,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const getOwnMemory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ user_name: req.params.username });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const ownMemory = await Memory.find({ user_id: user.user_name });
    if (!ownMemory) {
      res.status(204).json({
        status: "success",
        message: "You have not created any memory",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        memory: ownMemory,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const getMemoryByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_name } = req.body;
  try {
    const user = await User.findOne({ user_name });

    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const userMemories = await Memory.find({ user_name });

    if (!userMemories) {
      res.status(404).json({
        status: "fail",
        message: "User has not created a memory",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        memory: userMemories,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const getAllMemories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("all memories fired")
  try {
    const memories = await Memory.find({}, null, { sort: { createdAt: -1 } });

    res.status(200).json({
      status: "success",
      results: memories.length,
      data: {
        memories,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const getSingleMemory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  console.log(id);
  try {
    const memory = await Memory.findById(id);
    if (!memory) {
      res.status(404).json("Memory no found");
    }

    res.status(200).json({
      status: "success",
      data: {
        memory,
      },
    });
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
