require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes.js");
const PORT = process.env.PORT || 5500;
const DbConnect = require("./database");
const cors = require("cors");

//cors
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend created");
});
//database connect
DbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`server runs at http://localhost:${PORT}`);
});
