import React, { useEffect } from "react";
import {
  activitiesSelector,
  fetchAllActivities,
  retrievingStateSelector,
  RetrieveState,
} from "../activities/activitiesSlice";
import Activity from "../types/activity/activity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../activities/activitiesStore";
import "./TableActivities.css";
import MessageError from "../components/MessageError/MessageError";
import Loading from "../components/Loading/Loading";

const TableActivities: React.FC = (): JSX.Element => {
  const activities: Array<Activity> = useSelector<RootState, Array<Activity>>(
    activitiesSelector
  );

  const retrievingState: RetrieveState = useSelector<RootState, RetrieveState>(
    retrievingStateSelector
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);

  const generateBodyTable = (activities: Array<Activity>): JSX.Element[] => {
    return activities.map(
      (activity: Activity): JSX.Element => {
        return (
          <tr key={activity.id}>
            <td>{activity.id}</td>
            <td>{activity.name}</td>
            <td>{activity.description}</td>
            <td>{activity.status.toString()}</td>
          </tr>
        );
      }
    );
  };

  if (retrievingState === RetrieveState.Loaded) {
    return (
      <table data-testid="table-activities">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          {generateBodyTable(activities)}
        </tbody>
      </table>
    );
  } else if (retrievingState === RetrieveState.Loading) {
    return <Loading />;
  }
  return <MessageError size="medium">Activities not retrieved!</MessageError>;
};

export default TableActivities;
