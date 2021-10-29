import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getInitialActivities from "./initialActivities";
import {
  addActivity as addActivityVector,
  deleteActivity as deleteActivityVector,
  updateActivity as updateActivityVector,
} from "../typesWithoutClasses/vectorActivity/vectorActivity";
import { createActivity } from "../typesWithoutClasses/activity/activity";
import { RootState } from "./activitiesStore";

type AddActivity = {
  name: string;
  description: string;
  status: boolean;
};

type DeleteActivity = {
  id: number;
};

type UpdateActivity = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState: getInitialActivities(),
  reducers: {
    addActivity: (status, payload: PayloadAction<AddActivity>) => {
      addActivityVector(
        status,
        createActivity(
          payload.payload.name,
          payload.payload.description,
          payload.payload.status
        )
      );
    },
    deleteActivity: (status, payload: PayloadAction<DeleteActivity>) => {
      deleteActivityVector(status, payload.payload.id);
    },
    updateActivity: (status, payload: PayloadAction<UpdateActivity>) => {
      updateActivityVector(
        status,
        payload.payload.id,
        payload.payload.name,
        payload.payload.description,
        payload.payload.status
      );
    },
  },
});

export const {
  addActivity,
  updateActivity,
  deleteActivity,
} = activitiesSlice.actions;

export const activitiesSelector = (state: RootState) => state.activities;

export default activitiesSlice.reducer;
