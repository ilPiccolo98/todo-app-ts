import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { Activity } from "../activities/initialActivities";
import { RootState } from "../activities/activitiesStore";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import Submit from "../components/Submit/Submit";
import TextField from "../components/TextField/TextField";
import CheckBox from "../components/CheckBox/CheckBox";
import "./UpdateActivity.css";
import { useFormik } from "formik";

const UpdateActivity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
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
    },
  });
  const activities: Array<Activity> = useSelector<RootState, Array<Activity>>(
    activitiesSelector
  );

  return (
    <Form
      variant="primary"
      className="update-form"
      title="Update Activity"
      onSubmit={formik.handleSubmit}
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
            onChange={formik.handleChange}
            value={formik.values.id}
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
            onChange={formik.handleChange}
            value={formik.values.name}
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
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="checkbox-status-update">
          <CheckBox
            className="checkbox-status-update"
            id="status"
            name="status"
            variant="secondary"
            label="Status"
            onChange={formik.handleChange}
            value={formik.values.status}
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
