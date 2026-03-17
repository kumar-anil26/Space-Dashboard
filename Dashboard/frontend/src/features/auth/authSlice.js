import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";

export const checkAuth = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const res = await api.get("/auth");
    // ⚠️ CHANGED: Just return the user data, not the whole wrapper
    return res.data.data;
  } catch (error) {
    // ⚠️ CHANGED: rejectWithValue only takes ONE argument
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Not logged in"
    );
  }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", userData);
      // ⚠️ CHANGED: Just return the user data
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.get("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isError: false, isLoading: true, message: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Now this is just the raw user object!
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; // Just the raw user object
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
