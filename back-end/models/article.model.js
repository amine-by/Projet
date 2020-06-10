const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  nom: { type: String, trim: true, required: true },
  image: { data: Buffer, contentType: String },
  couleur: { type: String },
  categorie: { type: String, required: true },
  marque: { type: String, required: true },
  quantite: { type: Number, required: true },
  taille: { type: String },
  cree: { type: Date, default: Date.now },
  description: { type: String, trim: true },
  prix: { type: Number, required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
