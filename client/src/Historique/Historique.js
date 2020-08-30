import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btnSpacing: {
    margin: theme.spacing(0, 2, 2, 2),
  },
}));

export default function Historique() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    axios
      .post(
        "/commandes/historique",
        {},
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
              liste: r.liste,
              adresse: r.adresse,
              prix: r.prix,
              etat: r.etat,
              cree: r.cree,
            },
          ]);
        });
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography color="primary">Liste des Articles</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="primary">PrixTotal</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="primary">Adresse</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="primary">Date</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="primary">Etat</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
