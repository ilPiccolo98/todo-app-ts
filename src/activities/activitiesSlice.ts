import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./activitiesStore";
import Activity from "../types/activity/activity";
import axios, { AxiosError } from "axios";

export enum RetrieveState {
  Error,
  Loading,
  Loaded,
}

export enum AddState {
  Adding,
  Added,
  NotAdded,
  Null,
}

export enum UpdateState {
  Updating,
  Updated,
  NotUpdated,
  Null,
}

export enum DeleteState {
  Deleting,
  Deleted,
  NotDeleted,
  Null,
}

type RetrieveActivities = {
  activities: Activity[];
};

type AddActivity = {
  isItAdded: boolean;
};

type DeleteActivity = {
  isItDeleted: boolean;
};

type UpdateActivity = {
  isItUpdated: boolean;
};

export const fetchAllActivities = createAsyncThunk(
  "activities/fetchAllActivities",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<RetrieveActivities>(
        "/activities/retrieve"
      );
      return response.data.activities;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ errorMessage: axiosError.message });
    }
  }
);

export const addActivity = createAsyncThunk(
  "activities/addActivity",
  async (
    newActivity: { name: string; description: string; status: boolean },
    thunkAPI
  ) => {
    try {
      const response = await axios.post<AddActivity>("/activities/add", {
        ...newActivity,
      });
      return response.data.isItAdded;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ errorMessage: axiosError.message });
    }
  }
);

export const updateActivity = createAsyncThunk(
  "activities/updateActivity",
  async (activityToUpdate: Activity, thunkAPI) => {
    try {
      const response = await axios.post<UpdateActivity>("/activities/update", {
        ...activityToUpdate,
      });
      return response.data.isItUpdated;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ errorMessage: axiosError.message });
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activities/deleteActivity",
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.delete<DeleteActivity>(
        `/activities/delete/${id}`
      );
      return response.data.isItDeleted;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ errorMessage: axiosError.message });
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState: {
    activities: new Array<Activity>(),
    addingState: AddState.Null,
    updatingState: UpdateState.Null,
    deletingState: DeleteState.Null,
    retrievingState: RetrieveState.Loading,
  },
  reducers: {
    resetAddState: (state) => {
      state.addingState = AddState.Null;
    },
    resetUpdateState: (state) => {
      state.updatingState = UpdateState.Null;
    },
    resetDeleteState: (state) => {
      state.deletingState = DeleteState.Null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addActivity.fulfilled, (state, action) => {
      const isItAdded: boolean = action.payload as boolean;
      if (isItAdded) state.addingState = AddState.Added;
      else {
        state.addingState = AddState.NotAdded;
      }
    });
    builder.addCase(addActivity.pending, (state, action) => {
      state.addingState = AddState.Adding;
    });
    builder.addCase(addActivity.rejected, (state, action) => {
      state.addingState = AddState.NotAdded;
    });
    builder.addCase(updateActivity.fulfilled, (state, action) => {
      const isItUpdated: boolean = action.payload as boolean;
      if (isItUpdated) state.updatingState = UpdateState.Updated;
      else {
        state.updatingState = UpdateState.NotUpdated;
      }
    });
    builder.addCase(updateActivity.pending, (state, action) => {
      state.updatingState = UpdateState.Updating;
    });
    builder.addCase(updateActivity.rejected, (state, action) => {
      state.updatingState = UpdateState.NotUpdated;
    });
    builder.addCase(deleteActivity.fulfilled, (state, action) => {
      const isItDeleted: boolean = action.payload as boolean;
      if (isItDeleted) state.deletingState = DeleteState.Deleted;
      else {
        state.deletingState = DeleteState.NotDeleted;
      }
    });
    builder.addCase(deleteActivity.pending, (state, action) => {
      state.deletingState = DeleteState.Deleting;
    });
    builder.addCase(deleteActivity.rejected, (state, action) => {
      state.deletingState = DeleteState.NotDeleted;
    });
    builder.addCase(fetchAllActivities.fulfilled, (state, action) => {
      state.activities = action.payload as Activity[];
      state.retrievingState = RetrieveState.Loaded;
    });
    builder.addCase(fetchAllActivities.pending, (state, action) => {
      state.retrievingState = RetrieveState.Loading;
    });
    builder.addCase(fetchAllActivities.rejected, (state, action) => {
      state.retrievingState = RetrieveState.Error;
    });
  },
});

export const activitiesSelector = (state: RootState) =>
  state.activities.activities;
export const retrievingStateSelector = (state: RootState) =>
  state.activities.retrievingState;
export const addStateSelector = (state: RootState) =>
  state.activities.addingState;
export const updateStateSelector = (state: RootState) =>
  state.activities.updatingState;
export const deleteStateSelector = (state: RootState) =>
  state.activities.deletingState;

export const {
  resetAddState,
  resetDeleteState,
  resetUpdateState,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
