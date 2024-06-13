import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { server } from "../constants";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
const Cards = ({ successData:sd, failedData, setCurrentTable }) => {
  const [processCount, setProcessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const [poData, setPoData] = useState([]);
  console.log("poData: ", poData);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${server}/api/get-data`);
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch data. Status: ${response.status}`);
  //       }

  //       const myres = await response.json();
  //       if (myres && Array.isArray(myres.data)) {
  //         let processCount = 0;
  //         let errorCount = 0;

  //         myres.data.forEach((item) => {
  //           if (item.attachmentsCount > 0) {
  //             processCount += 1;
  //           } else {
  //             errorCount += 1;
  //           }
  //         });

  //         setProcessCount(processCount);
  //         setErrorCount(errorCount);
  //       } else {
  //         console.error("Data not found in the API response");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array to run the effect only once on component mount

  const getColor = (name) => {
    switch (name) {
      case "SUCCESS":
        return "#a5ff90"; // Green for PROCESS
      case "ERROR":
        return "#E14032"; // Red for ERROR
      default:
        return "#8884d8"; // Default color
    }
  };

  const chartData = [
    { name: "SUCCESS", value: processCount },
    { name: "ERROR", value: errorCount },
    { name: "GR NO", value: 0 }, // You can set a default value for GR NO or fetch it from your data
  ];

  const xlData = [
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
      Amount: 391.45000000000005,
      key: 10,
    },
    {
      poNum: "3165354060",
      Item: 20,
      Material: "3BSE070093R1",
      qty: 15,
      price: 84.35,
      Amount: 1265.25,
      key: 11,
    },
    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      qty: 10,
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
      qty: 5,
      price: 87.88,
      Amount: 439.4,
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
  ];
  const pdfData = [
    {
      poNum: "3165354054",
      Item: 1,
      Material: "3BSE078762R1",
      "Cust Material": "RN078762R1",
      Description: "AIS810 Analog Input 4 to 20mA",
      qty: 2,
      price: 78.29,
      Amount: 156.58,
      key: 1,
      status: "Successfully Process",
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
      status: "Successfully Process",
    },

    {
      poNum: "3165354060",
      Item: 20,
      Material: "3BSE070093R1",
      qty: 15,
      price: 84.35,
      Amount: 1265.25,
      key: 8,
      status: "Successfully Process",
    },

    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      DESCRIPTION: "EOW-x2 workplace",
      qty: 10,
      price: 82.25,
      Amount: 847.175,
      key: 10,
      status: "Successfully Process",
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
      price: 66.88,
      Amount: 601.92,
      key: 12,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 60,
      Material: "3BSE070127R1",
      DESCRIPTION: "EOW-f3 workplace",
      qty: 3,
      price: 73.2,
      Amount: 226.188,
      key: 13,
      status: "Successfully Process",
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
      price: 87.88,
      Amount: 439.4,
      key: 15,
      status: "Successfully Process",
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
      Amount: 505.5,
      key: 18,
      status: "Successfully Process",
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
  ];

  const verifyData = [];
  const successData = [];
  const filterData = (poData) => {
    // console.log("xlData:", xlData);

    const filteredXlData = xlData.filter(
      (row) => String(row.poNum) === String(poData),
    );
    const filteredPdfData = pdfData.filter(
      (row) => String(row.poNum) === String(poData),
    );

    console.log("filteredXlData:", filteredXlData);
    console.log("filteredPdfData:", filteredPdfData);

    // Iterate through filtered XL data and compare with filtered PDF data
    filteredPdfData.forEach((row) => {
      const matchingRow = filteredXlData.find(
        (item) =>
          Math.floor(row.price) === Math.floor(item.price) &&
          Math.floor(row.Amount) === Math.floor(item.Amount),
      );

      if (!matchingRow) {
        // Add to verify table if no match is found
        verifyData.push({ ...row, status: "error: mismatch found" });
      } else {
        // Add to success table if a match is found
        successData.push({ ...row, status: "Successfully processed" });
      }
    });

    return {
      verifyData,
      successData,
    };
  };
  const result = filterData(poData);
  console.log(result.verifyData.length); // Logs the count of verifyData
  console.log(result.successData.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint of your API
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getPodata`,
        );
        const { poNumber } = response.data[0]; // Extract poNumber from the first element of the response data array
        setPoData(poNumber); // Set the selectedPoNumber state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [poData]);
  return (
    <Layout>
      {/* <div style={{ display: "flex",    }}> */}
      <div style={{ width: "100%" }}>
        {/* Cards Row */}
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Link to="/header" state={{ type: "success" }}>
              <Card
                style={{
                  width: "350px",
                  backgroundColor: "#a5ff90",
                  paddingRight: "300px",
                  height: "150px",
                }}
              >
                <b
                  style={{
                    color: "black",
                    fontSize: "25px",
                    fontFamily: "monospace",
                  }}
                >
                  SUCCESS
                </b>
                <ArrowUpOutlined style={{ color: "black", fontSize: "30px" }} />
                <b style={{ color: "Black", fontSize: "25px" }}>
                  {sd?.length}
                </b>
              </Card>
            </Link>
          </Col>

          <Col>
            <Link to="/header" state={{ type: "error" }}>
              <Card onClick={()=> setCurrentTable("Fail")}
                style={{
                  width: "350px",
                  backgroundColor: "#db5858",
                  paddingRight: "300px",
                  marginLeft: "40px",
                  height: "150px",
                }}
              >
                <span className="flex flex-row">
                  <b style={{ fontSize: "25px", fontFamily: "monospace" }}>
                    ERROR
                  </b>
                  <ArrowDownOutlined
                    style={{ color: "white", fontSize: "30px" }}
                  />
                </span>
                <b style={{ fontSize: "20px", color: "white" }}>
                  {failedData?.length}
                </b>
              </Card>
            </Link>
          </Col>

          {/* <Col>
            <Card
              style={{
                width: "350px",
                backgroundColor: "#b3ceff",
                paddingRight: "300px",
                marginLeft: "40px",
                height: "150px",
              }}
            >
              <b style={{ fontSize: "25px", fontFamily: "monospace" }}>GRNO</b>

              <PlusOutlined style={{ fontSize: "35px" }} />
              <b style={{ fontSize: "20px" }}>0</b>
            </Card>
          </Col> */}
        </Row>

        {/* Charts Container */}

        <ChartsContainer chartData={chartData} getColor={getColor} />
      </div>
      {/* </div> */}
    </Layout>
  );
};

const ChartsContainer = ({ chartData, getColor }) => (
  <div
    style={{
      margin: "65px",
      display: "flex",
      justifyContent: "space-between",
      width: "83%",
    }}
  >
    {/* Pie Chart */}
    <Card title="Pie Chart" bordered={false} style={{ flex: 1 }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
    {/* Bar Chart */}
    <Card
      title="Bar Chart"
      bordered={false}
      style={{ flex: 1, marginLeft: "50px" }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

export default Cards;
