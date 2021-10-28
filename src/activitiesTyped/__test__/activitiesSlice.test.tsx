import React from "react";
import "@testing-library/jest-dom/extend-expect";
import reducer from "../activitiesSlice";
import * as actions from "../activitiesSlice";
import Activity, { ActivityPlain } from "../../types/classes/activity/activity";

describe("testing activitiesSlice", () => {
  let initialState: Array<ActivityPlain> = [];
  beforeEach(() => {
    initialState = [];
  });

  it("should add the first activity into the state with { id: 1, name: activity1, description: activity1, status: true }", () => {
    Activity.resetIdGenerator();
    expect(
      reducer(
        initialState,
        actions.addActivity({
          name: "activity1",
          description: "activity1",
          status: true,
        })
      )
    ).toEqual([
      { id: 1, name: "activity1", description: "activity1", status: true },
    ]);
  });

  it("should delete the activity with id = 2", () => {
    initialState = [
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: false,
      },
      {
        id: 2,
        name: "activity2",
        description: "activity2",
        status: true,
      },
    ];
    const result = reducer(initialState, actions.deleteActivity({ id: 2 }));
    expect(result).toEqual([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: false,
      },
    ]);
  });

  it("should update the activity with id = 2", () => {
    initialState = [
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: false,
      },
      {
        id: 2,
        name: "activity2",
        description: "activity2",
        status: true,
      },
    ];
    expect(
      reducer(
        initialState,
        actions.updateActivity({
          id: 2,
          name: "updated",
          description: "updated",
          status: true,
        })
      )
    ).toEqual([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: false,
      },
      {
        id: 2,
        name: "updated",
        description: "updated",
        status: true,
      },
    ]);
  });
});
