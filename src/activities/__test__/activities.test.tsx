import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import reducer, * as actions from "../activitiesSlice";
import axios from "axios";
import Activity from "../../types/activity/activity";

describe("testing activitiesSlice actions", () => {
  const store = configureStore({
    reducer: (state = "", action) => {
      switch (action.type) {
        case "activities/fetchAllActivities/fulfilled":
          return action.payload;
        case "activities/fetchAllActivities/rejected":
          return action.payload;
        case "activities/addActivity/fulfilled":
          return action.payload;
        case "activities/addActivity/rejected":
          return action.payload;
        case "activities/updateActivity/fulfilled":
          return action.payload;
        case "activities/updateActivity/rejected":
          return action.payload;
        case "activities/deleteActivity/fulfilled":
          return action.payload;
        case "activities/deleteActivity/rejected":
          return action.payload;
      }
    },
  });
  let initialState = {
    activities: {
      activities: new Array<Activity>(),
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    },
  };
  const axiosGetSpy = jest.spyOn(axios, "get");
  const axiosPostSpy = jest.spyOn(axios, "post");
  const axiosDeleteSpy = jest.spyOn(axios, "delete");

  beforeEach(() => {
    axiosGetSpy.mockReset();
    axiosPostSpy.mockReset();
    axiosDeleteSpy.mockReset();
    initialState.activities = {
      activities: new Array<Activity>(),
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    };
  });

  it("should return an empty activity array when the promise is resolved using fetchAllActivities", async () => {
    axiosGetSpy.mockResolvedValueOnce({ data: { activities: [] } });
    await store.dispatch(actions.fetchAllActivities());
    expect(axiosGetSpy).toHaveBeenCalledWith("/activities/retrieve");
    const state = store.getState();
    expect(state).toEqual([]);
  });

  it("should return an error message when the promise is rejected using fetchAllActivities", async () => {
    axiosGetSpy.mockRejectedValueOnce({ message: "Error" });
    await store.dispatch(actions.fetchAllActivities());
    expect(axiosGetSpy).toHaveBeenCalledWith("/activities/retrieve");
    const state = store.getState();
    expect(state).toEqual({ errorMessage: "Error" });
  });

  it("should return isItAdded=true when the promise is resolved using addActivity", async () => {
    axiosPostSpy.mockResolvedValueOnce({ data: { isItAdded: true } });
    const data = { name: "activity", description: "activity", status: true };
    await store.dispatch(actions.addActivity(data));
    expect(axiosPostSpy).toHaveBeenCalledWith("/activities/add", data);
    const state = store.getState();
    expect(state).toEqual(true);
  });

  it("should return an error message when the promise is rejected using addActivity", async () => {
    axiosPostSpy.mockRejectedValueOnce({ message: "Error" });
    const data = { name: "activity", description: "activity", status: true };
    await store.dispatch(actions.addActivity(data));
    expect(axiosPostSpy).toHaveBeenCalledWith("/activities/add", data);
    const state = store.getState();
    expect(state).toEqual({ errorMessage: "Error" });
  });

  it("should return isItAdded=true when the promise is resolved using updateActivity", async () => {
    axiosPostSpy.mockResolvedValueOnce({ data: { isItUpdated: true } });
    const data = {
      id: 1,
      name: "activity",
      description: "activity",
      status: true,
    };
    await store.dispatch(actions.updateActivity(data));
    expect(axiosPostSpy).toHaveBeenCalledWith("/activities/update", data);
    const state = store.getState();
    expect(state).toEqual(true);
  });

  it("should return an error message when the promise is rejected using updateActivity", async () => {
    axiosPostSpy.mockRejectedValueOnce({ message: "Error" });
    const data = {
      id: 1,
      name: "activity",
      description: "activity",
      status: true,
    };
    await store.dispatch(actions.updateActivity(data));
    expect(axiosPostSpy).toHaveBeenCalledWith("/activities/update", data);
    const state = store.getState();
    expect(state).toEqual({ errorMessage: "Error" });
  });

  it("should return isItAdded=true when the promise is resolved using deleteActivity", async () => {
    axiosDeleteSpy.mockResolvedValueOnce({ data: { isItDeleted: true } });
    const data = 1;
    await store.dispatch(actions.deleteActivity(data));
    expect(axiosDeleteSpy).toHaveBeenCalledWith(`/activities/delete/${data}`);
    const state = store.getState();
    expect(state).toEqual(true);
  });

  it("should return an error message when the promise is rejected using deleteActivity", async () => {
    axiosDeleteSpy.mockRejectedValueOnce({ message: "Error" });
    const data = 1;
    await store.dispatch(actions.deleteActivity(data));
    expect(axiosDeleteSpy).toHaveBeenCalledWith(`/activities/delete/${data}`);
    const state = store.getState();
    expect(state).toEqual({ errorMessage: "Error" });
  });

  it("should have activities=[{ id: 1, name: 'name', description: 'description', status: true}] and retrievingState=RetrieveState.Loaded when fetchAllActivities is fulfilled", () => {
    const action = {
      type: actions.fetchAllActivities.fulfilled,
      payload: [
        { id: 1, name: "name", description: "description", status: true },
      ],
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [
        { id: 1, name: "name", description: "description", status: true },
      ],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loaded,
    });
  });

  it("should have retrievingState=RetrieveState.Loaded when fetchAllActivities is pending", () => {
    const action = {
      type: actions.fetchAllActivities.pending,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have retrievingState=RetrieveState.Error when fetchAllActivities is rejected", () => {
    const action = {
      type: actions.fetchAllActivities.rejected,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Error,
    });
  });

  it("should have addingState=AddState.Added when addActivity is fulfilled and when the payload === true", () => {
    const action = {
      type: actions.addActivity.fulfilled,
      payload: true,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Added,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have addingState=AddState.NotAdded when addActivity is fulfilled and when the payload === false", () => {
    const action = {
      type: actions.addActivity.fulfilled,
      payload: false,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.NotAdded,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have addingState=AddState.Adding when addActivity is pending", () => {
    const action = {
      type: actions.addActivity.pending,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Adding,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have addingState=AddState.NotAdded when addActivity is rejected", () => {
    const action = {
      type: actions.addActivity.rejected,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.NotAdded,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have updatingState=UpdateState.Updated when updateActivity is fulfilled and when the payload === true", () => {
    const action = {
      type: actions.updateActivity.fulfilled,
      payload: true,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Updated,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have updatingState=UpdateState.NotUpdated when updateActivity is fulfilled and when the payload === false", () => {
    const action = {
      type: actions.updateActivity.fulfilled,
      payload: false,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.NotUpdated,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have updatingState=UpdateState.Updating when updateActivity is pending", () => {
    const action = {
      type: actions.updateActivity.pending,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Updating,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have updatingState=UpdateState.NotUpdated when updateActivity is rejected", () => {
    const action = {
      type: actions.updateActivity.rejected,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.NotUpdated,
      deletingState: actions.DeleteState.Null,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have delitingState=DeleteState.Deleted when deleteActivity is fulfilled and when the payload === true", () => {
    const action = {
      type: actions.deleteActivity.fulfilled,
      payload: true,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Deleted,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have deletingState=DeleteState.NotDeleted when deleteActivity is fulfilled and when the payload === false", () => {
    const action = {
      type: actions.deleteActivity.fulfilled,
      payload: false,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.NotDeleted,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have deletingState=DeleteState.Deleting when deleteActivity is pending", () => {
    const action = {
      type: actions.deleteActivity.pending,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.Deleting,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should have deletingState=DeleteState.NotDeleted when deleteActivity is rejected", () => {
    const action = {
      type: actions.deleteActivity.rejected,
    };
    const updatedState = reducer(initialState.activities, action);
    expect(updatedState).toEqual({
      activities: [],
      addingState: actions.AddState.Null,
      updatingState: actions.UpdateState.Null,
      deletingState: actions.DeleteState.NotDeleted,
      retrievingState: actions.RetrieveState.Loading,
    });
  });

  it("should select the activities", () => {
    initialState.activities.activities = [
      {
        id: 1,
        name: "test",
        description: "test",
        status: true,
      },
    ];
    const activities = actions.activitiesSelector(initialState);
    expect(activities).toEqual([
      {
        id: 1,
        name: "test",
        description: "test",
        status: true,
      },
    ]);
  });

  it("should select the retrievengState", () => {
    initialState.activities.retrievingState = actions.RetrieveState.Loaded;
    const state = actions.retrievingStateSelector(initialState);
    expect(state).toBe(actions.RetrieveState.Loaded);
  });

  it("should select the addingState", () => {
    initialState.activities.addingState = actions.AddState.Added;
    const state = actions.addStateSelector(initialState);
    expect(state).toBe(actions.AddState.Added);
  });

  it("should select the updatingState", () => {
    initialState.activities.updatingState = actions.UpdateState.Updated;
    const state = actions.updateStateSelector(initialState);
    expect(state).toBe(actions.UpdateState.Updated);
  });

  it("should select the deletingState", () => {
    initialState.activities.deletingState = actions.DeleteState.Deleted;
    const state = actions.deleteStateSelector(initialState);
    expect(state).toBe(actions.DeleteState.Deleted);
  });
});
