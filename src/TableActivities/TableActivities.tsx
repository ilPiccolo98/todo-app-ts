import React from "react";
import { activitiesSelector } from "../activitiesWithFunctions/activitiesSlice";
import { Activity } from "../activities/initialActivities";
import { useSelector } from "react-redux";
import { RootState } from "../activities/activitiesStore";
import "./TableActivities.css";

const TableActivities: React.FC = (): JSX.Element => {
  const activities: Array<Activity> = useSelector<RootState, Array<Activity>>(
    activitiesSelector
  );
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
};

export default TableActivities;
