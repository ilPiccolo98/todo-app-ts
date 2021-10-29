import "@testing-library/jest-dom/extend-expect";
import reducer from "../activitiesSlice";
import * as actions from "../activitiesSlice";
import { Activity } from "../initialActivities";

describe("testing activitiesSlice", () => {
  let initialState: Array<Activity> = [];
  beforeEach(() => {
    initialState = [];
  });

  it("should add the first activity into the state with { id: 4, name: activity1, description: activity1, status: true }", () => {
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
      { id: 4, name: "activity1", description: "activity1", status: true },
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
    expect(reducer(initialState, actions.deleteActivity({ id: 2 }))).toEqual([
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

describe("testing doesActivityExist function", () => {
  let initialState: Array<Activity> = [];
  beforeEach(() => {
    initialState = [];
  });

  it("should return true", () => {
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
    expect(actions.doesActivityExist(initialState, 2)).toBe(true);
  });

  it("should return false", () => {
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
    expect(actions.doesActivityExist(initialState, 10)).toBe(false);
  });

  it("should select and get the current state", () => {
    expect(
      actions.activitiesSelector({
        activities: [
          {
            id: 1,
            name: "activity",
            description: "activity",
            status: true,
          },
        ],
      })
    ).toEqual([
      {
        id: 1,
        name: "activity",
        description: "activity",
        status: true,
      },
    ]);
  });
});
