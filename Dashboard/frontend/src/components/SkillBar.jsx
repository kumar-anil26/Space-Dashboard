import React from "react";

const SkillBar = ({ name, percentage, color }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-gray-200">{name}</span>
      <span className="text-sm font-bold text-gray-300">{percentage}%</span>
    </div>
    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default SkillBar;
