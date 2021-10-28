import "@testing-library/jest-dom/extend-expect";
import Activity from "../activity";

describe("testing the activity class", () => {
  it("should create an Activity with id=1, name='name', description='description', status=true", () => {
    Activity.resetIdGenerator();
    const activity = new Activity("name", "description", true);
    expect(activity.Id).toBe(1);
    expect(activity.Name).toBe("name");
    expect(activity.Description).toBe("description");
    expect(activity.Status).toBe(true);
  });

  it("should set an activity with name=nameChanged, description=descriptionChanged, status=false", () => {
    Activity.resetIdGenerator();
    const activity = new Activity("name", "description", true);
    activity.Name = "nameChanged";
    activity.Description = "descriptionChanged";
    activity.Status = false;
    expect(activity.Id).toBe(1);
    expect(activity.Name).toBe("nameChanged");
    expect(activity.Description).toBe("descriptionChanged");
    expect(activity.Status).toBe(false);
  });

  it("should clone an existing activity", () => {
    Activity.resetIdGenerator();
    const activity = new Activity("name", "description", true);
    const clone = activity.clone();
    expect(clone.Id).toBe(1);
    expect(clone.Name).toBe("name");
    expect(clone.Description).toBe("description");
    expect(clone.Status).toBe(true);
  });
});
