import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Commit = {
  sha: string;
  commit: {
    author: { name: string; date: any }; //!!!!!!!!!
  };
};

type CommitState = {
  data: Commit[];
  status: string;
};

export const fetchCommit = createAsyncThunk<Commit[], string[]>(
  "Search/fetchCommit",
  async ([login, project]) => {
    const { data } = await axios.get(
      `https://api.github.com/repos/${login}/${project}/commits`
    );
    console.log(data)
    return data;
  }
);

const initialState: CommitState = {
  data: [],
  status: "loading",
};

const commitSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommit.pending, (state) => {
        state.status = "loading";
        state.data = [];
      })
      .addCase(fetchCommit.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchCommit.rejected, (state) => {
        state.status = "error";
        state.data = [];
      });
  },
});

export const commitReducer = commitSlice.reducer;
