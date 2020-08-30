import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { LockOutlined } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [passe, setPasse] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "" || passe === "") {
      setAlert(() => (
        <Alert severity="error">Veuillez remplir tous vos coordonnees</Alert>
      ));
      setTimeout(() => {
        setAlert("");
      }, 5000);
    } else {
      axios
        .post("/clients/authentification", {
          email: email,
          passe: passe,
        })
        .then((resultat) => {
          if (!(resultat.data === "Email ou Mot de passe non valide")) {
            localStorage.setItem("jwt-cookie", resultat.data);
          } else {
            setAlert(() => <Alert severity="error">{resultat.data}</Alert>);
            setTimeout(() => {
              setAlert("");
            }, 5000);
          }
        })
        .then(() => {
          if (
            localStorage.getItem("cart-cookie") &&
            localStorage.getItem("jwt-cookie")
          )
            axios.post(
              "http://localhost:4000/clients/majpanier",
              JSON.parse(localStorage.getItem("cart-cookie")),
              {
                headers: {
                  Authorization: "bearer " + localStorage.getItem("jwt-cookie"),
                },
              }
            );
        })
        .then(() => {
          if (localStorage.getItem("jwt-cookie")) {
            localStorage.removeItem("cart-cookie");
            window.location = "/";
          }
        });
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          {alert}
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
            autoFocus
          />
          <TextField
            value={passe}
            onChange={(event) => setPasse(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            Connexion
          </Button>
        </form>
      </div>
    </Container>
  );
}
