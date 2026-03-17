import React from "react";

const GlassInput = ({ label, type = "text", ...props }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500"
    />
  </div>
);

export default GlassInput;
