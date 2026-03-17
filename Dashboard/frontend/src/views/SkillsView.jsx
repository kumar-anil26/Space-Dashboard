import React from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import SkillBar from "../components/SkillBar";
import { deleteSkill } from "../features/skills/skillSlice";

const SkillsView = ({ skills, onAddClick }) => {
  const dispatch = useDispatch();

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex justify-between items-center bg-white/3 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white">Manage Skills</h2>
        <button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm"
        >
          + Add Skill
        </button>
      </div>
      <div className="bg-white/3 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        {skills.map((skill) => (
          <div key={skill._id} className="group relative mb-6">
            <SkillBar
              name={skill.name}
              percentage={skill.percentage}
              color={skill.color}
            />
            <button
              onClick={() => dispatch(deleteSkill(skill._id))}
              className="absolute -top-1 right-0 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsView;
