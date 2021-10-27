import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./activitiesSlice";

const store = configureStore({
  reducer: {
    activities: activitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
