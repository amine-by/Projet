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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  btnSpacing: {
    margin: theme.spacing(0, 1, 1, 0),
  },
}));

export default function Articles() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState("");
  const [marques, setMarques] = useState("");
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");
  const [quantite, setQuantite] = useState("");
  const [description, setDescription] = useState("");
  const [couleur, setCouleur] = useState("");
  const [taille, setTaille] = useState("");
  const [open, setOpen] = useState(false);

  const refreshRows = () => {
    axios
      .post("http://localhost:4000/articles/recherche", {})
      .then((resultat) => {
        setRows(resultat.data);
      });
  };

  useEffect(() => {
    refreshRows();
    axios
      .post("http://localhost:4000/categories/recherche", {})
      .then((resultat) => {
        resultat.data.forEach((d) =>
          setCategories((categorie) => [...categorie, { title: d.nom }])
        );
      });
    axios
      .post("http://localhost:4000/marques/recherche", {})
      .then((resultat) => {
        resultat.data.forEach((d) =>
          setMarques((marque) => [...marque, { title: d.nom }])
        );
      });
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        onClose={() => {
          setOpen(false);
          setId("");
          setNom("");
          setPrix("");
          setDescription("");
          setQuantite("");
          setCouleur("");
          setTaille("");
          setMarque("");
          setCategorie("");
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajouter Article</DialogTitle>
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
          <TextField
            value={prix}
            onChange={(event) => {
              setPrix(event.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="prix"
            label="Prix"
            name="prix"
            autoComplete="prix"
          />
          <TextField
            value={quantite}
            onChange={(event) => {
              setQuantite(event.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="quantite"
            label="Quantite"
            name="quantite"
            autoComplete="quantite"
          />
          <Autocomplete
            className={classes.spacing}
            defaultValue={{ title: categorie }}
            id="categorie"
            onInputChange={(event, value) => setCategorie(value)}
            options={categories}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categorie"
                margin="normal"
                variant="outlined"
              />
            )}
          />
          <Autocomplete
            className={classes.spacing}
            id="categorie"
            onInputChange={(event, value) => setMarque(value)}
            defaultValue={{ title: marque }}
            options={marques}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Marque"
                margin="normal"
                variant="outlined"
              />
            )}
          />
          <TextField
            value={couleur}
            onChange={(event) => {
              setCouleur(event.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="couleur"
            label="Couleur"
            name="couleur"
            autoComplete="couleur"
          />
          <TextField
            value={taille}
            onChange={(event) => {
              setTaille(event.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="taille"
            label="Taille"
            name="taille"
            autoComplete="taille"
          />
          <TextField
            value={description}
            multiline="true"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              if (id === "") {
                axios
                  .post(
                    "http://localhost:4000/articles/ajouter",
                    {
                      nom,
                      prix,
                      couleur,
                      taille,
                      description,
                      quantite,
                      categorie,
                      marque,
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
              } else {
                axios
                  .post(
                    "http://localhost:4000/articles/modifier",
                    {
                      _id: id,
                      nom,
                      prix,
                      couleur,
                      taille,
                      description,
                      quantite,
                      categorie,
                      marque,
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
              }
              setOpen(false);
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
        Ajouter Article
      </Button>
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
                  <Button
                    color="primary"
                    onClick={() => {
                      setOpen(true);
                      setId(row._id);
                      setNom(row.nom);
                      setPrix(row.prix);
                      setDescription(row.description);
                      setQuantite(row.quantite);
                      setCouleur(row.couleur);
                      setTaille(row.taille);
                      setMarque(row.marque);
                      setCategorie(row.categorie);
                    }}
                  >
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
    </div>
  );
}
