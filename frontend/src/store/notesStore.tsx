import { configureStore } from "@reduxjs/toolkit";
import notetsManagementSlice from "../redux/notesSlice";

const store = configureStore({
  reducer: {
    notetsManagement: notetsManagementSlice,
  },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
