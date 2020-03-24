const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");

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

router.post("/panier", verifcationJWT, (request, response) => {
  jwt.verify(request.token, process.env.SECRET, (erreur, data) => {
    if (erreur) response.sendStatus(403);
    else response.send("approved " + JSON.stringify(data));
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
    email
  });

  newClient.passe = newClient.generateHash(passe);

  newClient
    .save()
    .then(() => response.json("Client ajouté"))
    .catch(erreur => response.json("Erreur " + erreur));
});

module.exports = router;
