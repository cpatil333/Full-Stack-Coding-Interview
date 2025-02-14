import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IGetNotes,
  ILogin,
  INotes,
  INotesManagementState,
  IUser,
} from "../models/user-model";
import {
  deleteNotesById,
  editNotes,
  getNotes,
  getNotesById,
  insertNotes,
  login,
  register,
} from "../services/NotesService";

const initialState: INotesManagementState = {
  users: [],
  login: [],
  notes: [],
  getNotes: [],
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

export const insertNotesAsync = createAsyncThunk(
  "notetsManagement/insertNotes",
  async (formsData: FormData) => {
    const data = await insertNotes(formsData);
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

export const getnotesByIdAsync = createAsyncThunk(
  "notetsManagement/getNotesById",
  async (id: string) => {
    const data = await getNotesById(id);
    return data;
  }
);

export const deletenotesByIdAsync = createAsyncThunk(
  "notetsManagement/deleteNotesById",
  async (id: string) => {
    const data = await deleteNotesById(id);
    return data;
  }
);

export const ediNotesAsync = createAsyncThunk(
  "notetsManagement/editNotes",
  async (formsData: FormData) => {
    const data = await editNotes(formsData);
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
      )
      .addCase(
        insertNotesAsync.fulfilled,
        (state, action: PayloadAction<IGetNotes>) => {
          state.getNotes = [...state.getNotes, action.payload];
        }
      )
      .addCase(
        getnotesByIdAsync.fulfilled,
        (state, action: PayloadAction<IGetNotes>) => {
          state.getNotes = state.getNotes.filter(
            (item) => item.data._id === action.payload.data._id
          );
        }
      )
      //update a notes
      .addCase(
        ediNotesAsync.fulfilled,
        (state, action: PayloadAction<IGetNotes>) => {
          state.getNotes = state.getNotes.map((note) =>
            note.data._id === action.payload.data._id ? action.payload : note
          );
        }
      )
      //delete a notes
      .addCase(
        deletenotesByIdAsync.fulfilled,
        (state, action: PayloadAction<IGetNotes>) => {
          state.getNotes = state.getNotes.filter(
            (notes) => notes.data._id !== action.payload.data._id
          );
        }
      );
  },
});

export const {} = notetsManagementSlice.actions;
export default notetsManagementSlice.reducer;
