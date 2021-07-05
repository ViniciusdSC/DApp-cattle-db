import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import CattleHome from 'cattle/pages/Home';
import CattleCreate from 'cattle/pages/Create';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/cattle">
          <CattleHome />
        </Route>
        <Route exact path="/cattle/create">
          <CattleCreate />
        </Route>

        <Redirect to="/cattle" />
      </Switch>
    </Router>
  )
}

export default Routes;