import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import skillReducer from "../features/skills/skillSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    skills: skillReducer,
  },
});
