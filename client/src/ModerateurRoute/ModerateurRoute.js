import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

export default function ModerateurRoute({ component: Component, ...rest }) {
  const [type, setType] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("jwt-cookie")) {
      setType("visiteur");
    }
    axios
      .post(
        "/clients/type",
        {},
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
          },
        }
      )
      .then((resultat) => {
        setType(resultat.data);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (type === "administrateur" || type === "moderateur") {
          return <Component {...props} type={type} />;
        } else if (type === "client") {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else if (type === "visiteur") {
          return (
            <Redirect
              to={{ pathname: "/Connexion", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
