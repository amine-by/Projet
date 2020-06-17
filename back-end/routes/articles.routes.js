const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Client = require("../models/client.model");
const Article = require("../models/article.model");
const multer = require("multer");
const verifcationJWT = require("../verification/verification");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true);
  },
});

router.route("/recherche/:id").get((request, response) => {
  Article.findById(request.params.id).then((resultat) => {
    response.send(resultat);
  });
});

router.post(
  "/modifier",
  upload.single("image"),
  verifcationJWT,
  async (request, response) => {
    await jwt.verify(
      request.token,
      process.env.SECRET,
      async (erreur, data) => {
        if (erreur) response.sendStatus(403);
        else {
          const moderateur = await Client.findOne(
            { _id: data._id },
            { _id: 0, moderateur: 1 }
          );
          if (moderateur) {
            const id = request.body._id;
            const nom = request.body.nom;
            const couleur = request.body.couleur;
            const categorie = request.body.categorie;
            const marque = request.body.marque;
            const quantite = request.body.quantite;
            const taille = request.body.taille;
            const description = request.body.description;
            const prix = request.body.prix;
            if (request.file)
              Article.updateOne(
                { _id: id },
                {
                  $set: {
                    nom,
                    couleur,
                    categorie,
                    marque,
                    quantite,
                    taille,
                    description,
                    prix,
                    "image.data": request.file.buffer,
                  },
                }
              ).then(() => response.send("succes"));
            else
              Article.updateOne(
                { _id: id },
                {
                  $set: {
                    nom,
                    couleur,
                    categorie,
                    marque,
                    quantite,
                    taille,
                    description,
                    prix,
                  },
                }
              ).then(() => response.send("succes"));
          } else response.sendStatus(403);
        }
      }
    );
  }
);

router.route("/recherche").post(async (request, response) => {
  const prix = request.body.prix;
  let article;
  switch (prix) {
    case "de 0 à 25":
      article = await Article.find(
        { prix: { $lte: 25 } },
        { _id: 1, nom: 1, prix: 1 }
      );
      break;
    case "de 25 à 50":
      article = await Article.find(
        { prix: { $lte: 50, $gte: 25 } },
        { _id: 1, nom: 1, prix: 1 }
      );
      break;
    case "de 50 à 100":
      article = await Article.find(
        { prix: { $lte: 100, $gte: 50 } },
        { _id: 1, nom: 1, prix: 1 }
      );
      break;
    case "plus que 100":
      article = await Article.find(
        { prix: { $gte: 100 } },
        { _id: 1, nom: 1, prix: 1 }
      );
      break;
    default:
      article = await Article.find();
      break;
  }
  response.send(article);
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
        Article.deleteOne({ _id: id }).then(() => response.send("succes"));
      }
    }
  });
});

router.post(
  "/ajouter",
  upload.single("image"),
  verifcationJWT,
  async (request, response) => {
    await jwt.verify(
      request.token,
      process.env.SECRET,
      async (erreur, data) => {
        if (erreur) response.sendStatus(403);
        else {
          const moderateur = await Client.findOne(
            { _id: data._id },
            { _id: 0, moderateur: 1 }
          );
          if (moderateur) {
            const nom = request.body.nom;
            const couleur = request.body.couleur;
            const categorie = request.body.categorie;
            const marque = request.body.marque;
            const quantite = request.body.quantite;
            const taille = request.body.taille;
            const description = request.body.description;
            const prix = request.body.prix;

            const newArticle = new Article({
              nom,
              couleur,
              categorie,
              marque,
              quantite,
              taille,
              description,
              prix,
            });

            if (request.file) {
              newArticle.image.data = request.file.buffer;
            }
            newArticle
              .save()
              .then(() => response.json("Article ajouté"))
              .catch((erreur) => response.json("Erreur " + erreur));
          }
        }
      }
    );
  }
);

module.exports = router;
