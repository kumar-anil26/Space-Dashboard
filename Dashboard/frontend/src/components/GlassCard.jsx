import React from "react";

const GlassCard = ({ title, children }) => (
  <div className="bg-white/3 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
    <h3 className="text-lg font-bold text-white mb-6">{title}</h3>
    {children}
  </div>
);

export default GlassCard;
