"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const incident_1 = require("../controllers/incident");
// import { Upload } from "../middlewares/imageUpload";
const router = express_1.default.Router();
router.get("/", incident_1.getAllIncidents);
router.post("/", incident_1.postIncident);
router.get("/:type", incident_1.searchItem);
exports.default = router;
//# sourceMappingURL=incident.js.map