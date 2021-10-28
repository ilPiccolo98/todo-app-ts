import Activity, { ActivityPlain } from "../types/classes/activity/activity";
import VectorActivity from "../types/classes/vectorActivity/vectorActivity";

const getInitialState = (): ActivityPlain[] => {
  const activities = new VectorActivity([
    new Activity("work out", "after did my homework I must work out", true),
    new Activity("chores", "after the workout I must do the homework", true),
    new Activity(
      "rest",
      "after did everything I deserve a rest thereby to recover",
      false
    ),
  ]);
  return activities.toPlainArrayWithPlainActivities();
};

export default getInitialState;
