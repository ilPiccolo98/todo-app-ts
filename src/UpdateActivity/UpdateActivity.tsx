import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateActivity,
  activitiesSelector,
} from "../activitiesTyped/activitiesSlice";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import Submit from "../components/Submit/Submit";
import TextField from "../components/TextField/TextField";
import CheckBox from "../components/CheckBox/CheckBox";
import "./UpdateActivity.css";
import { useFormik } from "formik";
import MessageError from "../components/MessageError/MessageError";
import VectorActivity from "../types/classes/vectorActivity";

export interface UpdateActivityProps {}

export const UpdateActivity: React.FC<UpdateActivityProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (activities.doesActivityExist(+values.id)) {
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
  const activities: VectorActivity = VectorActivity.fromArrayPlainActivityToVectorActivity(
    useSelector(activitiesSelector)
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
            datatestid="id-updateActivity"
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
            datatestid="name-updateActivity"
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
            datatestid="description-updateActivity"
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
            datatestid="status-updateActivity"
            className="checkbox-status-update"
            id="status"
            name="status"
            variant="secondary"
            label="Status"
            onChange={formik.handleChange}
            value={formik.values.status}
          />
        </div>
        <Submit
          datatestid="submit-updateActivity"
          className="update-button"
          variant="primary"
        >
          Update
        </Submit>
        <div className="error-id">
          <MessageError size="medium">{formik.errors.id}</MessageError>
        </div>
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

export default UpdateActivity;
