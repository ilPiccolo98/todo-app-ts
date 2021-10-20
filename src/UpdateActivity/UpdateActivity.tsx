import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { Formik, Form, Field } from "formik";
import { Activity } from "../activities/initialActivities";
import { RootState } from "../activities/activitiesStore";
import initialValue, { UpdateActivityValues } from "./initialValues";
import validationSchema from "./validationSchema";

const UpdateActivity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const activities: Array<Activity> = useSelector<RootState, Array<Activity>>(
    activitiesSelector
  );

  const handleSubmit = (values: UpdateActivityValues) => {
    if (doesActivityExist(activities, +values.id)) {
      dispatch(
        updateActivity({
          id: +values.id,
          name: values.name,
          description: values.description,
          status: values.status,
        })
      );
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
              type="text"
              pattern="[0-9]*"
              id="id"
              name="id"
              placeholder="Id"
              data-testid="id-field-update-activity"
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              data-testid="name-field-update-activity"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              data-testid="description-field-update-activity"
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <Field
              type="checkbox"
              id="status"
              name="status"
              data-testid="status-checkbox-update-activity"
            />
          </div>
          <input
            type="submit"
            value="Update"
            data-testid="update-button-update-activity"
          />
          {Object.values(values.errors).map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </Form>
      )}
    </Formik>
  );
};

export default UpdateActivity;
