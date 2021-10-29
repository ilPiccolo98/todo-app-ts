type Activity = {
  id: number;
  name: string;
  description: string;
  status: boolean;
};

let idCounter = 1;

export const resetIdGenerator = (): void => {
  idCounter = 1;
};

export const createActivity = (
  name: string,
  description: string,
  status: boolean
): Activity => {
  const activity: Activity = {
    id: idCounter,
    name,
    description,
    status,
  };
  ++idCounter;
  return activity;
};

export default Activity;
