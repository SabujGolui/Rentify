const express = require("express");
const apiRoutes = require("./api");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 5000;

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use("/", (req, res) => {
  res.send("Welcome");
});

app.options(cors());
// app.options("https://rentify-server-ruddy.vercel.app/", cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
