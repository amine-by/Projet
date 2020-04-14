const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");
const Article = require("../models/article.model");

const verifcationJWT = (request, response, next) => {
  const bearerHeader = request.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    request.token = bearerToken;
    next();
  } else {
    response.sendStatus(403);
  }
};

router.post("/supprimerpanier", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      Client.updateOne(
        { _id: data._id },
        { $pull: { panier: { _id: request.body._id } } }
      ).then(() => response.send("supprimé"))
    }
  });
});

router.post("/getpanier", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      Client.findOne(
        { _id: data._id },
        { _id: 0, panier: 1 }
      ).then((resultat) => response.send(resultat.panier));
    }
  });
});

router.post("/majpanier", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      const id = data._id;
      const localData = request.body;
      Client.findOne({ _id: id }, { _id: 0, panier: 1 })
        .then((client) => {
          localData.map(async (element) => {
            const existeData = await client.panier.find(
              (e) => element._id === e._id
            );
            const article = await Article.findOne(
              { _id: element._id },
              { _id: 0, quantite: 1 }
            );
            if (existeData) {
              if (existeData.quantite + element.quantite >= article.quantite) {
                await Client.updateOne(
                  { _id: id, "panier._id": element._id },
                  { $set: { "panier.$.quantite": article.quantite } }
                );
              } else {
                await Client.updateOne(
                  { _id: id, "panier._id": element._id },
                  { $inc: { "panier.$.quantite": element.quantite } }
                );
              }
            } else {
              if (element.quantite <= article.quantite) {
                await Client.updateOne(
                  { _id: id },
                  { $push: { panier: element } }
                );
              } else {
                await Client.updateOne(
                  { _id: id },
                  {
                    $push: {
                      panier: { _id: element._id, quantite: article.quantite },
                    },
                  }
                );
              }
            }
          });
          response.send("panier mis à jour");
        })
        .catch((erreur) => response.json(erreur));
    }
  });
});

router.route("/authentification").post(async (request, response) => {
  const email = request.body.email;
  const passe = request.body.passe;

  const client = await Client.findOne({ email });
  const passValide = await bcrypt.compareSync(passe, client.passe);

  if (!client || !passValide) {
    return response.send("Email ou Mot de passe non valide");
  } else {
    const token = await jwt.sign({ _id: client._id }, process.env.SECRET);
    response.send(token);
  }
});

router.route("/ajouter").post((request, response) => {
  const nom = request.body.nom;
  const prenom = request.body.prenom;
  const email = request.body.email;
  const passe = request.body.passe;

  const newClient = new Client({
    nom,
    prenom,
    email,
  });

  newClient.passe = newClient.generateHash(passe);

  newClient
    .save()
    .then(() => response.json("Client ajouté"))
    .catch((erreur) => response.json("Erreur " + erreur));
});

module.exports = router;
