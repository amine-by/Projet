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
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3,3,0,1),
  },
  Box: {
    margin: theme.spacing(1),
    width: 200,
  },
  Text: {
    margin: theme.spacing(0, 1),
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    height: 170,
  },
}));

export default function Articles() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const handleData = (value) => {
    axios
      .post("http://localhost:4000/articles/recherche", {
        prix: value,
      })
      .then((resultat) => {
        setData(resultat.data);
      });
  };

  useEffect(() => {
    handleData("Tout");
  }, []);

  return (
    <div>
      <Button color="primary">
        Ajouter Article
      </Button>
      <Grid container direction="row">
        <Grid item driection="column" className={classes.formControl}>
          <FormControl>
            <FormLabel>Prix</FormLabel>
            <RadioGroup
              defaultValue={"Tout"}
              onChange={(e) => {
                handleData(e.target.value);
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
          </FormControl>
        </Grid>
        <Grid item className={classes.formControl} xs={true}>
          <GridList cols={1} spacing={1}>
            {data.map((i) => (
              <Grid item>
                <Paper className={classes.paper}>
                  <Typography>{i.nom}</Typography>
                  <Typography>{i.prix}DT</Typography>
                </Paper>
              </Grid>
            ))}
          </GridList>
        </Grid>
      </Grid>
    </div>
  );
}
