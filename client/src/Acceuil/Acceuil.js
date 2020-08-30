import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  GridList,
  Paper,
  Link,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 2, 2, 0),
    width: 200,
  },
  formControlItem: {
    margin: theme.spacing(1),
  },
  Box: {
    margin: theme.spacing(1),
    width: 200,
  },
  Text: {
    margin: theme.spacing(0, 1),
    textAlign: "center",
  },
  image: {
    maxWidth: 195,
    height: 125,
    display: "block",
    margin: "auto",
  },
}));

export default function Acceuil() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [prix, setPrix] = useState("");
  const [categories, setCategories] = useState([{ title: "Tout" }]);
  const [categorie, setCategorie] = useState("Tout");
  const [marque, setMarque] = useState("Tout");
  const [marques, setMarques] = useState([{ title: "Tout" }]);

  useEffect(() => {
    axios.post("/categories/recherche", {}).then((resultat) => {
      resultat.data.forEach((d) =>
        setCategories((categorie) => [...categorie, { title: d.nom }])
      );
    });
    axios
      .post("/marques/recherche", {})
      .then((resultat) => {
        resultat.data.forEach((d) =>
          setMarques((marque) => [...marque, { title: d.nom }])
        );
      });
  }, []);

  useEffect(() => {
    axios
      .post("/articles/recherche", {
        prix,
        categorie,
        marque,
      })
      .then((resultat) => {
        resultat.data.map((r) => {
          return (r.image =
            "data:image/jpeg;base64," +
            new Buffer(r.image.data.data).toString("base64"));
        });
        setData(resultat.data);
      });
  }, [prix, categorie, marque]);

  return (
    <Grid container direction="row">
      <Grid item driection="column">
        <FormControl className={classes.formControl}>
          <div className={classes.formControlItem}>
            <FormLabel>Prix</FormLabel>
            <RadioGroup
              defaultValue={"Tout"}
              onChange={(e) => {
                setPrix(e.target.value);
              }}
            >
              <FormControlLabel value="Tout" control={<Radio />} label="Tout" />
              <FormControlLabel
                value="de 0 à 25"
                control={<Radio />}
                label="de 0 à 25"
              />
              <FormControlLabel
                value="de 25 à 50"
                control={<Radio />}
                label="de 25 à 50"
              />
              <FormControlLabel
                value="de 50 à 100"
                control={<Radio />}
                label="de 50 à 100"
              />
              <FormControlLabel
                value="plus que 100"
                control={<Radio />}
                label="plus que 100"
              />
            </RadioGroup>
          </div>
          <div className={classes.formControlItem}>
            <FormLabel>Catégorie</FormLabel>
            <Autocomplete
              defaultValue={{ title: categorie }}
              id="categorie"
              disableClearable="true"
              onInputChange={(event, value) => setCategorie(value)}
              options={categories}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} margin="normal" variant="outlined" />
              )}
            />
          </div>
          <div className={classes.formControlItem}>
            <FormLabel>Marque</FormLabel>
            <Autocomplete
              id="marque"
              disableClearable="true"
              onInputChange={(event, value) => setMarque(value)}
              defaultValue={{ title: marque }}
              options={marques}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} margin="normal" variant="outlined" />
              )}
            />
          </div>
        </FormControl>
      </Grid>
      <Grid item className={classes.formControl} xs={true}>
        <GridList cols={false}>
          {data.map((d) => (
            <Paper className={classes.Box}>
              <img alt={d.nom} src={d.image} className={classes.image}></img>
              <Typography className={classes.Text} noWrap="true">
                <Link href={"/Article/" + d._id}> {d.nom} </Link>
              </Typography>
              <Typography
                color="secondary"
                variant="h6"
                className={classes.Text}
                noWrap="true"
              >
                {d.prix} DT
              </Typography>
            </Paper>
          ))}
        </GridList>
      </Grid>
    </Grid>
  );
}
