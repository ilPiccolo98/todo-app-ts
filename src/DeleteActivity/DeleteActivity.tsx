import React, { useEffect } from "react";
import {
  deleteActivity,
  DeleteState,
  deleteStateSelector,
  fetchAllActivities,
  resetDeleteState,
} from "../activities/activitiesSlice";
import { useDispatch, useSelector } from "react-redux";
import initialValues from "./initialValues";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import Submit from "../components/Submit/Submit";
import TextField from "../components/TextField/TextField";
import "./DeleteActivity.css";
import { useFormik } from "formik";
import MessageError from "../components/MessageError/MessageError";
import { RootState } from "../activities/activitiesStore";
import Message from "../components/Message/Message";

export interface DeleteActivityProps {}

export const DeleteActivity: React.FC<DeleteActivityProps> = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDeleteState());
  }, [dispatch]);

  const deleteState: DeleteState = useSelector<RootState, DeleteState>(
    deleteStateSelector
  );

  useEffect(() => {
    if (deleteState === DeleteState.Deleted) {
      dispatch(fetchAllActivities());
    }
  }, [dispatch, deleteState]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(deleteActivity(+values.id));
    },
  });

  const getMessage = (): JSX.Element => {
    if (deleteState === DeleteState.Deleted) {
      return (
        <Message size="large" variant="green">
          Activity Deleted
        </Message>
      );
    } else if (deleteState === DeleteState.Deleting) {
      return (
        <Message size="large" variant="blue">
          Deleting Activity
        </Message>
      );
    } else if (deleteState === DeleteState.NotDeleted) {
      return <MessageError size="small">Activity not deleted!</MessageError>;
    }
    return <></>;
  };

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
        datatestid="id-deleteActivity"
      />
      <Submit
        datatestid="submit-deleteActivity"
        className="delete-submit"
        variant="primary"
      >
        Delete
      </Submit>
      <div className="error-id">
        <MessageError size="medium">{formik.errors.id}</MessageError>
      </div>
      <div className="message-description">{getMessage()}</div>
    </Form>
  );
};

export default DeleteActivity;
