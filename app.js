const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// cnection à la db

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

app.listen(port, () => console.log(`Le serveur a demarrer au port ${port}`));
