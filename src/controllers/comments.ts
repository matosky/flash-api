import { Request, Response } from "express";
import Memory from "../models/memory";


export const createComment = async (req: Request, res: Response) => {
    const memoryId = req.params.memoryId;
    const { name, text } = req.body;

    // console.log({memoryId, comment})
    if (!memoryId) {
        return res.status(400).json({ status: "failed", message: "memory id needed" })
    }

    try {
        const memory = await Memory.findByIdAndUpdate(memoryId, { $push: { comments: {name,text} } }, { new: true });
        if (memory) {
            res.status(201).json({ status: "success", message: "successfully added comment" });
        }
    } catch (err) {
        res.status(400).json({ status: "faild", message: "comment could not be created" });
    }
}


export const deleteComment = async (req: Request, res: Response) => {
    const memoryId = req.params.memoryId;
    const commentId = req.params.commentId;

    if (!memoryId || !commentId) {
        return res.status(400).json({ status: "failed", message: "memory or comment id needed" })
    }

    try {
        const memory = await Memory.findByIdAndUpdate(memoryId, { $pull: { comments: { _id: commentId } } }, { new: true });
        if (memory) {
            res.status(200).json({ status: "success", message: "successfully deleted comment" });
        }
    } catch (err) {
        res.status(400).json({ status: "failed", message: "comment could not be created" });
    }
}