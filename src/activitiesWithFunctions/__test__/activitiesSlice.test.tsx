import reducer, * as actions from "../activitiesSlice";
import * as utilities from "../../typesWithoutClasses/vectorActivity/vectorActivity";
import Activity, {
  resetIdGenerator,
  createActivity,
} from "../../typesWithoutClasses/activity/activity";
import "@testing-library/jest-dom/extend-expect";

describe("testing the activitiesSlice with functions", () => {
  it("shoud get the activities from the selector", () => {
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

  it("should add a new Activity", () => {
    resetIdGenerator();
    const addActivitySpy = jest.spyOn(utilities, "addActivity");
    const activities: Array<Activity> = [];
    expect(
      reducer(
        activities,
        actions.addActivity({
          name: "activity",
          description: "activity",
          status: true,
        })
      )
    ).toEqual([
      {
        id: 1,
        name: "activity",
        description: "activity",
        status: true,
      },
    ]);
    expect(addActivitySpy).toHaveBeenCalled();
    addActivitySpy.mockReset();
  });

  it("should delete the activity with id=1", () => {
    const deleteActivitySpy = jest.spyOn(utilities, "deleteActivity");
    resetIdGenerator();
    const activities: Array<Activity> = [
      createActivity("activity", "activity", true),
    ];
    expect(reducer(activities, actions.deleteActivity({ id: 1 }))).toEqual([]);
    expect(deleteActivitySpy).toHaveBeenCalled();
    deleteActivitySpy.mockReset();
  });

  it("should update the activity with id=1", () => {
    const updateActivitySpy = jest.spyOn(utilities, "updateActivity");
    resetIdGenerator();
    const activities: Array<Activity> = [
      createActivity("activity", "activity", true),
    ];
    expect(
      reducer(
        activities,
        actions.updateActivity({
          id: 1,
          name: "updated",
          description: "update",
          status: false,
        })
      )
    ).toEqual([
      {
        id: 1,
        name: "updated",
        description: "update",
        status: false,
      },
    ]);
    expect(updateActivitySpy).toHaveBeenCalled();
    updateActivitySpy.mockReset();
  });
});
