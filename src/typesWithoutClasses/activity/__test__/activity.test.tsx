import { createActivity, resetIdGenerator } from "../activity";
import "@testing-library/jest-dom/extend-expect";

describe("testing the Activity type", () => {
  it("should create the first activity with id=1", () => {
    resetIdGenerator();
    const activity = createActivity("activity1", "activity1", true);
    expect(activity).toEqual({
      id: 1,
      name: "activity1",
      description: "activity1",
      status: true,
    });
  });

  it("should create the second activity with id=2", () => {
    resetIdGenerator();
    let activity2 = createActivity("activity1", "activity1", true);
    activity2 = createActivity("activity2", "activity2", false);
    expect(activity2).toEqual({
      id: 2,
      name: "activity2",
      description: "activity2",
      status: false,
    });
  });
});
