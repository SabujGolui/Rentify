const express = require("express");
const apiRoutes = require("./api");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", apiRoutes);
app.use("/", (res, req) => {
  res.send("Sever in running");
});

app.options("/", cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
