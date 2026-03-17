import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

export const getSkills = createAsyncThunk(
  "skills/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/skills");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createSkill = createAsyncThunk(
  "skills/create",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/skills", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/skills/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const skillSlice = createSlice({
  name: "skills",
  initialState: { skills: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s._id !== action.payload);
      });
  },
});
export default skillSlice.reducer;
