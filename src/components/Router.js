import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Auth from "routes/Auth";
import CreateAccount from "routes/CreateAccount";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ userObj, isLoggedIn, refreshUser }) => {
  return (
    <>
      <Router>
        {isLoggedIn && <Navigation />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
              <Redirect from="*" to="/" />
            </>
          )}
        </Switch>
        <Route exact path="/signup">
          <CreateAccount />
        </Route>
        <Redirect from="*" to="/" />
      </Router>
    </>
  );
};

export default AppRouter;
