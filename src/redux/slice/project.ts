import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Project = {
    language: string;
    description: string;
    stargazers_count: number;
    name: string;
};

type ProjectState = {
  data: Project[];
  status: string;
};

export const fetchProject = createAsyncThunk<Project[], string>(
  "Search/fetchProject",
  async (params) => {
    const { data } = await axios.get(
      `https://api.github.com/users/${params}/repos`
    );
    return data;
  }
);

const initialState: ProjectState = {
  data: [],
  status: "loading",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.status = "loading";
        state.data = [];
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchProject.rejected, (state) => {
        state.status = "error";
        state.data = [];
      });
  },
});

export const projectReducer = projectSlice.reducer;
