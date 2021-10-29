import React from "react";
import TableActivities from "./TableActivities/TableActivities";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AddActivity from "./AddActivity/AddActivity";
import DeleteActivity from "./DeleteActivity/DeleteActivity";
import UpdateActivity from "./UpdateActivity/UpdateActivity";
import "./App.css";
import Button from "./components/Button/Button";

function App() {
  return (
    <BrowserRouter>
      <div className="page-style">
        <TableActivities />
        <div className="group-buttons-style">
          <Link to="/add-activity">
            <Button variant="primary">Add activity</Button>
          </Link>
          <Link to="/update-activity">
            <Button variant="primary">Update activity</Button>
          </Link>
          <Link to="/delete-activity">
            <Button variant="primary">Delete activity</Button>
          </Link>
        </div>
        <div className="form-style">
          <Switch>
            <Route path="/add-activity" exact render={() => <AddActivity />} />
            <Route
              path="/update-activity"
              exact
              render={() => <UpdateActivity />}
            />
            <Route
              path="/delete-activity"
              exact
              render={() => <DeleteActivity />}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
