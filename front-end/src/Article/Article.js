import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  spacing: {
    marginTop: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    maxWidth: 250,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    maxWidth: 1000,
    maxHeight: 500,
    marginTop: theme.spacing(4),
  },
}));

export default function Article() {
  const classes = useStyles();

  const [data, setData] = useState("");
  const [quantites, setQuantites] = useState([]);
  const [alert, setAlert] = useState("");
  const [quantite, setQuantite] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (quantite === "") {
      setAlert(() => (
        <Alert severity="error">Veuillez choisir la quantité</Alert>
      ));
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } else {
      if (localStorage.getItem("jwt-cookie")) {
        const array = [];
        array.push({ _id: data._id, quantite: parseInt(quantite) });
        axios.post("http://localhost:4000/clients/majpanier", array, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
          },
        });
      } else {
        if (localStorage.getItem("cart-cookie")) {
          const array = JSON.parse(localStorage.getItem("cart-cookie"));
          let i = 0;
          let c = false;
          while (i !== array.length && c === false) {
            if (array[i]._id === data._id) {
              array[i].quantite += parseInt(quantite);
              c = true;
            } else {
              i++;
            }
          }
          if (i === array.length) {
            array.push({ _id: data._id, quantite: parseInt(quantite) });
          }

          localStorage.setItem("cart-cookie", JSON.stringify(array));
        } else {
          const array = [];
          array.push({ _id: data._id, quantite: parseInt(quantite) });
          localStorage.setItem("cart-cookie", JSON.stringify(array));
        }
      }
      window.location = "/Panier";
    }
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/articles/recherche/" +
          window.location.pathname.substring(9, window.location.pathname.length)
      )
      .then((resultat) => {
        resultat.data.image =
          "data:image/jpeg;base64," +
          new Buffer(resultat.data.image.data.data).toString("base64");
        setData(resultat.data);
        if (resultat.data.quantite)
          for (let i = 1; i <= resultat.data.quantite; i++) {
            setQuantites((quantites) => [
              ...quantites,
              {
                title: i.toString(),
              },
            ]);
          }
      });
  }, []);

  const Couleur = () => {
    if (data.couleur !== "")
      return (
        <Typography variant="h6" className={classes.spacing}>
          Couleur: {data.couleur}
        </Typography>
      );
  };

  const Taille = () => {
    if (data.taille !== "")
      return (
        <Typography variant="h6" className={classes.spacing}>
          Taille: {data.taille}
        </Typography>
      );
  };

  const Description = () => {
    if (data.description !== "")
      return (
        <Typography variant="body2" className={classes.spacing}>
          {data.description}
        </Typography>
      );
  };

  const Quantite = () => {
    if (quantites.length > 0) {
      return (
        <div>
          <Autocomplete
            className={classes.spacing}
            id="combo-box-demo"
            disableClearable="true"
            onInputChange={(event, value) => setQuantite(value)}
            options={quantites}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="quantité" variant="outlined" />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            fullWidth
          >
            Ajouter au panier
          </Button>
        </div>
      );
    } else
      return (
        <Typography variant="h6" color="secondary" >
          Non Disponible
        </Typography>
      );
  };

  return (
    <Grid container direction="row">
      <Grid item>
        <img alt={data.nom} src={data.image} className={classes.image}></img>
      </Grid>
      <Grid item>
        <div className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Typography variant="h5" className={classes.spacing}>
              {data.nom}
            </Typography>
            <Typography
              variant="h4"
              color="secondary"
              className={classes.spacing}
            >
              {data.prix} DT
            </Typography>
            {Couleur()}
            {Taille()}
            {Description()}
            {alert}
            {Quantite()}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
