import React from "react";
import { useDispatch } from "react-redux";
import { X, Pencil } from "lucide-react"; // Imported Pencil icon
import ProjectCard from "../components/ProjectCard";
import { deleteProject } from "../features/projects/projectSlice";

// Added onEditClick to the props
const ProjectsView = ({ projects, onAddClick, onEditClick }) => {
  const dispatch = useDispatch();

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex justify-between items-center bg-white/3 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
        <button
          onClick={onAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm"
        >
          + Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="relative group">
            <ProjectCard {...project} />

            {/* Action Buttons Container */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Edit Button */}
              <button
                onClick={() => onEditClick(project)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-lg"
                title="Edit Project"
              >
                <Pencil size={16} />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (window.confirm("Delete project?"))
                    dispatch(deleteProject(project._id));
                }}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg"
                title="Delete Project"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
