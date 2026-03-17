import React from "react";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({
  title,
  description,
  techStack,
  imageUrl,
  githubUrl,
  liveUrl,
}) => (
  <div className="bg-white/3 backdrop-blur-lg border border-white/10 rounded-xl flex flex-col sm:flex-row overflow-hidden shadow-xl group">
    <div className="w-full sm:w-40 h-40 sm:h-auto shrink-0 relative border-r border-white/5">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
    </div>
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
        <p className="text-xs text-gray-400 mb-2 truncate">{description}</p>
        <p className="text-xs font-medium text-gray-500">
          <span className="text-white">Tech:</span> {techStack}
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold"
          >
            <Github size={12} />
            <span>Code</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 bg-white/10 text-white px-3 py-1.5 border border-white/10 rounded-lg text-xs font-bold"
          >
            <ExternalLink size={12} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </div>
  </div>
);

export default ProjectCard;
