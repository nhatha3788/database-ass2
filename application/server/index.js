const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "transportation_service",
});

app.get("/api/get/khachhang", (req, res) => {
  const sqlSelect = "SELECT * FROM khach_hang;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/kienhang", (req, res) => {
  const sqlSelect = "SELECT * FROM kien_hang;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/bienbangui", (req, res) => {
  const sqlSelect = "SELECT * FROM bien_ban_gui;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/bienbannhan", (req, res) => {
  const sqlSelect = "SELECT * FROM bien_ban_nhan;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/chuyenxelientinh", (req, res) => {
  const sqlSelect = "SELECT * FROM chuyen_xe_lien_tinh;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/cuocxenoithanh", (req, res) => {
  const sqlSelect = "SELECT * FROM cuoc_xe_noi_thanh;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/cho", (req, res) => {
  const sqlSelect = "SELECT * FROM transportation_service.cho;";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/post/timkhachhang", (req, res) => {
  const { MA_KH } = req.body;
  const sqlSelect = "SELECT * FROM khach_hang WHERE MA_KH = ?;";
  db.query(sqlSelect, [MA_KH], (err, result) => {
    res.send(result);
  });
});


app.post("/api/post/doanhthu", (req, res) => {
  const { MA_KH, NAM } = req.body;
  const sqlSelect = "CALL RevenueOfCustomer(?,?);";
  db.query(sqlSelect, [MA_KH, NAM], (err, result) => {
    res.send(result);
  });
});

app.post("/api/post/ngaynhan", (req, res) => {
  const { GID, NID, NGAY_GUI } = req.body;
  const sqlSelect = "CALL FindReceiveDate(?,?,?);";
  db.query(sqlSelect, [GID, NID, NGAY_GUI], (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const MA_KIEN_HANG = req.body.MA_KIEN_HANG;
  const MA_CHUYEN_XE = req.body.MA_CHUYEN_XE;
  const sqlInsert = "CALL INSERT_CHO(?,?);";
  db.query(sqlInsert, [MA_KIEN_HANG, MA_CHUYEN_XE], (err, result) => {
    res.send(err);
  });
});

app.post("/api/count-package", (req, res) => {
  const customerId = req.body.customerId;

  const sqlSelect = "select numberOfPackage(?) as numPackages;";
  db.query(sqlSelect, [customerId], (err, result) => {
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("Running on port 5000");
})