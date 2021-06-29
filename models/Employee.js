const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: [{ type: String, require: true }],
  jobtype: {
    type: String,
    enum: ["Part Time", "Consultant", "Full Time"],
    required: true,
  },
  preferredlocation: [{ type: String, required: true }],
  profilepicurl: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true },
});

module.exports = mongoose.model("Employee", employeeSchema);
