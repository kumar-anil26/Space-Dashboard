import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../features/projects/projectSlice";
import { getSkills } from "../features/skills/skillSlice";
import { logoutUser } from "../features/auth/authSlice";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart2,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Views
import DashboardView from "../views/DashboardView";
import ProjectsView from "../views/ProjectsView";
import SkillsView from "../views/SkillsView";

// Modals
import AddProjectModal from "../components/AddProjectModal";
import AddSkillModal from "../components/AddSkillModal";

const SpaceDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null); // Holds the data!

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { skills } = useSelector((state) => state.skills);

  // Fetch initial data
  useEffect(() => {
    if (user) {
      dispatch(getProjects());
      dispatch(getSkills());
    }
  }, [dispatch, user]);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Projects", icon: <FolderKanban size={20} /> },
    { name: "Skills", icon: <BarChart2 size={20} /> },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen bg-[#060B19] text-gray-100 font-sans flex relative overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2988&auto=format&fit=crop')",
        }}
      ></div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden "
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="relative z-10 flex w-full h-screen overflow-hidden">
        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wider text-white">
              DevDashboard
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.name
                    ? "bg-white/10 text-white shadow-[inset_4px_0_0_0_#3b82f6]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 mb-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut size={20} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto p-4 md:p-8">
          {/* HEADER */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg md:text-xl font-medium truncate">
                <span className="text-gray-400 hidden sm:inline">
                  Developer{" "}
                </span>
                {activeTab}
              </h2>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white border-2 border-white/20 shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-sm hidden sm:block">
                  {user?.name}
                </span>
              </div>
            </div>
          </header>

          {/* DYNAMIC VIEWS */}
          {activeTab === "Dashboard" && (
            <DashboardView user={user} skills={skills} projects={projects} />
          )}

          {activeTab === "Projects" && (
            <ProjectsView
              projects={projects}
              onAddClick={() => {
                setProjectToEdit(null); // Clear any old data
                setIsProjectModalOpen(true); // Open modal for CREATING
              }}
              onEditClick={(project) => {
                setProjectToEdit(project); // Pass the specific project data
                setIsProjectModalOpen(true); // Open modal for EDITING
              }}
            />
          )}

          {activeTab === "Skills" && (
            <SkillsView
              skills={skills}
              onAddClick={() => setIsSkillModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* SEPARATED MODAL COMPONENTS */}
      <AddProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setProjectToEdit(null); // Always clean up when closing
        }}
        editingProject={projectToEdit} // Pass the data to the modal!
      />

      <AddSkillModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
      />
    </div>
  );
};

export default SpaceDashboard;
