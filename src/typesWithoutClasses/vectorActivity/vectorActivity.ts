import Activity from "../activity/activity";

export const addActivity = (
  vector: Array<Activity>,
  activity: Activity
): void => {
  vector.push(activity);
};

export const deleteActivity = (
  vector: Array<Activity>,
  id: number
): boolean => {
  const position = doesActivityExist(vector, id);
  if (position !== -1) {
    vector.splice(position, 1);
    return true;
  }
  return false;
};

export const updateActivity = (
  vector: Array<Activity>,
  id: number,
  name: string,
  description: string,
  status: boolean
): boolean => {
  const position = doesActivityExist(vector, id);
  if (position !== -1) {
    updateActivityItem(vector, position, name, description, status);
    return true;
  }
  return false;
};

const updateActivityItem = (
  vector: Array<Activity>,
  position: number,
  name: string,
  description: string,
  status: boolean
): void => {
  vector[position].name = name;
  vector[position].description = description;
  vector[position].status = status;
};

const doesActivityExist = (vector: Array<Activity>, id: number): number => {
  for (let i: number = 0; i !== vector.length; ++i) {
    if (vector[i].id === id) {
      return i;
    }
  }
  return -1;
};
