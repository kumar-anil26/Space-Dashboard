import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, checkAuth } from "../features/auth/authSlice";
import api from "../api/axiosConfig";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    socialLinks: {
      github: "",
      linkedin: "",
      hackerrank: "",
      majorProject: "", // Vercel/Live link
    },
  });

  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.auth);

  // Helper to safely update the nested socialLinks object
  const handleSocialLinkChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      try {
        // Sends the complete formData, including the nested socialLinks object
        await api.post("/auth/register", formData);
        dispatch(checkAuth());
      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      }
    } else {
      // Standard login flow (only needs email and password)
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#060B19] flex items-center justify-center relative overflow-hidden py-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2988&auto=format&fit=crop')",
        }}
      ></div>

      {/* Main Card - Added max-h and overflow-y-auto for the taller registration form */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isRegistering ? "Create Profile" : "Access System"}
        </h2>

        {isError && !isRegistering && (
          <p className="text-red-400 mb-4 text-center text-sm">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ============================== */}
          {/* BASIC INFO (Always visible)    */}
          {/* ============================== */}
          {isRegistering && (
            <input
              required
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
            />
          )}

          <input
            required
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
          />

          {/* ============================== */}
          {/* SOCIAL LINKS (Register Only)   */}
          {/* ============================== */}
          {isRegistering && (
            <div className="space-y-4 pt-4 border-t border-white/10 mt-4">
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                Developer Links (Optional)
              </p>

              <input
                type="url"
                placeholder="GitHub URL"
                value={formData.socialLinks.github}
                onChange={(e) =>
                  handleSocialLinkChange("github", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm transition-colors"
              />

              <input
                type="url"
                placeholder="LinkedIn URL"
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  handleSocialLinkChange("linkedin", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm transition-colors"
              />

              <input
                type="url"
                placeholder="HackerRank URL"
                value={formData.socialLinks.hackerrank}
                onChange={(e) =>
                  handleSocialLinkChange("hackerrank", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm transition-colors"
              />

              <input
                type="url"
                placeholder="Live Project / Vercel URL"
                value={formData.socialLinks.majorProject}
                onChange={(e) =>
                  handleSocialLinkChange("majorProject", e.target.value)
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm transition-colors"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] mt-6"
          >
            {isRegistering ? "Complete Registration" : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          {isRegistering ? "Already have access?" : "New developer?"}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-400 ml-2 hover:underline focus:outline-none"
          >
            {isRegistering ? "Login here" : "Create profile"}
          </button>
        </p>
      </div>

      {/* Optional: Add this CSS to your global stylesheet (index.css) to make the scrollbar look sleek */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `,
        }}
      />
    </div>
  );
};

export default Login;
