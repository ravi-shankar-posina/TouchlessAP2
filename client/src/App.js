import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Cards from "./Pages/Home";
import Process from "./Pages/Process";
import Settings from "./Pages/Settings";
import Header from "./Pages/Header";
import Protected from "./components/protected";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputPage from "./Pages/InputPage";
import { POProvider } from "./Pages/POContext";
import { useEffect, useState } from "react";
import { Spin } from "antd";

function App() {
  const [DBdata, setDBdata] = useState([
    {
      poNum: "3165354054",
      Item: 1,
      Material: "3BSE078762R1",
      qty: 2,
      price: 78.29,
      Amount: 156.58,
      key: 1,
    },
    {
      poNum: "3165354054",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 10,
      price: 84.35,
      Amount: 843.5,
      key: 2,
    },
    {
      poNum: "3165354054",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 7,
      price: 82.25,
      Amount: 575.75,
      key: 3,
    },
    {
      poNum: "3165354054",
      Item: 4,
      Material: "3BSE070125R1",
      qty: 7,
      price: 54.3,
      Amount: 380.09999999999997,
      key: 4,
    },
    {
      poNum: "3165354054",
      Item: 5,
      Material: "3BSE070126R1",
      qty: 3,
      price: 66.88,
      Amount: 200.64,
      key: 5,
    },
    {
      poNum: "3165354058",
      Item: 1,
      Material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      Amount: 411.25,
      key: 6,
    },
    {
      poNum: "3165354058",
      Item: 2,
      Material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      Amount: 271.5,
      key: 7,
    },
    {
      poNum: "3165354058",
      Item: 3,
      Material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      Amount: 334.4,
      key: 8,
    },
    {
      poNum: "3165354062",
      Item: 1,
      Material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      Amount: 411.25,
      key: 9,
    },
    {
      poNum: "3165354060",
      Item: 10,
      Material: "3BSE078762R1",
      qty: 5,
      price: 78.29,
      Amount: 39.45,
      key: 10,
    },
    {
      poNum: "3165354060",
      Item: 20,
      Material: "3BSE070093R1",
      qty: 8,
      price: 84.35,
      Amount: 100.25,
      key: 11,
    },
    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      qty: 6,
      price: 82.25,
      Amount: 822.5,
      key: 12,
    },
    {
      poNum: "3165354060",
      Item: 40,
      Material: "3BSE070125R1",
      qty: 8,
      price: 54.3,
      Amount: 434.4,
      key: 13,
    },
    {
      poNum: "3165354060",
      Item: 50,
      Material: "3BSE070126R1",
      qty: 9,
      price: 66.88,
      Amount: 601.92,
      key: 14,
    },
    {
      poNum: "3165354060",
      Item: 60,
      Material: "3BSE070127R1",
      qty: 3,
      price: 73.2,
      Amount: 219.60000000000002,
      key: 15,
    },
    {
      poNum: "3165354060",
      Item: 70,
      Material: "3BSE070134R1",
      qty: 4,
      price: 78.1,
      Amount: 312.4,
      key: 16,
    },
    {
      poNum: "3165354060",
      Item: 80,
      Material: "3BSE070135R1",
      qty: 6,
      price: 77.88,
      Amount: 600,
      key: 17,
    },
    {
      poNum: "3165354060",
      Item: 90,
      Material: "3BSE070142R1",
      qty: 11,
      price: 33,
      Amount: 363,
      key: 18,
    },
    {
      poNum: "3165354060",
      Item: 100,
      Material: "3BSE070214-EN",
      qty: 5,
      price: 112.34,
      Amount: 561.7,
      key: 19,
    },
    {
      poNum: "3165354060",
      Item: 110,
      Material: "3BSE070544",
      qty: 5,
      price: 101.1,
      Amount: 505.5,
      key: 20,
    },
    {
      poNum: "3165354056",
      Item: 1,
      Material: "3BSE070126R1",
      qty: 10,
      price: 66.88,
      Amount: 668.8,
      key: 21,
    },
    {
      poNum: "3165354056",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 5,
      price: 84.35,
      Amount: 421.75,
      key: 22,
    },
    {
      poNum: "3165354056",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 2,
      price: 82.25,
      Amount: 164.5,
      key: 23,
    },
  ]);
  const [PDFdata, setPDFdata] = useState([
    {
      poNum: "3165354054",
      Item: 1,
      Material: "3BSE078762R1",
      "Cust Material": "RN078762R1",
      Description: "AIS810 Analog Input 4 to 20mA",
      qty: 2,
      price: 78.29,
      Amount: 150.58,
      key: 1,
      status: "Amount Mismatch",
    },
    {
      poNum: "3165354054",
      Item: 2,
      Material: "3BSE070093R1",
      "Cust Material": "RN070093R1",
      Description: "PFPC203-A Cylmate Transducer Bus",
      qty: 10,
      price: 84.35,
      Amount: 843.5,
      key: 2,
      status: "Successfully Process",
    },

    {
      poNum: "3165354054",
      Item: 3,
      Material: "3BSE070124R1",
      "Cust Material": "RN070124R1",
      Description: "EOW-x2 workplace",
      qty: 7,
      price: 82.25,
      Amount: 575.75,
      key: 3,
      status: "Successfully Process",
    },
    {
      poNum: "3165354054",
      Item: 4,
      Material: "3BSE070125R1",
      "Cust Material": "RN070125R1",
      Description: "EOW-x3 workplace",
      qty: 7,
      price: 54.3,
      Amount: 380.1,
      key: 4,
      status: "Successfully Process",
    },
    {
      poNum: "3165354054",
      Item: 5,
      Material: "3BSE070126R1",
      "Cust Material": "RN070126R1",
      Description: "EOW-f2 workplace",
      qty: 3,
      price: 66.88,
      Amount: 200.64,
      key: 5,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 10,
      Material: "3BSE078762R1",
      DESCRIPTION: "AIS810 Analog Input 4 to 20mA",
      qty: 5,
      price: 78.29,
      Amount: 391.45,
      key: 6,
      status: "Amount-Mismatch",
    },

    {
      poNum: "3165354060",
      Item: 20,
      Material: "3BSE070093R1",
      qty: 10,
      price: 84.35,
      Amount: 125.25,
      key: 8,
      status: "Qty / Amount-Mismatch",
    },

    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      DESCRIPTION: "EOW-x2 workplace",
      qty: 8,
      price: 82.25,
      Amount: 522.5,
      key: 10,
      status: "Qty-Mismatch",
    },
    {
      poNum: "3165354060",
      Item: 40,
      Material: "3BSE070125R1",
      DESCRIPTION: "EOW-x3 workplace",
      qty: 8,
      price: 54.3,
      Amount: 434.4,
      key: 11,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 50,
      Material: "3BSE070126R1",
      DESCRIPTION: "EOW-f2 workplace",
      qty: 9,
      price: 56.88,
      Amount: 601.92,
      key: 12,
      status: "Amount-Mismatch",
    },
    {
      poNum: "3165354060",
      Item: 60,
      Material: "3BSE070127R1",
      DESCRIPTION: "EOW-f3 workplace",
      qty: 2,
      price: 73.2,
      Amount: 119.6,
      key: 13,
      status: "Amount-Mismatch",
    },
    {
      poNum: "3165354060",
      Item: 70,
      Material: "3BSE070134R1",
      DESCRIPTION: "Video Input Channel",
      qty: 4,
      price: 78.1,
      Amount: 312.4,
      key: 14,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 80,
      Material: "3BSE070135R1",
      DESCRIPTION: "Video Client",
      qty: 5,
      price: 77.88,
      Amount: 439.4,
      key: 15,
      status: "Qty / Amount-Mismatch",
    },
    {
      poNum: "3165354060",
      Item: 90,
      Material: "3BSE070142R1",
      DESCRIPTION: "Automation Sentinel Subscription",
      qty: 11,
      price: 33,
      Amount: 363,
      key: 16,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 100,
      Material: "3BSE070214-EN",
      DESCRIPTION: "Panel 800 Version 6",
      qty: 5,
      price: 112.34,
      Amount: 561.7,
      key: 17,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 110,
      Material: "3BSE070544",
      DESCRIPTION: "System 800xA ADI Connect 5.1",
      qty: 5,
      price: 101.1,
      Amount: 570.5,
      key: 18,
      status: "Qty / Amount-Mismatch",
    },
    {
      poNum: "3165354058",
      Item: 10,
      Material: "3BSE070124R1",
      qty: 5,
      price: 82.25,
      Amount: "411.25",
      key: 19,
      status: "Successfully Process",
    },
    {
      poNum: "3165354058",
      Item: 20,
      Material: "3BSE070125R1",
      qty: 5,
      price: 54.3,
      Amount: "271.50",
      key: 20,
      status: "Successfully Process",
    },
    {
      poNum: "3165354058",
      Item: 30,
      Material: "3BSE070126R1",
      qty: 5,
      price: 66.88,
      Amount: "334.40",
      key: 21,
      status: "Successfully Process",
    },
  ]);

  const [currentTable, setCurrentTable] = useState("Success");
  const [poNumber, setPoNumber] = useState("3165354060");

  const [successData, setSuccessData] = useState([]);
  const [failedData, setFailedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredXlData = DBdata.filter(
      (row) => String(row.poNum) === String(poNumber)
    );
    const filteredPdfData = PDFdata.filter(
      (row) => String(row.poNum) === String(poNumber)
    );

    const newSuccessData = [];
    const newFailedData = [];

    filteredPdfData.forEach((row) => {
      const amountMatch = filteredXlData.find(
        (item) =>
          Math.floor(row.price) === Math.floor(item.price) &&
          Math.floor(row.Amount) === Math.floor(item.Amount)
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
  }, [DBdata, PDFdata, poNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen gap-3">
        <Spin /> Loading...
      </div>
    );
  }
  return (
    <POProvider>
      <div className="App">
        <Router>
          <Routes>{/* <Route path="/" element={<LoginPage />} /> */}</Routes>
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <Cards
                      successData={successData}
                      setCurrentTable={setCurrentTable}
                      failedData={failedData}
                    />
                  }
                />
                {/* <Route
                  path="/tlprocess"
                  element={
                    <Protected>
                      <Process />
                    </Protected>
                  }
                /> */}
                <Route
                  path="/header"
                  element={
                    <Header
                      DBdata={DBdata}
                      PDFdata={PDFdata}
                      setDBdata={setDBdata}
                      setPDFdata={setPDFdata}
                      successData={successData}
                      setSuccessData={setSuccessData}
                      failedData={failedData}
                      setFailedData={setFailedData}
                      currentTable={currentTable}
                      setCurrentTable={setCurrentTable}
                    />
                  }
                />
                <Route path="/" element={<Settings />} />
                <Route path="/ponumber" element={<InputPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </POProvider>
  );
}

export default App;
