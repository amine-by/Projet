import React, { useEffect, useState } from "react";
import { Container, Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
  },
}));

export default function Panier() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/clients/getpanier",
        {},
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
          },
        }
      )
      .then((resultat) => {
        resultat.data.forEach((d) => {
          axios
            .get("http://localhost:4000/articles/recherche/" + d._id)
            .then((resultat) =>
              setItems((items) => [
                ...items,
                {
                  nom: resultat.data.nom,
                  quantite: d.quantite,
                  prix: resultat.data.prix,
                },
              ])
            );
        });
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("jwt-cookie")) {
      window.location = "/Connexion";
    }
  };

  return (
    <Container component="main">
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <Grid container spacing={1} direction="column">
          {items.map((item) => (
            <Grid item xs={12} spacing={3}>
              <Typography>{item.nom}</Typography>
              <Typography>{item.quantite}</Typography>
              <Typography>{item.prix}DT</Typography>
            </Grid>
          ))}
          <Grid item spacing={3}>
            <Button variant="contained" color="primary" type="submit">
              Commander
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
