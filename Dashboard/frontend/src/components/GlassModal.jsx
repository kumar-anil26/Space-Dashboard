import React from "react";
import { X } from "lucide-react";

const GlassModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-md">
      <div className="bg-[#060B19]/90 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-lg shadow-3xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between p-6 border-b border-white/15 shrink-0">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default GlassModal;
