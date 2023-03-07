import { Request, Response, NextFunction } from "express";
import Incident from "../models/incident";
import cloudUpload from "../utils/cloudinary";

export const postIncident = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const { type, description, location } = req.body;
    const photo = req.file?.path;
    
//   if (!type || !description || !location) {
//     return res.status(400).json({ message: "fill required fields" });
//   }



  if (photo) {
    try {
      const cloudImage = await cloudUpload.uploader.upload(photo, {
        folder: "memories",
      });

      if (cloudImage) {
        const newIncident = new Incident({
          type:type,
          description:description,
          photo: {
            public_id: cloudImage.public_id,
            url: cloudImage.secure_url,
          },
          location:location,
        });

        try {
          const result = await newIncident.save();
          console.log(result);
          res.status(201).json({ status: "success", data: result });
        } catch (err) {
          res.status(400).json({ message: err });
        }
      }
    } catch (err) {
      console.log(err);
    }
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
