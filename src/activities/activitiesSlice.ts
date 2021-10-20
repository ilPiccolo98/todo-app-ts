import getInitialActivities, { createActivity } from "./initialActivities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity } from "./initialActivities";
import { RootState } from "./activitiesStore";
import { WritableDraft } from "immer/dist/internal";

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

const executeAddActivity = (
  activities: WritableDraft<Activity>[],
  name: string,
  description: string,
  status: boolean
): void => {
  activities.push(createActivity(name, description, status));
};

export const doesActivityExist = (
  activities: Array<Activity>,
  id: number
): boolean => {
  for (let i: number = 0; i !== activities.length; ++i) {
    if (activities[i].id === id) {
      return true;
    }
  }
  return false;
};

const getPositionActivity = (
  activities: WritableDraft<Activity>[],
  id: number
): number => {
  let index: number = 0;
  while (activities[index].id !== id) {
    ++index;
  }
  return index;
};

const executeDeleteActivity = (
  activities: WritableDraft<Activity>[],
  id: number
): void => {
  const positionActivityToDelete: number = getPositionActivity(activities, id);
  activities.splice(positionActivityToDelete, 1);
};

const updateActivityItem = (
  activities: WritableDraft<Activity>[],
  position: number,
  name: string,
  description: string,
  status: boolean
): void => {
  activities[position].name = name;
  activities[position].description = description;
  activities[position].status = status;
};

const executeUpdateActivity = (
  activities: WritableDraft<Activity>[],
  id: number,
  name: string,
  description: string,
  status: boolean
): void => {
  const positionActivityToUpdate: number = getPositionActivity(activities, id);
  updateActivityItem(
    activities,
    positionActivityToUpdate,
    name,
    description,
    status
  );
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState: getInitialActivities(),
  reducers: {
    addActivity: (state, action: PayloadAction<AddActionParameter>) => {
      executeAddActivity(
        state,
        action.payload.name,
        action.payload.description,
        action.payload.status
      );
    },
    deleteActivity: (state, action: PayloadAction<DeleteActionParameter>) => {
      executeDeleteActivity(state, action.payload.id);
    },
    updateActivity: (state, action: PayloadAction<UpdateActionParameter>) => {
      executeUpdateActivity(
        state,
        action.payload.id,
        action.payload.name,
        action.payload.description,
        action.payload.status
      );
    },
  },
});

export const { addActivity, deleteActivity, updateActivity } =
  activitiesSlice.actions;

export const activitiesSelector = (state: RootState) => state.activities;

export default activitiesSlice.reducer;
