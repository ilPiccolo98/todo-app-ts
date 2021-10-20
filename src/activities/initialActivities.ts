export type Activity = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

let idCounter = 1;
export const createActivity = (
  name: string,
  description: string,
  status: boolean
) => {
  const newActivity: Activity = {
    id: idCounter,
    name,
    description,
    status,
  };
  ++idCounter;
  return newActivity;
};

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
