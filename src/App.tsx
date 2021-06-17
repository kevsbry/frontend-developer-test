import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { HomePage, DevicesPage } from "./pages";
import { PrivateRoute, PublicRoute } from "./components";
import { Provider } from "react-redux";
import { store } from "./global-states";

function App() {
  return (
    <Router>
      <Switch>
        <Provider store={store}>
          <PublicRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/devices" component={DevicesPage} />
        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
