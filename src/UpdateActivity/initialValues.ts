export type UpdateActivityValues = {
  id: string;
  name: string;
  description: string;
  status: boolean;
};

const initialValue: UpdateActivityValues = {
  id: "",
  name: "",
  description: "",
  status: false,
};

export default initialValue;
