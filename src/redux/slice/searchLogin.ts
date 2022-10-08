import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
  login: string;
  avatar_url: string;
};

type UserState = {
  data: User[];
  status: string;
};

export const fetchUser = createAsyncThunk<User[], string>(
  "Search/fetchUser",
  async (params) => {
    const { data } = await axios.get(`https://api.github.com/users/${params}`);
    return data;
  }
);

const initialState: UserState = {
  data: [],
  status: "loading",
};

const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.data = [];
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "error";
        state.data = [];
      });
  },
});

export const userLoginReducer = userSlice.reducer;
