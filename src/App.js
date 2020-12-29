import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import List from "./components/List";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/add" component={CreateUser} />
          <Route path="/edit" component={EditUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
