const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema({
  nom: { type: String, trim: true, required: true },
  prenom: { type: String, trim: true, required: true },
  email: { type: String, match: [/.+\@.+\..+/], required: true, unique: true },
  passe: { type: String, required: true },
  cree: { type: Date, default: Date.now },
  panier: { type: Array, default: Array },
  moderateur: { type: Boolean, default: false },
  administrateur: { type: Boolean, default: false },
  telephone: { type: Number, required: true },
});

clientSchema.methods.generateHash = (passe) =>
  bcrypt.hashSync(passe, bcrypt.genSaltSync(9));

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
