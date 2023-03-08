"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// Define the incident schema
const incidentSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true }
}, { timestamps: true });
// Create the incident model
const Incident = mongoose.model("Incident", incidentSchema);
exports.default = Incident;
//# sourceMappingURL=incident.js.map