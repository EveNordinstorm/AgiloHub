import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/apiCore";
import { Task } from "../../types/interfaces/task";

type TasksState = {
  tasks: Task[];
  loading: boolean;
  error?: string;
};

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: undefined,
};

export const createTask = createAsyncThunk<
  Task,
  Omit<Task, "id" | "createdAt" | "updatedAt">
>("tasks/createTask", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/tasks", data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || "Task creation failed");
  }
});

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/tasks");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch tasks"
      );
    }
  }
);

export const fetchTasksByProject = createAsyncThunk<
  Task[],
  string, // projectId
  { rejectValue: string }
>("tasks/fetchTasksByProject", async (projectId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/tasks/project/${projectId}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Failed to fetch project tasks"
    );
  }
});

export const completeTask = createAsyncThunk<
  Task,
  string,
  { rejectValue: string }
>("tasks/completeTask", async (taskId, { rejectWithValue }) => {
  try {
    const res = await api.post(`/tasks/${taskId}/complete`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Failed to complete task"
    );
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
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
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      });
  },
});

export const { setTasks, addTask, setLoading, setError } = taskSlice.actions;
export default taskSlice.reducer;
