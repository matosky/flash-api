import express from "express";
import { getAllIncidents, postIncident } from "../controllers/incident";
// import { Upload } from "../middlewares/imageUpload";


const router = express.Router();

router.get("/", getAllIncidents)
router.post("/", postIncident)

export default router;
