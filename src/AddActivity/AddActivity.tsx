import React, { HTMLAttributes, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import initialValues from "./initialValues";
import {
  addActivity,
  addStateSelector,
  AddState,
  resetAddState,
  fetchAllActivities,
} from "../activities/activitiesSlice";
import validationSchema from "./validationSchema";
import Form from "../components/Form/Form";
import TextField from "../components/TextField/TextField";
import { useFormik } from "formik";
import Submit from "../components/Submit/Submit";
import CheckBox from "../components/CheckBox/CheckBox";
import MessageError from "../components/MessageError/MessageError";
import "./AddActivity.css";
import { RootState } from "../activities/activitiesStore";
import Message from "../components/Message/Message";

export interface AddActivityProps extends HTMLAttributes<HTMLFormElement> {}

export const AddActivity: React.FC<AddActivityProps> = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAddState());
  }, [dispatch]);

  const addState: AddState = useSelector<RootState, AddState>(addStateSelector);

  useEffect(() => {
    if (addState === AddState.Added) {
      dispatch(fetchAllActivities());
    }
  }, [addState, dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        addActivity({
          name: values.name,
          description: values.description,
          status: values.status,
        })
      );
    },
  });

  const getMessage = (): JSX.Element => {
    if (addState === AddState.Added) {
      return <Message>Activity Added</Message>;
    } else if (addState === AddState.Adding) {
      return <Message>Adding Activity</Message>;
    } else if (addState === AddState.NotAdded) {
      return <MessageError size="small">Activity not added!</MessageError>;
    }
    return <></>;
  };

  return (
    <Form title="Add Activity" variant="primary" onSubmit={formik.handleSubmit}>
      <div>
        <div className="float-left">
          <TextField
            datatestid="name-addActivity"
            id="name"
            name="name"
            labelText="Name"
            placeholder="Insert name"
            variant="secondary"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="float-right">
          <TextField
            datatestid="description-addActivity"
            id="description"
            name="description"
            labelText="Description"
            placeholder="Insert description"
            variant="secondary"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="status">
          <CheckBox
            datatestid="status-addActivity"
            id="status"
            name="status"
            variant="secondary"
            label="Status"
            onChange={formik.handleChange}
            value={formik.values.status}
          />
        </div>
        <Submit
          datatestid="submit-addActivity"
          className="submit-button"
          id="submit"
          variant="primary"
        >
          Add
        </Submit>
        <div className="error-name">
          <MessageError size="medium">{formik.errors.name}</MessageError>
        </div>
        <div className="error-description">
          <MessageError size="medium">{formik.errors.description}</MessageError>
        </div>
        <div>{getMessage()}</div>
      </div>
    </Form>
  );
};

export default AddActivity;
