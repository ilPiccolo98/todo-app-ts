import React from "react";
import {
  deleteActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import Submit from "../components/Submit/Submit";
import TextField from "../components/TextField/TextField";
import "./DeleteActivity.css";
import { useFormik } from "formik";

const DeleteActivity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (doesActivityExist(activities, +values.id)) {
        dispatch(deleteActivity({ id: +values.id }));
      }
    },
  });
  const activities = useSelector(activitiesSelector);

  return (
    <Form
      title="Delete Activity"
      variant="primary"
      className="form-delete"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        id="id"
        name="id"
        variant="secondary"
        type="numbers"
        labelText="Id"
        placeholder="Insert Id"
        onChange={formik.handleChange}
        value={formik.values.id}
      />
      <Submit className="delete-submit" variant="primary">
        Delete
      </Submit>
    </Form>
  );
};

export default DeleteActivity;
