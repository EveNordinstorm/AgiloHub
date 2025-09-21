import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
};

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
});

export const { setProjects, addProject, setLoading, setError } =
  projectSlice.actions;
export default projectSlice.reducer;
