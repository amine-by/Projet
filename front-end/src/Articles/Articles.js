import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Articles() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  const refreshRows = () => {
    axios
      .post("http://localhost:4000/articles/recherche", {})
      .then((resultat) => {
        setRows(resultat.data);
      });
  };

  useEffect(() => {
    refreshRows();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Quantité</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.nom}</TableCell>
              <TableCell>{row.prix}</TableCell>
              <TableCell>{row.quantite}</TableCell>
              <TableCell>{row.cree}</TableCell>
              <TableCell align="center">
                <Button color="primary" onClick={() => {}}>
                  Modifier
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    axios
                      .post(
                        "http://localhost:4000/articles/supprimer",
                        {
                          _id: row._id,
                        },
                        {
                          headers: {
                            Authorization:
                              "bearer " + localStorage.getItem("jwt-cookie"),
                          },
                        }
                      )
                      .then(() => {
                        setRows([]);
                        refreshRows();
                      });
                  }}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
