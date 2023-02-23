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
    if (!memoryId) {
        return res.status(400).json({status: "failed", message: "memory id required"})
    }

    try {
        const memory = await Memory.findOne({ _id: memoryId });
        if (memory) {
        console.log(memory?.likes)
            if (memory.likes >= 1) {
                memory.likes -= 1;
                try {
                     const response = await memory.save();
                    if (response) {
                         return res.status(200).json({status: "success", message: "successfully decreased likes", data: memory})
                     }
                } catch (err) {
                    return res.status(401).json({status: "failed", message: "could not decrease likes"})
                }
               
            } else {
                res.status(400).json({status:"failed", message: "cannot decrease likes"})
            }
        }
    } catch (err) {
        res.status(404).json({message: "memory not found"})
    }
}