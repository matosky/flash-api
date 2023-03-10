import { Request, Response, NextFunction } from "express";
import Incident from "../models/incident";

export const postIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type, description, location } = req.body;

  if (!type || !description || !location) {
    return res.status(400).json({ message: "fill required fields" });
  }

  try {
    const newIncident = new Incident({
      type: type,
      location: location,
      description: description,
    });
    const result = await newIncident.save();
    if (result) {
      return res.status(201).json({ status: "success", message: result });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "invalid report", error: err });
  }
};

export const getAllIncidents = async (req: Request, res: Response) => {
  try {
    const result = await Incident.find({}, null, { sort: { createdAt: -1 } });
    return res.status(201).json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const searchItem = async (req: Request, res: Response) => {
  const type = req.params.type;
  try {
    const incidents = await Incident.find({
      type: { $regex: type, $options: "i" },
    });
    res.status(200).json({ data: incidents });
  } catch (err) {
    res.status(404).json({ message: "no such incident", err });
  }

};
