import * as yup from "yup";

const validationSchema = yup.object().shape({
  id: yup.number().required("Id is required"),
});

export default validationSchema;
