import React, { useEffect, useState } from "react";
import {
  TextField,
  Container,
  Button,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 750,
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    maxHeight: 100,
    maxWidth: 100,
  },
  table: {
    maxWidth: 750,
    margin: "auto",
  },
}));

export default function Panier() {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [adresse, setAdresse] = useState("");
  const [open, setOpen] = useState(false);

  const refreshItems = () => {
    setItems([]);
    setTotal(0);
    if (localStorage.getItem("jwt-cookie")) {
      axios
        .post(
          "/clients/getpanier",
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
              .get("/articles/recherche/" + d._id)
              .then((resultat) => {
                resultat.data.image =
                  "data:image/jpeg;base64," +
                  new Buffer(resultat.data.image.data.data).toString("base64");
                setItems((items) => [
                  ...items,
                  {
                    _id: d._id,
                    nom: resultat.data.nom,
                    quantite: d.quantite,
                    prix: resultat.data.prix,
                    image: resultat.data.image,
                  },
                ]);
                setTotal((t) => t + resultat.data.prix * d.quantite);
              });
          });
        });
    } else if (localStorage.getItem("cart-cookie")) {
      const resultat = JSON.parse(localStorage.getItem("cart-cookie"));
      resultat.forEach((d) => {
        axios
          .get("/articles/recherche/" + d._id)
          .then((resultat) => {
            resultat.data.image =
              "data:image/jpeg;base64," +
              new Buffer(resultat.data.image.data.data).toString("base64");
            setItems((items) => [
              ...items,
              {
                _id: d._id,
                nom: resultat.data.nom,
                quantite: d.quantite,
                prix: resultat.data.prix,
                image: resultat.data.image,
              },
            ]);
            setTotal((t) => t + resultat.data.prix * d.quantite);
          });
      });
    }
  };

  const supprimerItem = (_id) => {
    if (localStorage.getItem("jwt-cookie")) {
      axios
        .post(
          "/clients/supprimerpanier",
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
      <div>
        <Dialog
          open={open}
          fullWidth
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Lancement Commande</DialogTitle>
          <DialogContent>
            <TextField
              value={adresse}
              multiline="true"
              onChange={(event) => {
                setAdresse(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="adresse"
              label="Adresse"
              name="adresse"
              autoComplete="adresse"
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/ajouter",
                    {
                      adresse,
                    },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then((resultat) => {
                    if (resultat.data === "Commande ajouté")
                      window.location = "/Historique";
                  });
              }}
            >
              Confirmer
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography color="primary" component="h1">
                    Panier
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow>
                  <TableCell align="center">
                    <img
                      alt={item.nom}
                      src={item.image}
                      className={classes.image}
                    ></img>
                  </TableCell>
                  <TableCell align="center">{item.nom}</TableCell>
                  <TableCell align="center">{item.prix} DT</TableCell>
                  <TableCell align="center">x{item.quantite}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="secondary"
                      onClick={() => {
                        supprimerItem(item._id);
                      }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align="left">
                  <Typography>
                    Total:
                    {total} DT
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button color="primary" type="submit" variant="contained">
                    Commander
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  useEffect(() => {
    refreshItems();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!localStorage.getItem("jwt-cookie")) {
      window.location = "/Connexion";
    } else {
      setOpen(true);
    }
  };

  return (
    <Container component="main">
      <form onSubmit={handleSubmit} noValidate>
        {items.length === 0 ? panierVide() : affichage()}
      </form>
    </Container>
  );
}
