import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Clients() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/clients/getclients",
        {},
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
          },
        }
      )
      .then((resultat) => {
        resultat.data.forEach((r) => {
          setRows((rows) => [
            ...rows,
            {
              _id: r._id,
              nom: r.nom,
              prenom: r.prenom,
              email: r.email,
              cree: r.cree,
            },
          ]);
        });
      });
  }, []);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prenom</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.nom}</TableCell>
              <TableCell>{row.prenom}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.cree}</TableCell>
              <TableCell align="center">
                <Button color="primary">Modifier</Button>
                <Button color="secondary">Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
