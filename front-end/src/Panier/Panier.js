import React, { useEffect } from "react";
import {
  Container,
  Button,
  CardActions,
  Card,
  CardContent
} from "@material-ui/core";

export default function Panier() {

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
