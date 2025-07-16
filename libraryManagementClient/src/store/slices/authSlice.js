import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import Cookies from "js-cookie";

export const login = createAsyncThunk("auth/login", async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    payload,
    {
      withCredentials: true,
    }
  );
  return res.data;
});

export const register = createAsyncThunk("auth/register", async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/register",
    payload,
    {
      withCredentials: true,
    }
  );
  return res.data;
});

export const getCurrentUser = createAsyncThunk("auth/me", async () => {
  const res = await axios.get("http://localhost:5000/api/auth/me");
  return res.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.get("http://localhost:5000/api/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;

        // ✅ Store token in localStorage
        Cookies.set("token", action.payload.token, {
          path: "/",
          expires: 7,
          sameSite: "Lax",
          secure: false, // true if you're on HTTPS
        });
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.error = "Register failed";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
