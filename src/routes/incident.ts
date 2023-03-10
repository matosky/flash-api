import express from "express";
import { getAllIncidents, postIncident, searchItem } from "../controllers/incident";
// import { Upload } from "../middlewares/imageUpload";


const router = express.Router();

router.get("/", getAllIncidents)
router.post("/", postIncident)
router.get("/:type", searchItem)

export default router;
