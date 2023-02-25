import { Request, Response } from "express";
import Memory from "../models/memory";


export const increaseLikes = async (req: Request, res: Response) => {
    const memoryId = req.params.id;
    console.log(memoryId)
    if (!memoryId) {
        return res.status(400).json({status: "failed", message: "memory id required"})
    }

    try {
        const result = await Memory.updateOne({ _id: memoryId }, { $inc: { likes: 1 } });
        console.log(result)
        if (result) {
           res.status(200).json({ status: "success", message: "like increased successfully", data: result })
        }
    } catch (err) {
        res.status(404).json({message: "memory not found"})
    }
}

export const decreaseLikes = async (req: Request, res: Response) => {
    const memoryId = req.params.id;
    try {
        const memory = await Memory.findOne({ _id: memoryId });
        if (memory?.likes === 0) {
            return res.json("likes can no longer be decreased further");
        }
    } catch (err) {
        console.log(err)
    }
    if (!memoryId) {
        return res.status(400).json({status: "failed", message: "memory id required"})
    }

    try {
        const result = await Memory.updateOne({ _id: memoryId }, { $inc: { likes: -1 } })
        console.log(result);
        if (result) {
          res.status(200).json({status:"success", data:result})
        }
    } catch (err) {
        res.status(404).json({message: "memory not found"})
    }
}