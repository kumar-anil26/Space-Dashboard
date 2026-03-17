const Skill = require("../models/Skill");

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body, user: req.user.id });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    if (skill.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });
    await skill.deleteOne();
    res.status(200).json({ id: req.params.id, message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
