import React, { useEffect } from "react";
import {
  Container,
  Button,
  CardActions,
  Card,
  CardContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Panier() {
  const classes = useStyles();

  useEffect(() => {}, []);
  const handleSubmit = event => {
    event.preventDefault();
    if (!localStorage.getItem("jwt-cookie")) {
      window.location = "/Connexion";
    }
  };

  return (
    <Container component="main">
      <form onSubmit={handleSubmit} noValidate>
        <Card>
          <CardContent></CardContent>
          <CardActions>
            <Button size="small">Supprimer</Button>
          </CardActions>
        </Card>
        <Button variant="contained" color="primary" type="submit">
          Commander
        </Button>
      </form>
    </Container>
  );
}
