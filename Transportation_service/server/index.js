const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "transportation_service",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM transportation_service.cho;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const packageId = req.body.packageId;
  const shipId = req.body.shipId;

  const sqlInsert = "CALL INSERT_CHO(?,?);";
  db.query(sqlInsert, [packageId, shipId], (err, result) => {
    console.log(err);
  });
});

app.post("/api/count-package", (req, res) => {
  const customerId = req.body.customerId;

  const sqlSelect = "select numberOfPackage(?) as numPackages;";
  db.query(sqlSelect, [customerId], (err, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
