import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Inscription(props) {
  const classes = useStyles();
  const [alert, setAlert] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [passe, setPasse] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    if (nom === "" || prenom === "" || email === "" || passe === "") {
      setAlert(() => (
        <Alert severity="error">Veuillez remplir tous vos coordonnees</Alert>
      ));
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } else {
      axios.post("http://localhost:4000/clients/ajouter", {
        nom: nom,
        prenom: prenom,
        email: email,
        passe: passe
      });
      window.location = "/Connexion";
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          {alert}
          <TextField
            margin="normal"
            autoComplete="nom"
            name="nom"
            id="nom"
            variant="outlined"
            value={nom}
            onChange={event => setNom(event.target.value)}
            required
            fullWidth
            label="Nom"
            autoFocus
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            value={prenom}
            onChange={event => setPrenom(event.target.value)}
            id="prenom"
            label="Prénom"
            name="prenom"
            autoComplete="prenom"
          />

          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={event => setEmail(event.target.value)}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            value={passe}
            onChange={event => setPasse(event.target.value)}
            name="passe"
            label="Mot de passe"
            type="password"
            id="passe"
            autoComplete="passe"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Inscription
          </Button>
        </form>
      </div>
    </Container>
  );
}
