import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import {
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  formcontrol: {
    margin: theme.spacing(1),
  },
}));

export default function Clients(props) {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [type, setType] = useState("");
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  const tableHeadActions = () => {
    if (props.type === "administrateur")
      return <TableCell align="center">Actions</TableCell>;
  };

  const tableBodyActions = (row) => {
    if (props.type === "administrateur")
      return (
        <TableCell align="center">
          <Button
            color="primary"
            onClick={() => {
              setOpen(true);
              setId(row._id);
              setNom(row.nom);
              setPrenom(row.prenom);
              setEmail(row.email);
              setTelephone(row.telephone);
              setType((t) =>
                row.administrateur
                  ? "Administrateur"
                  : row.moderateur
                  ? "Moderateur"
                  : "Client"
              );
            }}
          >
            Modifier
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              axios
                .post(
                  "http://localhost:4000/clients/supprimerclient",
                  { _id: row._id },
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
      );
  };

  const refreshRows = () => {
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
              telephone: r.telephone,
              cree: r.cree,
              administrateur: r.administrateur,
              moderateur: r.moderateur,
            },
          ]);
        });
      });
  };

  useEffect(() => {
    refreshRows();
  }, []);

  const classes = useStyles();

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
        <DialogTitle id="form-dialog-title">Modifier</DialogTitle>
        <DialogContent>
          <TextField
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nom"
            label="Nom"
            name="nom"
            autoComplete="nom"
          />
          <TextField
            value={prenom}
            onChange={(event) => setPrenom(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="prenom"
            label="Prénom"
            name="prenom"
            autoComplete="prenom"
          />
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="telephone"
            label="Téléphone"
            name="telephone"
            autoComplete="telephone"
          />
          <FormControl className={classes.formcontrol}>
            <FormLabel>Type</FormLabel>
            <RadioGroup
              row
              defaultValue={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <FormControlLabel
                value="Administrateur"
                control={<Radio />}
                label="Administrateur"
              />
              <FormControlLabel
                value="Moderateur"
                control={<Radio />}
                label="Moderateur"
              />
              <FormControlLabel
                value="Client"
                control={<Radio />}
                label="Client"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              axios
                .post(
                  "http://localhost:4000/clients/modifierclient",
                  {
                    _id: id,
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    telephone: telephone,
                    administrateur: type === "Administrateur",
                    moderateur:
                      type === "Administrateur" || type === "Moderateur",
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prenom</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date de création</TableCell>
              {tableHeadActions()}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.nom}</TableCell>
                <TableCell>{row.prenom}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.telephone}</TableCell>
                <TableCell>
                  {row.administrateur ? (
                    <div>Administrateur</div>
                  ) : row.moderateur ? (
                    <div>Moderateur</div>
                  ) : (
                    <div>Client</div>
                  )}
                </TableCell>
                <TableCell>{row.cree}</TableCell>
                {tableBodyActions(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
