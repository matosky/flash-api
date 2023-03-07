const mongoose = require("mongoose");

// Define the incident schema
const incidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  photo: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  location: {type: String, required: true}
}, {timestamps: true});

// Create the incident model
const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
