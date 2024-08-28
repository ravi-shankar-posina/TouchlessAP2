import React, { useState, useEffect, useContext } from "react";
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
import { MyContext } from "../components/AuthProvider";

const Cards = ({ successData: sd, failedData, setCurrentTable }) => {
  const [processCount, setProcessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [autoPostNo, setAutoPostNo] = useState(0);
  const [poData, setPoData] = useState([]);
  const { auth } = useContext(MyContext);

  const getColor = (name) => {
    switch (name) {
      case "SUCCESS":
        return "#3fc23d"; // Green for PROCESS #3d67e6
      case "ERROR":
        return "#ff4747";
      case "AUTO POSTING":
        return "#73b5f2"; // Red for ERROR ff4747
      case "AUTO POSTING VOLUME":
        return "#e3ad2c";
      case "SUCCESS VOLUME":
        return "#397714";
      default:
        return "#e63f66"; // Default color
    }
  };
  const getColor2 = (name) => {
    switch (name) {
      case "SUCCESS":
        return "#3fc23d"; // Green for PROCESS #3d67e6
      case "ERROR":
        return "#ff4747";
      case "AUTO POSTING":
        return "#73b5f2"; // Red for ERROR ff4747
      case "AUTO POSTING VOLUME":
        return "#e3ad2c";
      case "SUCCESS VOLUME":
        return "#397714";
      default:
        return "#e63f66"; // Default color
    }
  };
  useEffect(() => {
    setProcessCount(sd?.length || 0);
    setErrorCount(failedData?.length || 0);
  }, [sd, failedData]);
  const chartData = [
    { name: "AUTO POSTING", value: 457 },
    { name: "SUCCESS", value: processCount },
    // { name: "SUCCESS VOLUME", value: 337 },
    { name: "ERROR", value: errorCount },
    // { name: "AUTO POSTING VOLUME", value: 675 },

    // { name: "GR NO", value: 0 }, // You can set a default value for GR NO or fetch it from your data
  ];
  const chartData2 = [
    { name: "AUTO POSTING VOLUME", value: 675 },
    { name: "SUCCESS VOLUME", value: 337 },
    // { name: "AUTO POSTING", value: 457 },
    { name: "", value: 0 },
    { name: "", value: 0 },
    // { name: "AUTO POSTING", value: 457 },
    // { name: "SUCCESS", value: processCount },
    // { name: "ERROR", value: errorCount },
    // { name: "GR NO", value: 0 }, // You can set a default value for GR NO or fetch it from your data
  ];

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const username = capitalizeFirstLetter(auth.username);
  const [dateString, setDateString] = useState(getFormattedDate());
  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <Layout>
      {/* <div style={{ display: "flex",    }}> */}
      <div style={{ width: "100%", height: "95vh", border: "3px solid black" }}>
        {/* Cards Row */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              fontSize: 15,
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            {" "}
            Date: {dateString}
          </div>
          <div
            style={{
              padding: "6px",
              margin: "auto",
              backgroundClip: "padding-box",
              fontSize: 24,
              fontWeight: 600,
              width: 600,
              marginBottom: 30,
            }}
          >
            Invoice Verification Dashboard
          </div>
          <span
            style={{
              display: "flex",
              justifyContent: "end",
              fontSize: 15,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            Welcome {username} !!
          </span>
        </div>
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Link to="/po-lineitems" state={{ type: "success" }}>
              <Card
                style={{
                  width: "350px",
                  backgroundColor: "#73b5f2",
                  paddingRight: "300px",
                  height: "150px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "white",
                  }}
                >
                  <span>
                    <span
                      style={{
                        color: "white",
                        fontSize: "25px",
                        fontFamily: "monospace",
                        fontWeight: 900,
                        width: 300,
                      }}
                    >
                      AUTO POSTING
                    </span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "150px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: 600,
                      }}
                    >
                      457
                    </span>
                    <span style={{ marginLeft: " 10px", marginTop: 2 }}>
                      <ArrowUpOutlined style={{ fontSize: "30px" }} />
                    </span>
                  </span>
                </div>
              </Card>
            </Link>
          </Col>{" "}
          <Col>
            <Link to="/po-lineitems" state={{ type: "success" }}>
              <Card
                style={{
                  width: "350px",
                  marginLeft: "40px",
                  backgroundColor: "#3fc23d",
                  paddingRight: "300px",
                  height: "150px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "white",
                  }}
                >
                  <span>
                    {" "}
                    <span
                      style={{
                        fontSize: "25px",
                        fontFamily: "monospace",
                        fontWeight: 900,
                      }}
                    >
                      SUCCESS
                    </span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "150px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: 600,
                      }}
                    >
                      {sd?.length}
                    </span>
                    <span style={{ marginLeft: " 10px", marginTop: 2 }}>
                      <ArrowUpOutlined style={{ fontSize: "30px" }} />
                    </span>
                  </span>
                </div>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/po-lineitems" state={{ type: "error" }}>
              <Card
                onClick={() => setCurrentTable("Fail")}
                style={{
                  width: "350px",
                  backgroundColor: "#ff4747",
                  paddingRight: "300px",
                  marginLeft: "40px",
                  height: "150px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "white",
                  }}
                >
                  <span>
                    {" "}
                    <span
                      style={{
                        fontSize: "25px",
                        fontFamily: "monospace",
                        fontWeight: 900,
                      }}
                    >
                      ERROR
                    </span>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "180px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "25px",
                        fontWeight: 600,
                      }}
                    >
                      {failedData?.length}
                    </span>
                    <span style={{ marginLeft: " 10px", marginTop: 4 }}>
                      <ArrowDownOutlined style={{ fontSize: "30px" }} />
                    </span>
                  </span>
                </div>
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

        <ChartsContainer
          chartData={chartData}
          chartData2={chartData2}
          getColor={getColor}
          getColor2={getColor2}
        />
      </div>
      {/* </div> */}
    </Layout>
  );
};

const ChartsContainer = ({ chartData, chartData2, getColor, getColor2 }) => (
  <div
    style={{
      margin: "65px",
      display: "flex",
      justifyContent: "space-around",
      marginTop: 140,
    }}
  >
    {/* Pie Chart */}
    <div style={{ width: 650 }}>
      <span
        style={{
          fontSize: 20,
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        Success Rate
      </span>
      <Card
        bordered={false}
        style={{
          flex: 1,
          marginTop: 20,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              fill="#8884d8"
              label
              style={{ fontSize: 18 }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
    {/* Bar Chart */}
    <div style={{ width: 650 }}>
      <span
        style={{
          fontSize: 20,
          fontWeight: 600,
          display: "flex",
          justifyContent: "center",
        }}
      >
        PO Value Processed
      </span>
      <Card
        bordered={false}
        style={{
          flex: 1,
          marginTop: 20,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData2}>
            <XAxis
              dataKey="name"
              tick={false} // This will hide the default axis labels and ticks
              label={{
                value: "PO Value",
                position: "insideBottom",
                // offset: -10, // Adjust this value as needed
                style: { fontSize: 14, fontWeight: 500 },
              }}
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value}$`} />
            {/* <Legend /> */}
            <Bar dataKey="value">
              {chartData2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor2(entry.name)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
);

export default Cards;
