const router = require("express").Router();
const Client = require("../models/client.model");
const Categorie = require("../models/categorie.model");
const jwt = require("jsonwebtoken");
const verifcationJWT = require("../verification/verification");

router.route("/recherche").post(async (request, response) => {
  categories = await Categorie.find();
  response.send(categories);
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
        Categorie.deleteOne({ _id: id }).then(response.send("supprimé"));
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
        const newCategorie = new Categorie({
          nom,
        });

        newCategorie
          .save()
          .then(() => response.json("Catégorie ajouté"))
          .catch((erreur) => response.json("Erreur " + erreur));
      }
    }
  });
});

module.exports = router;
