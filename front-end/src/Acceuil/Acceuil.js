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
  Box,
  Link
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  },
  Box: {
    margin: theme.spacing(1),
    width: 200
  },
  Text: {
    margin: theme.spacing(0, 1),
    textAlign: "center"
  }
}));

export default function Acceuil() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const handleData = value => {
    axios
      .post("http://localhost:4000/articles/recherche", {
        prix: value
      })
      .then(resultat => {
        setData(resultat.data);
      });
  };

  useEffect(() => {
    handleData("Tout");
  }, []);

  return (
    <Grid container direction="row">
      <Grid item driection="column" className={classes.formControl}>
        <FormControl>
          <FormLabel>Prix</FormLabel>
          <RadioGroup
            defaultValue={"Tout"}
            onChange={e => {
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
        <GridList cols={false}>
          {data.map(d => (
            <Box
              borderColor="grey.500"
              borderRadius="2%"
              border={1}
              className={classes.Box}
            >
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
            </Box>
          ))}
        </GridList>
      </Grid>
    </Grid>
  );
}
