import getInitialActivities from "./initialActivities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Activity from "../types/classes/activity";
import { RootState } from "./activitiesStore";
import { WritableDraft } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const executeAddActivity = (
  activities: WritableDraft<Activity>[],
  activity: Activity
): void => {
  activities.push(activity);
};

const doesActivityExist = (
  activities: WritableDraft<Activity>[],
  id: number
): boolean => {
  for (let i: number = 0; i !== activities.length; ++i) {
    if (activities[i].Id === id) {
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
  while (activities[index].Id !== id) {
    ++index;
  }
  return index;
};

const executeDeleteActivity = (
  activities: WritableDraft<Activity>[],
  id: number
): void => {
  if (doesActivityExist(activities, id)) {
    const positionActivityToDelete: number = getPositionActivity(
      activities,
      id
    );
    activities.splice(positionActivityToDelete, 1);
  }
};

const updateActivityItem = (
  activities: WritableDraft<Activity>[],
  position: number,
  name: string,
  description: string,
  status: boolean
): void => {
  activities[position].Name = name;
  activities[position].Description = description;
  activities[position].Status = status;
};

const executeUpdateActivity = (
  activities: WritableDraft<Activity>[],
  id: number,
  name: string,
  description: string,
  status: boolean
): boolean => {
  if (!doesActivityExist(activities, id)) {
    return false;
  }
  const positionActivityToUpdate: number = getPositionActivity(activities, id);
  updateActivityItem(
    activities,
    positionActivityToUpdate,
    name,
    description,
    status
  );
  return true;
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState: getInitialActivities(),
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      executeAddActivity(state, action.payload);
    },
    deleteActivity: (state, action: PayloadAction<Activity>) => {
      executeDeleteActivity(state, action.payload.Id);
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      executeUpdateActivity(
        state,
        action.payload.Id,
        action.payload.Name,
        action.payload.Description,
        action.payload.Status
      );
    },
  },
});

export const { addActivity, deleteActivity, updateActivity } =
  activitiesSlice.actions;

export const activitiesSelector = (state: RootState) => state.activities;

export default activitiesSlice.reducer;
