import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

export const getProjects = createAsyncThunk(
  "projects/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/projects");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/projects", data);
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 1. ADDED: Update Project Thunk
// Notice it expects an object with BOTH the ID and the new Data
export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, projectData }, thunkAPI) => {
    try {
      const res = await api.put(`/projects/${id}`, projectData);
      return res.data; // The backend should return the newly updated project
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Network Error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/projects/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: { projects: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      })
      // 2. ADDED: Handle the successful update in state
      .addCase(updateProject.fulfilled, (state, action) => {
        // Find the index of the old project and replace it with the updated one
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
