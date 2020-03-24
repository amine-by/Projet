import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { indigo } from "@material-ui/core/colors";
import ClientRoute from "./ClientRoute/ClientRoute";
import VisiteurRoute from "./VisiteurRoute/VisiteurRoute";
import NavBar from "./NavBar/NavBar";
import Historique from "./Historique/Historique";
import Compte from "./Compte/Compte";
import Acceuil from "./Acceuil/Acceuil";
import Inscription from "./Inscription/Inscription";
import Connexion from "./Connexion/Connexion";
import Panier from "./Panier/Panier";
import Article from "./Article/Article";
import Erreur from "./Erreur/Erreur";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500]
    }
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Acceuil} />
          <ClientRoute path="/Historique" component={Historique} />
          <ClientRoute path="/Compte" component={Compte} />
          <VisiteurRoute path="/Inscription" component={Inscription} />
          <VisiteurRoute path="/Connexion" component={Connexion} />
          <Route path="/Panier" component={Panier} />
          <Route path="/Article/:id" component={Article} />
          <Route path="*" component={Erreur} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
