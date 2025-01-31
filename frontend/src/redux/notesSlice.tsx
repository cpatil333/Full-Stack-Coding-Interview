import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ILogin,
  INotes,
  INotesManagementState,
  IUser,
} from "../models/user-model";
import { getNotes, login, register } from "../services/NotesService";

const initialState: INotesManagementState = {
  users: [],
  login: [],
  notes: [],
};

export const userRegisterAsync = createAsyncThunk(
  "notetsManagement/register",
  async (registerData: FormData) => {
    const data = await register(registerData);
    return data;
  }
);
export const userLoginAsync = createAsyncThunk(
  "notetsManagement/login",
  async (loginData: FormData) => {
    const data = await login(loginData);
    return data;
  }
);

export const notesAsync = createAsyncThunk(
  "notetsManagement/getNotes",
  async () => {
    const data = await getNotes();
    return data;
  }
);

const notetsManagementSlice = createSlice({
  name: "notesmangement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        userRegisterAsync.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.users = [...state.users, action.payload];
        }
      )
      .addCase(
        userLoginAsync.fulfilled,
        (state, action: PayloadAction<ILogin>) => {
          state.login = [...state.login, action.payload];
        }
      )
      .addCase(
        notesAsync.fulfilled,
        (state, action: PayloadAction<INotes[]>) => {
          state.notes = action.payload;
        }
      );
  },
});

export const {} = notetsManagementSlice.actions;
export default notetsManagementSlice.reducer;
