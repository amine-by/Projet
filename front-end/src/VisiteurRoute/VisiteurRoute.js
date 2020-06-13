import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

export default function VisiteurRoute({ component: Component, ...rest }) {
  const [type, setType] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("jwt-cookie")) {
      setType("visiteur");
    }
    axios
      .post(
        "http://localhost:4000/clients/type",
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
        if (type === "visiteur") {
          return <Component {...props} />;
        } else if (
          type === "administrateur" ||
          type === "moderateur" ||
          type === "client"
        ) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}
