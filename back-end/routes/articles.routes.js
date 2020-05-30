const router = require("express").Router();
const Article = require("../models/article.model");

router.route("/recherche/:id").get(async (request, response) => {
  article = await Article.findById(request.params.id)
  response.send(article);
});

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
      article = await Article.find({}, { _id: 1, nom: 1, prix: 1 });
      break;
  }
  response.send(article);
});

router.route("/ajouter").post((request, response) => {
  const nom = request.body.nom;
  const couleur = request.body.couleur;
  const categorie = request.body.categorie;
  const quantite = request.body.quantite;
  const taille = request.body.taille;
  const description = request.body.description;
  const prix = request.body.prix;

  const newArticle = new Article({
    nom,
    couleur,
    categorie,
    quantite,
    taille,
    description,
    prix
  });

  newArticle
    .save()
    .then(() => response.json("Article ajouté"))
    .catch(erreur => response.json("Erreur " + erreur));
});

module.exports = router;
