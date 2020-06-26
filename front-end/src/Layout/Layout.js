import React from "react";
import clsx from "clsx";
import { Route, Switch } from "react-router-dom";
import Historique from "../Historique/Historique";
import Compte from "../Compte/Compte";
import Acceuil from "../Acceuil/Acceuil";
import Inscription from "../Inscription/Inscription";
import Connexion from "../Connexion/Connexion";
import Panier from "../Panier/Panier";
import Article from "../Article/Article";
import Articles from "../Articles/Articles";
import Commandes from "../Commandes/Commandes";
import Categories from "../Categories/Categories";
import Marques from "../Marques/Marques";
import Clients from "../Clients/Clients";
import ClientRoute from "../ClientRoute/ClientRoute";
import VisiteurRoute from "../VisiteurRoute/VisiteurRoute";
import ModerateurRoute from "../ModerateurRoute/ModerateurRoute";
import Erreur from "../Erreur/Erreur";

export default function Layout(props) {
  return (
    <main
      className={clsx(props.classes.content, {
        [props.classes.contentShift]: props.open,
      })}
    >
      <Switch>
        <ModerateurRoute path="/Commandes" component={Commandes} />
        <ModerateurRoute path="/Articles" component={Articles} />
        <ModerateurRoute path="/Categories" component={Categories} />
        <ModerateurRoute path="/Marques" component={Marques} />
        <ModerateurRoute
          path="/Clients"
          component={Clients}
          type={props.type}
        />
        <ClientRoute path="/Historique" component={Historique} />
        <ClientRoute path="/Compte" component={Compte} />
        <VisiteurRoute path="/Inscription" component={Inscription} />
        <VisiteurRoute path="/Connexion" component={Connexion} />
        <Route exact path="/" component={Acceuil} />
        <Route path="/Panier" component={Panier} />
        <Route path="/Article/:id" component={Article} />
        <Route path="*" component={Erreur} />
      </Switch>
    </main>
  );
}
