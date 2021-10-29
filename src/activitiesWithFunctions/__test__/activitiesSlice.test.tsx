import reducer, {
  addActivity,
  deleteActivity,
  updateActivity,
} from "../activitiesSlice";
import Activity, {
  resetIdGenerator,
  createActivity,
} from "../../typesWithoutClasses/activity/activity";
import "@testing-library/jest-dom/extend-expect";

describe("testing the activitiesSlice with functions", () => {
  it("should add a new Activity", () => {
    resetIdGenerator();
    const activities: Array<Activity> = [];
    expect(
      reducer(
        activities,
        addActivity({ name: "activity", description: "activity", status: true })
      )
    ).toEqual([
      {
        id: 1,
        name: "activity",
        description: "activity",
        status: true,
      },
    ]);
  });

  it("should delete the activity with id=1", () => {
    resetIdGenerator();
    const activities: Array<Activity> = [
      createActivity("activity", "activity", true),
    ];
    expect(reducer(activities, deleteActivity({ id: 1 }))).toEqual([]);
  });

  it("should update the activity with id=1", () => {
    resetIdGenerator();
    const activities: Array<Activity> = [
      createActivity("activity", "activity", true),
    ];
    expect(
      reducer(
        activities,
        updateActivity({
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
  });
});
