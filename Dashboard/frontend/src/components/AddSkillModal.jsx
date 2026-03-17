import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSkill } from "../features/skills/skillSlice";
import GlassModal from "./GlassModal";
import GlassInput from "./GlassInput";

const AddSkillModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [newSkill, setNewSkill] = useState({
    name: "",
    percentage: "",
    color: "bg-blue-500",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createSkill({ ...newSkill, percentage: Number(newSkill.percentage) })
    );

    // Reset form and close modal
    setNewSkill({ name: "", percentage: "", color: "bg-blue-500" });
    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Add Skill">
      <form onSubmit={handleSubmit}>
        <GlassInput
          label="Skill Name"
          required
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
        />
        <GlassInput
          label="Percentage (0-100)"
          type="number"
          required
          min="0"
          max="100"
          value={newSkill.percentage}
          onChange={(e) =>
            setNewSkill({ ...newSkill, percentage: e.target.value })
          }
        />

        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">
            Color Theme
          </label>
          <select
            className="w-full bg-[#060B19] border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500"
            value={newSkill.color}
            onChange={(e) =>
              setNewSkill({ ...newSkill, color: e.target.value })
            }
          >
            <option value="bg-blue-500">Blue</option>
            <option value="bg-teal-400">Teal</option>
            <option value="bg-cyan-500">Cyan</option>
            <option value="bg-amber-400">Amber</option>
            <option value="bg-purple-500">Purple</option>
            <option value="bg-rose-500">Rose</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold mt-4 transition-colors"
        >
          Save Skill
        </button>
      </form>
    </GlassModal>
  );
};

export default AddSkillModal;
