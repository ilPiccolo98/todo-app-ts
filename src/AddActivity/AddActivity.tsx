import React, { HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import initialValues from "./initialValues";
import { addActivity } from "../activitiesWithFunctions/activitiesSlice";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import TextField from "../components/TextField/TextField";
import { useFormik } from "formik";
import Submit from "../components/Submit/Submit";
import CheckBox from "../components/CheckBox/CheckBox";
import MessageError from "../components/MessageError/MessageError";
import "./AddActivity.css";

export interface AddActivityProps extends HTMLAttributes<HTMLFormElement> {}

export const AddActivity: React.FC<AddActivityProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        addActivity({
          name: values.name,
          description: values.description,
          status: values.status,
        })
      );
    },
  });
  return (
    <Form
      title="Add Activity"
      variant="primary"
      className="form-style"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <div className="float-left">
          <TextField
            datatestid="name-addActivity"
            id="name"
            name="name"
            labelText="Name"
            placeholder="Insert name"
            variant="secondary"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="float-right">
          <TextField
            datatestid="description-addActivity"
            id="description"
            name="description"
            labelText="Description"
            placeholder="Insert description"
            variant="secondary"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="status">
          <CheckBox
            datatestid="status-addActivity"
            id="status"
            name="status"
            variant="secondary"
            label="Status"
            onChange={formik.handleChange}
            value={formik.values.status}
          />
        </div>
        <Submit
          datatestid="submit-addActivity"
          className="submit-button"
          id="submit"
          variant="primary"
        >
          Add
        </Submit>
        <div className="error-name">
          <MessageError size="medium">{formik.errors.name}</MessageError>
        </div>
        <div className="error-description">
          <MessageError size="medium">{formik.errors.description}</MessageError>
        </div>
      </div>
    </Form>
  );
};

export default AddActivity;
