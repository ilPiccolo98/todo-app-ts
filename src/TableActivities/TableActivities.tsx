import React from "react";
import { activitiesSelector } from "../activities/activitiesSlice";
import Activity from "../types/classes/activity";
import { useSelector } from "react-redux";
import { RootState } from "../activities/activitiesStore";

const TableActivities = (): JSX.Element => {
  const activities: Array<Activity> = useSelector<RootState, Array<Activity>>(
    activitiesSelector
  );
  const generateBodyTable = (activities: Array<Activity>): JSX.Element[] => {
    return activities.map((activity: Activity): JSX.Element => {
      return (
        <tr key={activity.Id}>
          <td>{activity.Id}</td>
          <td>{activity.Name}</td>
          <td>{activity.Description}</td>
          <td>{activity.Status.toString()}</td>
        </tr>
      );
    });
  };

  return (
    <table>
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
