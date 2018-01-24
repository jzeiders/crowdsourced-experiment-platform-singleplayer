import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GameRoute from "./routes/game";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact={true} component={GameRoute} />
        </div>
      </Router>
    );
  }
}
