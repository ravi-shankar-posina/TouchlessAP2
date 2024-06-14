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
const Cards = ({ successData: sd, failedData, setCurrentTable }) => {
  const [processCount, setProcessCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const [poData, setPoData] = useState([]);
  console.log("poData: ", poData);

  const getColor = (name) => {
    switch (name) {
      case "SUCCESS":
        return "#3d67e6"; // Green for PROCESS
      case "ERROR":
        return "#e63f66"; // Red for ERROR
      default:
        return "#e63f66"; // Default color
    }
  };
  useEffect(() => {
    setProcessCount(sd?.length || 0);
    setErrorCount(failedData?.length || 0);
  }, [sd, failedData]);
  const chartData = [
    { name: "SUCCESS", value: processCount },
    { name: "ERROR", value: errorCount },
    // { name: "GR NO", value: 0 }, // You can set a default value for GR NO or fetch it from your data
  ];

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
                <b style={{ color: "Black", fontSize: "25px" }}>{sd?.length}</b>
              </Card>
            </Link>
          </Col>

          <Col>
            <Link to="/header" state={{ type: "error" }}>
              <Card
                onClick={() => setCurrentTable("Fail")}
                style={{
                  width: "350px",
                  backgroundColor: "#db5858",
                  paddingRight: "300px",
                  marginLeft: "40px",
                  height: "150px",
                }}
              >
                <b style={{ fontSize: "25px", fontFamily: "monospace" }}>
                  ERROR
                </b>
                <ArrowDownOutlined
                  style={{ color: "black", fontSize: "30px" }}
                />

                <b style={{ fontSize: "20px", color: "black" }}>
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
