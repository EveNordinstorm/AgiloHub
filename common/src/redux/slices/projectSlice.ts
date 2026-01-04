import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/apiCore";
import { Project } from "../../types/interfaces/project";
import { ProjectStage, ProjectStageInput } from "../../types/interfaces/projectStage";

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

export const addStage = createAsyncThunk<
  { projectId: string; stage: ProjectStage },
  { projectId: string; data: ProjectStageInput },
  { rejectValue: string }
>("projects/addStage", async ({ projectId, data }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/projects/${projectId}/stages`, data);
    return { projectId, stage: res.data };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Failed to add stage");
  }
});

export const updateStage = createAsyncThunk<
  { projectId: string; stage: ProjectStage },
  { stageId: string; projectId: string; data: Partial<ProjectStageInput> },
  { rejectValue: string }
>(
  "projects/updateStage",
  async ({ stageId, projectId, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/projects/stages/${stageId}`, data);
      return { projectId, stage: res.data };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update stage"
      );
    }
  }
);

export const deleteStage = createAsyncThunk<
  { projectId: string; stageId: string },
  { stageId: string; projectId: string },
  { rejectValue: string }
>("projects/deleteStage", async ({ stageId, projectId }, { rejectWithValue }) => {
  try {
    await api.delete(`/projects/stages/${stageId}`);
    return { projectId, stageId };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Failed to delete stage"
    );
  }
});

export const completeStage = createAsyncThunk<
  { projectId: string; stage: ProjectStage; pointsAwarded: number },
  { stageId: string; projectId: string },
  { rejectValue: string }
>("projects/completeStage", async ({ stageId, projectId }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/projects/stages/${stageId}/complete`);
    return { projectId, stage: res.data.stage, pointsAwarded: res.data.pointsAwarded };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Failed to complete stage"
    );
  }
});

export const updateProject = createAsyncThunk<
  Project,
  { id: string; data: any },
  { rejectValue: string }
>("projects/updateProject", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/projects/${id}`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Failed to update project"
    );
  }
});

export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("projects/deleteProject", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/projects/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Failed to delete project"
    );
  }
});

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
      })
      .addCase(addStage.fulfilled, (state, action) => {
        const project = state.projects.find(
          (p) => p.id === action.payload.projectId
        );
        if (project) {
          project.stages.push(action.payload.stage);
          project.stages.sort((a, b) => a.stageNumber - b.stageNumber);
        }
      })
      .addCase(updateStage.fulfilled, (state, action) => {
        const project = state.projects.find(
          (p) => p.id === action.payload.projectId
        );
        if (project) {
          const index = project.stages.findIndex(
            (s) => s.id === action.payload.stage.id
          );
          if (index !== -1) {
            project.stages[index] = action.payload.stage;
          }
        }
      })
      .addCase(deleteStage.fulfilled, (state, action) => {
        const project = state.projects.find(
          (p) => p.id === action.payload.projectId
        );
        if (project) {
          project.stages = project.stages.filter(
            (s) => s.id !== action.payload.stageId
          );
          project.stages.forEach((s, i) => {
            s.stageNumber = i + 1;
          });
        }
      })
      .addCase(completeStage.fulfilled, (state, action) => {
        const project = state.projects.find(
          (p) => p.id === action.payload.projectId
        );
        if (project) {
          const index = project.stages.findIndex(
            (s) => s.id === action.payload.stage.id
          );
          if (index !== -1) {
            project.stages[index] = action.payload.stage;
          }
        }
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProjects, addProject, setLoading, setError } =
  projectSlice.actions;
export default projectSlice.reducer;
