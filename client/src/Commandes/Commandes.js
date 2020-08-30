import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btnSpacing: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}));

export default function Commandes() {
  const classes = useStyles();
  const [etat, setEtat] = useState("en Attente");
  const [data, setData] = useState([]);

  const Buttons = (d) => {
    switch (etat) {
      case "en Attente":
        return (
          <TableCell align="center">
            <Button
              color="primary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/changeretat",
                    { _id: d._id, etat: "Confirmé" },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then((resultat) => {
                    setEtat("Confirmé");
                  });
              }}
            >
              Confirmer
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/changeretat",
                    { _id: d._id, etat: "Annulé" },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then((resultat) => {
                    setEtat("Annulé");
                  });
              }}
            >
              Annuler
            </Button>
          </TableCell>
        );
      case "Confirmé":
        return (
          <TableCell align="center">
            <Button
              color="primary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/changeretat",
                    { _id: d._id, etat: "Livré" },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then((resultat) => {
                    setEtat("Livré");
                  });
              }}
            >
              Livré
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/changeretat",
                    { _id: d._id, etat: "Annulé" },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then(() => {
                    setEtat("Annulé");
                  });
              }}
            >
              Annuler
            </Button>
          </TableCell>
        );
      case "Annulé":
        return (
          <TableCell align="center">
            <Button
              color="primary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/changeretat",
                    { _id: d._id, etat: "Confirmé" },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then(() => {
                    setEtat("Confirmé");
                  });
              }}
            >
              Confirmer
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/supprimer",
                    { _id: d._id },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then(() => {
                    setEtat("en Attente");
                  });
              }}
            >
              Supprimer
            </Button>
          </TableCell>
        );
      case "Livré":
        return (
          <TableCell align="center">
            <Button
              color="secondary"
              onClick={() => {
                axios
                  .post(
                    "/commandes/supprimer",
                    { _id: d._id },
                    {
                      headers: {
                        Authorization:
                          "bearer " + localStorage.getItem("jwt-cookie"),
                      },
                    }
                  )
                  .then(() => {
                    setEtat("en Attente");
                  });
              }}
            >
              Supprimer
            </Button>
          </TableCell>
        );
      default:
        return <div></div>;
    }
  };

  useEffect(() => {
    setData([]);
    axios
      .post(
        "/commandes/recherche",
        { etat },
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
          },
        }
      )
      .then((resultat) => {
        resultat.data.forEach((r) => {
          setData((d) => [
            ...d,
            {
              _id: r._id,
              adresse: r.adresse,
              client: r.client,
              liste: r.liste,
              prix: r.prix,
              etat: r.etat,
              cree: r.cree,
            },
          ]);
        });
      });
  }, [etat]);
  return (
    <div>
      <Button
        color="primary"
        className={classes.btnSpacing}
        onClick={() => {
          setEtat("en Attente");
        }}
      >
        en Attente
      </Button>
      <Button
        color="primary"
        className={classes.btnSpacing}
        onClick={() => {
          setEtat("Confirmé");
        }}
      >
        Confirmés
      </Button>
      <Button
        color="primary"
        className={classes.btnSpacing}
        onClick={() => {
          setEtat("Annulé");
        }}
      >
        Annulés
      </Button>
      <Button
        color="primary"
        className={classes.btnSpacing}
        onClick={() => {
          setEtat("Livré");
        }}
      >
        Livrés
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Client</TableCell>
              <TableCell align="left">Liste des Articles</TableCell>
              <TableCell align="left">PrixTotal</TableCell>
              <TableCell align="left">Adresse</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Etat</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow>
                <TableCell align="left">
                  <div>ID: {d.client._id}</div>
                  <div>Nom: {d.client.nom}</div>
                  <div>Prénom: {d.client.prenom}</div>
                  <div>E-mail: {d.client.email}</div>
                  <div>Téléphone: {d.client.telephone}</div>
                </TableCell>
                <TableCell align="left">
                  {d.liste.map((l) => (
                    <div>
                      {l.nom} x{l.quantite} : {l.prix} DT
                    </div>
                  ))}
                </TableCell>
                <TableCell align="left">{d.prix} DT</TableCell>
                <TableCell align="left">{d.adresse}</TableCell>
                <TableCell align="left">{d.cree}</TableCell>
                <TableCell align="left">{d.etat}</TableCell>
                {Buttons(d)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
