import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/apiCore";

export type Member = {
  id: string;
  name: string;
  role: string;
};

export type ProjectStage = {
  stageNumber: number;
  description: string;
  pointsEarned: number;
  totalPoints: number;
  date: string;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  techStack: string[];
  context?: string;
  methodology?: {
    id: string;
    name: string;
    definition: string;
  };
  creator: Member;
  members: Member[];
  stages: ProjectStage[];
  createdAt: string;
  updatedAt: string;
};

type ProjectsState = {
  projects: Project[];
  loading: boolean;
  error?: string;
};

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: undefined,
};

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post("/projects", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Project creation failed"
      );
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/projects");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch projects"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProjects, addProject, setLoading, setError } =
  projectSlice.actions;
export default projectSlice.reducer;
