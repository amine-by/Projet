import React from "react";
import clsx from "clsx"
import { Route, Switch } from "react-router-dom";
import Historique from "../Historique/Historique";
import Compte from "../Compte/Compte";
import Acceuil from "../Acceuil/Acceuil";
import Inscription from "../Inscription/Inscription";
import Connexion from "../Connexion/Connexion";
import Panier from "../Panier/Panier";
import Article from "../Article/Article";
import Articles from "../Articles/Articles";
import Clients from "../Clients/Clients"
import ClientRoute from "../ClientRoute/ClientRoute";
import VisiteurRoute from "../VisiteurRoute/VisiteurRoute";
import Erreur from "../Erreur/Erreur";

export default function Layout(props) {
  return (
    <main
      className={clsx(props.classes.content, {
        [props.classes.contentShift]: props.open,
      })}
    >
      <Switch>
        <Route exact path="/" component={Acceuil} />
        <ClientRoute path="/Articles" component={Articles}/>
        <ClientRoute path="/Clients" component={Clients} />
        <ClientRoute path="/Historique" component={Historique} />
        <ClientRoute path="/Compte" component={Compte} />
        <VisiteurRoute path="/Inscription" component={Inscription} />
        <VisiteurRoute path="/Connexion" component={Connexion} />
        <Route path="/Panier" component={Panier} />
        <Route path="/Article/:id" component={Article} />
        <Route path="*" component={Erreur} />
      </Switch>
     </main>
  );
}
