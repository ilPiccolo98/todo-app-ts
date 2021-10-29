import Activity, {
  resetIdGenerator,
  createActivity,
} from "../../activity/activity";
import {
  addActivity,
  updateActivity,
  deleteActivity,
} from "..//vectorActivity";
import "@testing-library/jest-dom/extend-expect";

describe("testing the vectorActivity functions", () => {
  it("should add a new Activity into an Array<Activity>", () => {
    resetIdGenerator();
    const vector: Array<Activity> = [];
    addActivity(vector, createActivity("activity1", "activity1", true));
    expect(vector).toEqual([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: true,
      },
    ]);
  });

  it("should update an existing Activity", () => {
    resetIdGenerator();
    const vector: Array<Activity> = [
      createActivity("activity1", "activity1", true),
    ];
    expect(updateActivity(vector, 1, "updated", "updated", false)).toBe(true);
    expect(vector).toEqual([
      {
        id: 1,
        name: "updated",
        description: "updated",
        status: false,
      },
    ]);
  });

  it("should give false if the activity to update doesn't exist", () => {
    resetIdGenerator();
    const vector: Array<Activity> = [
      createActivity("activity1", "activity1", true),
    ];
    expect(updateActivity(vector, 2, "updated", "updated", false)).toBe(false);
  });

  it("should delete the activity with id=1", () => {
    resetIdGenerator();
    const vector: Array<Activity> = [
      createActivity("activity1", "activity1", true),
      createActivity("activity2", "activity2", true),
    ];
    expect(deleteActivity(vector, 2)).toBe(true);
    expect(vector).toEqual([
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: true,
      },
    ]);
  });

  it("should give false if the activity to delete doesn't exist", () => {
    resetIdGenerator();
    const vector: Array<Activity> = [
      createActivity("activity1", "activity1", true),
    ];
    expect(deleteActivity(vector, 2)).toBe(false);
  });
});
