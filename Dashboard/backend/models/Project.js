const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: String, required: true },
    imageUrl: { type: String, required: true },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
