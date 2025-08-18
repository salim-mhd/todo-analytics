import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return (await response.json()) as Todo[];
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default todosSlice.reducer;
