import React from "react";
import {
  deleteActivity,
  activitiesSelector,
  doesActivityExist,
} from "../activities/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import initialValue, { DeleteActivityValues } from "./initialValues";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import Submit from "../components/Submit/Submit";
import TextField from "../components/TextField/TextField";
import { FormikProps } from "formik";
import "./DeleteActivity.css";

const DeleteActivity: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const activities = useSelector(activitiesSelector);

  const handleSubmit = (values: DeleteActivityValues) => {
    if (doesActivityExist(activities, +values.id)) {
      dispatch(deleteActivity({ id: +values.id }));
    }
  };

  const handleError = (values: FormikProps<DeleteActivityValues>) => {
    return Object.values(values.errors).map((error: string) => (
      <p key={error}>{error}</p>
    ));
  };

  return (
    <Form
      title="Delete Activity"
      initialValues={initialValue}
      handleError={handleError}
      handleSubmit={handleSubmit}
      variant="primary"
      validationSchema={validationSchema}
      className="form-delete"
    >
      <div>
        <TextField
          id="id"
          name="id"
          variant="secondary"
          type="numbers"
          labelText="Id"
          placeholder="Insert Id"
        />
        <Submit className="delete-submit" variant="primary">
          Delete
        </Submit>
      </div>
    </Form>
  );
};

export default DeleteActivity;
