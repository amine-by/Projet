import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ClientRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("jwt-cookie")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}
