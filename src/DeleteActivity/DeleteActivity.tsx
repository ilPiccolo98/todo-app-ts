import React from "react";
import { Formik, Form, Field } from "formik";
import {
  deleteActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import initialValue, { DeleteActivityValues } from "./initialValues";

const DeleteActivity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const activities = useSelector(activitiesSelector);

  const handleSubmit = (values: DeleteActivityValues) => {
    if (doesActivityExist(activities, +values.id)) {
      dispatch(deleteActivity({ id: +values.id }));
    }
  };

  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <div>
            <label htmlFor="id">Id</label>
            <Field
              data-testid="id-field-delete-activity"
              type="text"
              id="id"
              name="id"
              placeholder="Id"
              patterm="[0-9]*"
            />
          </div>
          <input
            data-testid="delete-button-delete-activity"
            type="submit"
            value="Delete"
          />
        </Form>
      )}
    </Formik>
  );
};

export default DeleteActivity;
