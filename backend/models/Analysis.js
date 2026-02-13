const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  matchedSkills: [String],
  missingSkills: [String],
  summary: String,
  suggestions: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", analysisSchema);
