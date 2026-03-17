const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user.id });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    // 1. Find the project by the ID in the URL
    let project = await Project.findById(req.params.id);

    // 2. Check if the project actually exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 3. Ensure the logged-in user owns this project
    if (project.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this project" });
    }

    // 4. Update the project in the database
    // { new: true } tells Mongoose to return the newly updated project, not the old one
    // { runValidators: true } ensures the new data still obeys your Schema rules
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // 5. Send the updated project back to the frontend
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });
    await project.deleteOne();
    res.status(200).json({ id: req.params.id, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
