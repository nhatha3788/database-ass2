import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [packageId, setPackageId] = useState(0);
  const [shipId, setShipId] = useState(0);
  const [transportList, setTransportList] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [numPackage, setNumPackge] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTransportList(response.data);
    });
  });

  const submitTransport = () => { 
    Axios.post("http://localhost:3001/api/insert", {
      packageId: packageId,
      shipId: shipId,
    }).then(() => {
      alert("Successfull Insert");
    });
    setTransportList([
      ...transportList,
      { MA_KIEN_HANG: packageId, MA_CHUYEN_XE: shipId },
    ]);
  };

  const submitCountPackage = () => {
      Axios.post("http://localhost:3001/api/count-package", {
        customerId: customerId
      }).then((response) => {
        setNumPackge(response.data[0].numPackages);
      });
  };

  return (
    <div className="App">
      <h1>TRANSPORTATION DATABASE</h1>
      <div className="form">
        <label>Mã kiện hàng:</label>
        <input
          type="number"
          name="packageId"
          onChange={(e) => {
            setPackageId(e.target.value);
          }}
        ></input>
        <label>Mã chuyến xe:</label>
        <input
          type="number"
          name="shipId"
          onChange={(e) => {
            setShipId(e.target.value);
          }}
        ></input>
        <button onClick={submitTransport}>Thêm</button>
      </div>
      {transportList.map((val) => {
        return (
          <h1 key={transportList.indexOf(val)}>
            Mã kiện hàng: {val.MA_KIEN_HANG} | Mã chuyến xe: {val.MA_CHUYEN_XE}
          </h1>
        );
      })}
      <hr />
      <div className="form">
        <label>Mã khách hàng:</label>
        <input
          type="number"
          name="customerId"
          onChange={(e) => {
            setCustomerId(e.target.value);
          }}
        ></input>
        <button onClick={submitCountPackage}>Đếm</button>
      </div>
      {<h1>Số kiện hàng: {numPackage}</h1>}
    </div>
  );
}

export default App;
