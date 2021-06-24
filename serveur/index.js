//imports librerie
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();

//imports controllers
const clients = require("./controllers/clients.controllers");
const articles = require("./controllers/articles.controllers");
const categories = require("./controllers/categories.controllers");
const marques = require("./controllers/marques.controllers");
const commandes = require("./controllers/commandes.controllers")

const app = express();
const port = 4000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

app.use("/clients", clients);
app.use("/articles", articles);
app.use("/categories", categories);
app.use("/marques", marques);
app.use("/commandes", commandes);

app.use(express.static(path.join(__dirname, "vue")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "vue", "index.html"))
})

//connection à la base de donnée MongoDB
const conn = mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connecté à la base MongoDB");
});

//connection au serveur express
app.listen(port, () => console.log("serveur lancé au port " + port));