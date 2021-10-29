import VectorActivity from "../vectorActivity";
import "@testing-library/jest-dom/extend-expect";
import Activity, { ActivityPlain } from "../../activity/activity";

describe("testing the VectorActivity class", () => {
  it("should add a new Activity", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity();
    vector.addActivity(new Activity("name", "description", true));
    expect(vector.size()).toBe(1);
    expect(vector.at(0)).toMatchObject({
      id: 1,
      name: "name",
      description: "description",
      status: true,
    });
  });

  it("should delete the Activity with id=1", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity([
      new Activity("name", "description", true),
    ]);
    vector.deleteActivity(1);
    expect(vector.size()).toBe(0);
  });

  it("should delete the Activity with id=2", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity([
      new Activity("name", "description", true),
      new Activity("name", "description", true),
    ]);
    vector.deleteActivity(2);
    expect(vector.size()).toBe(1);
  });

  it("should update the activity with id=1", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity([
      new Activity("name", "description", true),
    ]);
    vector.updateActivity(1, "nameUpdated", "descriptionUpdated", false);
    expect(vector.at(0)).toMatchObject({
      id: 1,
      name: "nameUpdated",
      description: "descriptionUpdated",
      status: false,
    });
  });

  it("should convert the class to a plain array", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity([
      new Activity("name", "description", true),
    ]);
    const plainVector = vector.toPlainArray();
    Activity.resetIdGenerator();
    expect(plainVector).toMatchObject([
      new Activity("name", "description", true),
    ]);
  });

  it("should exist the Activity with id = 2", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity([
      new Activity("name", "description", true),
      new Activity("name", "description", true),
    ]);
    expect(vector.doesActivityExist(2)).toBe(true);
  });

  it("should exist the Activity with id = 3", () => {
    Activity.resetIdGenerator();
    const vector = new VectorActivity([
      new Activity("name", "description", true),
      new Activity("name", "description", true),
    ]);
    expect(vector.doesActivityExist(3)).toBe(false);
  });

  it("should convert an ActivityPlain to Activity", () => {
    const activityPlain: ActivityPlain = {
      id: 1,
      name: "activity",
      description: "activity",
      status: true,
    };
    const activityConverted: Activity = Activity.fromActivityPlainToActivity(
      activityPlain
    );
    expect(activityConverted.Id).toBe(1);
    expect(activityConverted.Name).toBe("activity");
    expect(activityConverted.Description).toBe("activity");
    expect(activityConverted.Status).toBe(true);
  });

  it("shoud convert an array with ActivitiesPlain to VectorActivity", () => {
    const activities: Array<ActivityPlain> = [
      {
        id: 1,
        name: "activity1",
        description: "activity1",
        status: true,
      },
      {
        id: 2,
        name: "activity2",
        description: "activity2",
        status: false,
      },
    ];
    const vector: VectorActivity = VectorActivity.fromArrayPlainActivityToVectorActivity(
      activities
    );
    const activity1: Activity = vector.at(0);
    const activity2: Activity = vector.at(1);
    expect(activity1.Id).toBe(1);
    expect(activity1.Name).toBe("activity1");
    expect(activity1.Description).toBe("activity1");
    expect(activity1.Status).toBe(true);
    expect(activity2.Id).toBe(2);
    expect(activity2.Name).toBe("activity2");
    expect(activity2.Description).toBe("activity2");
    expect(activity2.Status).toBe(false);
  });
});
