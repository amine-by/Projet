const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Commande = require("../models/commande.model");
const Client = require("../models/client.model");
const Article = require("../models/article.model");
const verifcationJWT = require("../verification/verification");

router.post("/changeretat", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      Client.findOne({ _id: data._id }, { _id: 0, moderateur: 1 }).then(
        (utilisateur) => {
          if (utilisateur.moderateur) {
            Commande.updateOne(
              { _id: request.body._id },
              { $set: { etat: request.body.etat } }
            ).then(() => response.send("succés"));
          } else response.sendStatus(403);
        }
      );
    }
  });
});

router.post("/supprimer", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      Client.findOne({ _id: data._id }, { _id: 0, moderateur: 1 }).then(
        (utilisateur) => {
          if (utilisateur.moderateur) {
            Commande.deleteOne({ _id: request.body._id }).then(() =>
              response.send("succés suppression")
            );
          } else response.sendStatus(403);
        }
      );
    }
  });
});

router.post("/historique", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      Commande.find({})
        .then((resultat) => {
          resultat.forEach((r) => {
            if (data._id === r.client._id.toString())
              return {
                liste: r.liste,
                etat: r.etat,
                prix: r.prix,
                adresse: r.adresse,
                cree: r.cree,
              };
          });
          response.send(resultat);
        })
        .catch(() => response.sendStatus(403));
    }
  });
});

router.post("/recherche", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      Client.findOne({ _id: data._id }, { _id: 0, moderateur: 1 }).then(
        (utilisateur) => {
          if (utilisateur.moderateur)
            Commande.find({ etat: request.body.etat }).then((resultat) =>
              response.send(resultat)
            );
          else response.sendStatus(403);
        }
      );
    }
  });
});

router.post("/ajouter", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      let panierModifie = false;
      const adresse = request.body.adresse;
      if (adresse !== "" && adresse !== undefined)
        Client.findOne(
          { _id: data._id },
          { panier: 1, nom: 1, prenom: 1, email: 1, telephone: 1 }
        )
          .then(async (client) => {
            client.panier.map((p) => {
              Article.findOne(
                {
                  _id: p._id,
                },
                { _id: 0, quantite: 1, prix: 1, nom: 1 }
              ).then(async (a) => {
                if (p.quantite <= a.quantite) {
                  if (p.quantite === 0) {
                    if (panierModifie === false) panierModifie = true;
                    await Client.updateOne(
                      { _id: client.id },
                      { $pull: { panier: { _id: p._id } } }
                    );
                  } else {
                    await Article.updateOne(
                      { _id: p._id },
                      { $inc: { quantite: -p.quantite } }
                    );
                  }
                } else {
                  if (panierModifie === false) panierModifie = true;
                  if (a.quantite === 0)
                    await Client.updateOne(
                      { _id: client.id },
                      { $pull: { panier: { _id: p._id } } }
                    );
                  else {
                    await Client.updateOne(
                      { _id: client._id, "panier._id": p._id },
                      { $set: { "panier.$.quantite": a.quantite } }
                    );
                  }
                }
              });
            });
            if (panierModifie === false) {
              const ids = client.panier.map((p) => p._id);
              const articles = await Article.find(
                { _id: { $in: ids } },
                { nom: 1, prix: 1 }
              );
              let liste = [];
              articles.forEach((a) =>
                client.panier.forEach((p) => {
                  if (p._id === a._id.toString())
                    liste.push({
                      _id: p._id,
                      nom: a.nom,
                      prix: a.prix,
                      quantite: p.quantite,
                    });
                })
              );
              let prix = 0;
              liste.forEach((l) => (prix += l.prix * l.quantite));
              const newCommande = new Commande({
                adresse,
                client: {
                  _id: client._id,
                  nom: client.nom,
                  prenom: client.prenom,
                  telephone: client.telephone,
                  email: client.email,
                },
                liste,
                prix,
              });

              newCommande
                .save()
                .then(() => response.json("Commande ajouté"))
                .catch((erreur) => response.json("Erreur " + erreur));
            } else {
              response.json(
                "Un des produit n'est pas toujours disponible dans le stock"
              );
            }
          })
          .catch((erreur) => response.json(erreur));
      else response.send("Adresse n'existe pas");
    }
  });
});

module.exports = router;
