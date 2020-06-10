const router = require("express").Router();
const Client = require("../models/client.model");
const Marque = require("../models/marque.model");
const jwt = require("jsonwebtoken");
const verifcationJWT = require("../verification/verification");

router.route("/recherche").post(async (request, response) => {
  marques = await Marque.find();
  response.send(marques);
});

router.post("/supprimer", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, async (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      const moderateur = await Client.findOne(
        { _id: data._id },
        { _id: 0, moderateur: 1 }
      );
      if (moderateur) {
        const id = request.body._id;
        Marque.deleteOne({ _id: id }).then(response.send("supprimé"));
      }
    }
  });
});

router.post("/ajouter", verifcationJWT, async (request, response) => {
  await jwt.verify(request.token, process.env.SECRET, async (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else {
      const moderateur = await Client.findOne(
        { _id: data._id },
        { _id: 0, moderateur: 1 }
      );
      if (moderateur) {
        const nom = request.body.nom;
        const newMarque = new Marque({
          nom,
        });

        newMarque
          .save()
          .then(() => response.json("Marque ajouté"))
          .catch((erreur) => response.json("Erreur " + erreur));
      }
    }
  });
});

module.exports = router;
