import Activity, {
  createActivity,
} from "../typesWithoutClasses/activity/activity";

const getInitialActivities = (): Array<Activity> => {
  return [
    createActivity("work out", "after did my homework I must work out", true),
    createActivity("chores", "after the workout I must do the homework", true),
    createActivity(
      "rest",
      "after did everything I deserve a rest thereby to recover",
      false
    ),
  ];
};

export default getInitialActivities;
