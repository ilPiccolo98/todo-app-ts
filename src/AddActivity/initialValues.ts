export type AddActivityValues = {
  name: string;
  description: string;
  status: boolean;
};

const initialValue: AddActivityValues = {
  name: "",
  description: "",
  status: false,
};

export default initialValue;
