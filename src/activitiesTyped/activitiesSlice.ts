import getInitialState from "./initialActivities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import VectorActivity from "../types/classes/vectorActivity";
import Activity, { ActivityPlain } from "../types/classes/activity";
import { RootState } from "./activitiesStore";

type UpdateActionParameter = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

type DeleteActionParameter = {
  id: number;
};

type AddActionParameter = {
  name: string;
  description: string;
  status: boolean;
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState: getInitialState(),
  reducers: {
    addActivity: (status, payload: PayloadAction<AddActionParameter>) => {
      const vectorActivity = VectorActivity.fromArrayPlainActivityToVectorActivity(
        status as ActivityPlain[]
      );
      vectorActivity.addActivity(
        new Activity(
          payload.payload.name,
          payload.payload.description,
          payload.payload.status
        )
      );
      status = vectorActivity.toPlainArrayWithPlainActivities();
    },
    deleteActivity: (status, payload: PayloadAction<DeleteActionParameter>) => {
      const vectorActivity = VectorActivity.fromArrayPlainActivityToVectorActivity(
        status as ActivityPlain[]
      );
      vectorActivity.deleteActivity(payload.payload.id);
      status = vectorActivity.toPlainArrayWithPlainActivities();
    },
    updateActivity: (status, payload: PayloadAction<UpdateActionParameter>) => {
      const vectorActivity = VectorActivity.fromArrayPlainActivityToVectorActivity(
        status as ActivityPlain[]
      );
      vectorActivity.updateActivity(
        payload.payload.id,
        payload.payload.name,
        payload.payload.description,
        payload.payload.status
      );
      status = vectorActivity.toPlainArrayWithPlainActivities();
    },
  },
});

export const {
  addActivity,
  deleteActivity,
  updateActivity,
} = activitiesSlice.actions;

export const activitiesSelector = (state: RootState) => state.activities;
export default activitiesSlice.reducer;
