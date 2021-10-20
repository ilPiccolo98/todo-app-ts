import Activity from "../types/classes/activity";

const getInitialActivities = (): Array<Activity> => {
  return [
    new Activity("work out", "after did my homework I must work out", true),
    new Activity("chores", "after the workout I must do the homework", true),
    new Activity(
      "rest",
      "after did everything I deserve a rest thereby to recover",
      false
    ),
  ];
};

export default getInitialActivities;
