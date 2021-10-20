import React from "react";
import TableActivities from "./TableActivities/TableActivities";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AddActivity from "./AddActivity/AddActivity";
import DeleteActivity from "./DeleteActivity/DeleteActivity";
import UpdateActivity from "./UpdateActivity/UpdateActivity";

function App() {
  return (
    <BrowserRouter>
      <div>
        <TableActivities />
        <div>
          <Link to="/add-activity">
            <button>Add activity</button>
          </Link>
          <Link to="/update-activity">
            <button>Update activity</button>
          </Link>
          <Link to="/delete-activity">
            <button>Delete activity</button>
          </Link>
        </div>
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
    </BrowserRouter>
  );
}

export default App;
