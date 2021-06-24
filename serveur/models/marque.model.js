const mongoose = require("mongoose");

const marqueSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
});

const Marque = mongoose.model("Marque", marqueSchema);

module.exports = Marque;
