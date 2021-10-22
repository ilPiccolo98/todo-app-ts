import React from "react";
import { Formik, Form, Field } from "formik";
import {
  deleteActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import initialValue, { DeleteActivityValues } from "./initialValues";
import validationSchema from "./validationSchema";

const DeleteActivity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const activities = useSelector(activitiesSelector);

  const handleSubmit = (values: DeleteActivityValues) => {
    if (doesActivityExist(activities, +values.id)) {
      dispatch(deleteActivity({ id: +values.id }));
    }
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
            <label htmlFor="id">Id</label>
            <Field
              data-testid="id-field-delete-activity"
              type="text"
              id="id"
              name="id"
              placeholder="Id"
              pattern="[0-9]*"
            />
          </div>
          <input
            data-testid="delete-button-delete-activity"
            type="submit"
            value="Delete"
          />
          {Object.values(values.errors).map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </Form>
      )}
    </Formik>
  );
};

export default DeleteActivity;
