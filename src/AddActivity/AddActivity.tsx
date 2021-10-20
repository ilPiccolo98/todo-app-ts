import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import initialValue from "./initialValues";
import { AddActivityValues } from "./initialValues";
import { addActivity } from "../activities/activitiesSlice";
import validationSchema from "./validationSchema";

const AddActivity: React.FC = (): JSX.Element => {
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

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(values) => (
        <Form>
          <div>
            <label data-testid="name-label-add-activity" htmlFor="name">
              Name
            </label>
            <Field
              data-testid="name-field-add-activity"
              id="name"
              name="name"
              placeholder="Name"
            />
          </div>
          <div>
            <label
              data-testid="description-label-add-activity"
              htmlFor="description"
            >
              Description
            </label>
            <Field
              data-testid="description-field-add-activity"
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <label data-testid="status-label-add-activity" htmlFor="status">
              Status
            </label>
            <Field
              data-testid="status-checkbox-add-activity"
              type="checkbox"
              id="status"
              name="status"
            />
          </div>
          <div>
            <input
              data-testid="insert-button-add-activity"
              type="submit"
              id="submit"
              name="submit"
              value="Insert"
            />
          </div>
          {Object.values(values.errors).map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </Form>
      )}
    </Formik>
  );
};

export default AddActivity;
