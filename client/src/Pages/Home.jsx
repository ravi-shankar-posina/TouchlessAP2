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
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = "";
//   const y = "";
//   return (
//     <text
//       // x={sd?.length}
//       // y={failedData?.length}
//       x={"10"}
//       y={"50"}
//       fill="black"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };
const Cards = ({ successData: sd, failedData, setCurrentTable }) => {
  console.log("failedData: ", failedData);
  console.log("sd: ", sd);
  const [processCount, setProcessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [autoPostNo, setAutoPostNo] = useState(0);
  const [poData, setPoData] = useState([]);
  console.log("poData: ", poData);

  const getColor = (name) => {
    switch (name) {
      case "SUCCESS":
        return "#3fc23d"; // Green for PROCESS #3d67e6
      case "ERROR":
        return "#ff4747";
      case "AUTO POSTING":
        return "#73b5f2"; // Red for ERROR ff4747
      default:
        return "#e63f66"; // Default color
    }
  };
  useEffect(() => {
    setProcessCount(sd?.length || 0);
    setErrorCount(failedData?.length || 0);
  }, [sd, failedData]);
  const chartData = [
    { name: "AUTO POSTING", value: 56 },
    { name: "SUCCESS", value: processCount },
    { name: "ERROR", value: errorCount },

    // { name: "GR NO", value: 0 }, // You can set a default value for GR NO or fetch it from your data
  ];

  return (
    <Layout>
      {/* <div style={{ display: "flex",    }}> */}
      <div style={{ width: "100%", height: "95vh", border: "3px solid black" }}>
        {/* Cards Row */}
        <div
          style={{
            padding: "10px",
            margin: "auto",
            backgroundClip: "padding-box",
            fontSize: 20,
            fontWeight: 600,
            width: 600,
            marginBottom: 30,
          }}
        >
          Invoice Verification Dashboard
        </div>
        <Row gutter={[16, 16]} justify="center">
          <Col>
            <Link to="/header" state={{ type: "success" }}>
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
                      56
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
            <Link to="/header" state={{ type: "success" }}>
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
            <Link to="/header" state={{ type: "error" }}>
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
      marginTop: 150,
    }}
  >
    {/* Pie Chart */}
    <Card bordered={false} style={{ flex: 1 }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            fill="#8884d8"
            label
            style={{ fontSize: 20 }}
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
    {/* Bar Chart */}
    <Card bordered={false} style={{ flex: 1, marginLeft: "50px" }}>
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
