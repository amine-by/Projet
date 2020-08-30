//imports librerie
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

//imports routes
const clients = require("./routes/clients.routes");
const articles = require("./routes/articles.routes");
const categories = require("./routes/categories.routes");
const marques = require("./routes/marques.routes");
const commandes = require("./routes/commandes.routes")

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

app.get("/", (request, response) => {
  response.send("ça marche!");
});

//connection à la base de donnée MongoDB
const conn = mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//
mongoose.connection.once("open", () => {
  console.log("connecté à la base MongoDB");
});

//connection au serveur express
app.listen(port, () => console.log("serveur lancé au port " + port));
