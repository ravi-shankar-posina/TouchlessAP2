import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";

import LoginPage from "./Pages/LoginPage";
import Cards from "./Pages/Home";
import Settings from "./Pages/Settings";
import InputPage from "./Pages/InputPage";
import SourceData from "./Pages/SourceData";
import HeaderItem from "./Pages/HeaderItem";
import PoLineItems from "./Pages/PoLineItems";

import { POProvider } from "./Pages/POContext";
import { MyContext } from "./components/AuthProvider";

function App() {
  const [currentTable, setCurrentTable] = useState("Success");
  const [PDFdata, setPDFdata] = useState("");
  const [DBdata, setDBdata] = useState("");
  const [successData, setSuccessData] = useState("");
  const [failedData, setFailedData] = useState("");
  const [poNumber, setPoNumber] = useState([
    3165378098, 3165378198, 3165378918, 3165354058, 3165354060, 3165354054,
  ]);
  const { auth } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  const getPdfItems = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/getPdfData`,
        {}
      );
      setPDFdata(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getXlItems = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/getXlData`,
        {}
      );
      setDBdata(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPdfItems();
    getXlItems();
  }, []);

  useEffect(() => {
    if (!auth || !Array.isArray(DBdata) || !Array.isArray(PDFdata)) {
      return;
    }

    let filteredPoNumbers;

    if (auth.role === "admin" || auth.role === "super admin") {
      filteredPoNumbers = poNumber;
    } else if (auth.role === "user" && auth.vendor) {
      const vendorToPoNumberMap = {
        1800001463: [3165378098, 3165378198],
        1800001473: [3165378918],
      };

      filteredPoNumbers = vendorToPoNumberMap[auth.vendor] || [];
    } else {
      filteredPoNumbers = [];
    }

    const filteredXlData = DBdata.filter((row) =>
      filteredPoNumbers.includes(row.poNum)
    );
    const filteredPdfData = PDFdata.filter((row) =>
      filteredPoNumbers.includes(row.poNum)
    );

    const newSuccessData = [];
    const newFailedData = [];

    filteredPdfData.forEach((row) => {
      const amountMatch = filteredXlData.find(
        (item) =>
          row.qty === item.qty &&
          Math.floor(row.amount) === Math.floor(item.amount)
      );

      if (amountMatch) {
        newSuccessData.push(row);
      } else {
        newFailedData.push(row);
      }
    });

    setSuccessData(newSuccessData);
    setFailedData(newFailedData);
    setLoading(false);
  }, [DBdata, PDFdata, poNumber, auth]);

  return (
    <POProvider>
      <div className="App">
        <Router>
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/home"
                  element={
                    auth ? (
                      <Cards
                        successData={successData}
                        setCurrentTable={setCurrentTable}
                        failedData={failedData}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/po-lineitems"
                  element={
                    auth ? (
                      <PoLineItems
                        successData={successData}
                        setSuccessData={setSuccessData}
                        setCurrentTable={setCurrentTable}
                        failedData={failedData}
                        setFailedData={setFailedData}
                        PDFdata={PDFdata}
                        setPDFdata={setPDFdata}
                        DBdata={DBdata}
                        setDBdata={setDBdata}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/settings"
                  element={auth ? <Settings /> : <Navigate to="/" />}
                />
                <Route
                  path="/upload"
                  element={auth ? <InputPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/sourcedata"
                  element={auth ? <SourceData /> : <Navigate to="/" />}
                />
                <Route
                  path="/headeritem"
                  element={auth ? <HeaderItem /> : <Navigate to="/" />}
                />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </POProvider>
  );
}

export default App;
