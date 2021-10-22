import React from "react";
import { useDispatch } from "react-redux";
import initialValue from "./initialValues";
import { AddActivityValues } from "./initialValues";
import { addActivity } from "../activities/activitiesSlice";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import TextField from "../components/TextField/TextField";
import { FormikProps } from "formik";
import Submit from "../components/Submit/Submit";
import CheckBox from "../components/CheckBox/CheckBox";
import "./AddActivity.css";

export interface AddActivityProps {}

export const AddActivity: React.FC<AddActivityProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const handleSubmit = (values: AddActivityValues) => {
    dispatch(
      addActivity({
        name: values.name,
        description: values.description,
        status: values.status,
      })
    );
  };

  const handleError = (values: FormikProps<AddActivityValues>) => {
    return Object.values(values.errors).map((error: string) => (
      <p key={error}>{error}</p>
    ));
  };

  return (
    <Form
      title="Add Activity"
      initialValues={initialValue}
      handleSubmit={handleSubmit}
      validationSchema={validationSchema}
      variant="primary"
      handleError={handleError}
      className="form-style"
    >
      <div>
        <div className="float-left">
          <TextField
            id="name"
            name="name"
            labelText="Name"
            placeholder="Insert name"
            variant="secondary"
            type="text"
          />
        </div>
        <div className="float-right">
          <TextField
            id="description"
            name="description"
            labelText="Description"
            placeholder="Insert description"
            variant="secondary"
            type="text"
          />
        </div>
        <div className="status">
          <CheckBox
            id="status"
            name="status"
            variant="secondary"
            label="Status"
          />
        </div>
        <Submit className="submit-button" id="submit" variant="primary">
          Add
        </Submit>
      </div>
    </Form>
  );
};

export default AddActivity;
