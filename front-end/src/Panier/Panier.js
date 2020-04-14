import React, { useEffect, useState } from "react";
import { Container, Button, Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  actions: {
    display: "flex",
  },
  expand: {
    marginLeft: "auto",
  },
}));

export default function Panier() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const supprimerItem = (_id) => {
    if (localStorage.getItem("jwt-cookie")) {
      axios
        .post(
          "http://localhost:4000/clients/supprimerpanier",
          { _id },
          {
            headers: {
              Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
            },
          }
        )
        .then(() => setItems(items.filter((item) => item._id !== _id)));
    }
    if (localStorage.getItem("cart-cookie")) {
      let data = JSON.parse(localStorage.getItem("cart-cookie"));
      data = data.filter((d) => _id !== d._id);
      if (data.length === 0) localStorage.removeItem("cart-cookie");
      else localStorage.setItem("cart-cookie", JSON.stringify(data));
      setItems(items.filter((item) => item._id !== _id));
    }
  };
  const panierVide = () => {
    return (
      <Paper className={classes.paper}>
        <Typography>Panier Vide</Typography>
      </Paper>
    );
  };
  const affichage = () => {
    return (
      <Grid container spacing={1} direction="column">
        {items.map((i) => (
          <Grid item>
            <Paper className={classes.paper}>
              <Typography>{i.nom}</Typography>
              <Typography>{i.quantite}</Typography>
              <Typography>{i.prix}DT</Typography>
              <Button
                onClick={() => supprimerItem(i._id)}
                className={classes.expand}
              >
                Supprimer
              </Button>
            </Paper>
          </Grid>
        ))}
        <Grid className={classes.actions} item>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.expand}
          >
            Commander
          </Button>
        </Grid>
      </Grid>
    );
  };
  useEffect(() => {
    if (localStorage.getItem("jwt-cookie")) {
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
                    _id: d._id,
                    nom: resultat.data.nom,
                    quantite: d.quantite,
                    prix: resultat.data.prix,
                  },
                ])
              );
          });
        });
    } else if (localStorage.getItem("cart-cookie")) {
      const resultat = JSON.parse(localStorage.getItem("cart-cookie"));
      resultat.forEach((d) => {
        axios
          .get("http://localhost:4000/articles/recherche/" + d._id)
          .then((resultat) =>
            setItems((items) => [
              ...items,
              {
                _id: d._id,
                nom: resultat.data.nom,
                quantite: d.quantite,
                prix: resultat.data.prix,
              },
            ])
          );
      });
    }
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
        {items.length === 0 ? panierVide() : affichage()}
      </form>
    </Container>
  );
}
