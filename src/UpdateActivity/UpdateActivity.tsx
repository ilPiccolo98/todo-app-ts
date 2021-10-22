import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { FormikProps } from "formik";
import { Activity } from "../activities/initialActivities";
import { RootState } from "../activities/activitiesStore";
import initialValue, { UpdateActivityValues } from "./initialValues";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import Submit from "../components/Submit/Submit";
import TextField from "../components/TextField/TextField";
import CheckBox from "../components/CheckBox/CheckBox";
import "./UpdateActivity.css";

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

  const handleError = (values: FormikProps<UpdateActivityValues>) => {
    return Object.values(values.errors).map((error: string) => (
      <p key={error}>{error}</p>
    ));
  };

  return (
    <Form
      initialValues={initialValue}
      validationSchema={validationSchema}
      variant="primary"
      handleSubmit={handleSubmit}
      handleError={handleError}
      className="update-form"
      title="Update Activity"
    >
      <div>
        <div className="float-left">
          <TextField
            labelText="Id"
            id="id"
            name="id"
            type="numbers"
            variant="secondary"
            placeholder="Insert Id"
          />
        </div>
        <div className="float-right">
          <TextField
            labelText="Name"
            id="name"
            name="name"
            type="text"
            variant="secondary"
            placeholder="Insert name"
          />
        </div>
        <div className="float-left description-style">
          <TextField
            labelText="Description"
            id="description"
            name="description"
            type="text"
            variant="secondary"
            placeholder="Insert description"
          />
        </div>
        <div className="checkbox-status-update">
          <CheckBox
            className="checkbox-status-update"
            id="status"
            name="status"
            variant="secondary"
            label="Status"
          />
        </div>
        <Submit className="update-button" variant="primary">
          Update
        </Submit>
      </div>
    </Form>
  );
};

export default UpdateActivity;
