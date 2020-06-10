import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TextField,
  Button,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btnSpacing: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}));

export default function Marques() {
  const classes = useStyles();
  const [nom, setNom] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const refreshRows = () => {
    axios
      .post("http://localhost:4000/marques/recherche", {})
      .then((resultat) => {
        setRows(resultat.data);
      });
  };

  useEffect(() => {
    refreshRows();
  }, []);
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
        <DialogTitle id="form-dialog-title">Ajouter Marque</DialogTitle>
        <DialogContent>
          <TextField
            value={nom}
            onChange={(event) => {
              setNom(event.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nom"
            label="Nom"
            name="nom"
            autoComplete="nom"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              axios
                .post(
                  "http://localhost:4000/marques/ajouter",
                  {
                    nom: nom,
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
                  setOpen(false);
                  refreshRows();
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
      <Button
        color="primary"
        className={classes.btnSpacing}
        onClick={() => {
          setOpen(true);
        }}
      >
        Ajouter Marque
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.nom}</TableCell>
                <TableCell align="center">
                  <Button
                    color="secondary"
                    onClick={() => {
                      axios
                        .post(
                          "http://localhost:4000/marques/supprimer",
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
    </div>
  );
}