import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// Import BOTH actions from your slice
import {
  createProject,
  updateProject,
} from "../features/projects/projectSlice";
import GlassModal from "./GlassModal";
import GlassInput from "./GlassInput";

// 1. ADDED: Accept `editingProject` as a prop
const AddProjectModal = ({ isOpen, onClose, editingProject }) => {
  const dispatch = useDispatch();
  // Empty state template to make resetting easy
  const emptyProject = {
    title: "",
    description: "",
    techStack: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
  };

  const [projectData, setProjectData] = useState(emptyProject);

  // 2. ADDED: The Pre-fill Magic!
  // This runs every time the modal opens or `editingProject` changes.
  useEffect(() => {
    if (editingProject) {
      // If we are editing, fill the form with the old data
      setProjectData({
        title: editingProject.title || "",
        description: editingProject.description || "",
        // If your techStack is saved as an array in the DB, convert it to a string for the input field:
        techStack: Array.isArray(editingProject.techStack)
          ? editingProject.techStack.join(", ")
          : editingProject.techStack || "",
        imageUrl: editingProject.imageUrl || "",
        githubUrl: editingProject.githubUrl || "",
        liveUrl: editingProject.liveUrl || "",
      });
    } else {
      // If we are NOT editing (Add mode), clear the form completely
      setProjectData(emptyProject);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingProject, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 3. ADDED: Conditional Submit
      if (editingProject) {
        // We are UPDATING an existing project
        await dispatch(
          updateProject({
            id: editingProject._id,
            projectData,
          })
        ).unwrap();
      } else {
        // We are CREATING a new project
        await dispatch(createProject(projectData)).unwrap();
      }

      // Reset form and close modal on success
      setProjectData(emptyProject);
      onClose();
    } catch (error) {
      alert("Error saving project: " + error);
    }
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={() => {
        setProjectData(emptyProject); // Clear data if user cancels
        onClose();
      }}
      // 4. ADDED: Dynamic Title
      title={editingProject ? "Update Project" : "Add Project"}
    >
      <form onSubmit={handleSubmit}>
        <GlassInput
          label="Title"
          required
          value={projectData.title}
          onChange={(e) =>
            setProjectData({ ...projectData, title: e.target.value })
          }
        />
        <GlassInput
          label="Description"
          required
          value={projectData.description}
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        />
        <GlassInput
          label="Tech Stack (comma separated)"
          required
          value={projectData.techStack}
          onChange={(e) =>
            setProjectData({ ...projectData, techStack: e.target.value })
          }
        />
        <GlassInput
          label="Image URL"
          required
          value={projectData.imageUrl}
          onChange={(e) =>
            setProjectData({ ...projectData, imageUrl: e.target.value })
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <GlassInput
            label="GitHub URL"
            value={projectData.githubUrl}
            onChange={(e) =>
              setProjectData({ ...projectData, githubUrl: e.target.value })
            }
          />
          <GlassInput
            label="Live Demo URL"
            value={projectData.liveUrl}
            onChange={(e) =>
              setProjectData({ ...projectData, liveUrl: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold mt-4 transition-colors shadow-lg"
        >
          {/* 5. ADDED: Dynamic Button Text */}
          {editingProject ? "Update Project" : "Save Project"}
        </button>
      </form>
    </GlassModal>
  );
};

export default AddProjectModal;
