const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  client: { type: Object, required: true },
  liste: { type: Array, required: true },
  adresse: { type: String, required: true },
  etat: { type: String, required: true, default: "en Attente" },
  cree: { type: Date, default: Date.now },
  prix: { type: Number, required: true },
});

const Commande = mongoose.model("Commande", commandeSchema);

module.exports = Commande;
