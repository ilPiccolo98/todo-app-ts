import * as yup from "yup";

const validationSchema = yup.object().shape({
  id: yup.number().required("Id is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

export default validationSchema;
