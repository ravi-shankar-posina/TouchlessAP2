import React, { useState } from "react";
import { Button, Table } from "antd";
import Layout from "../components/Layout";

const SourceData = () => {
  const [currentTable, setCurrentTable] = useState("PO Header");

  // Define your table data and columns for each type
  const dataSourcePOHeader = [
    {
      "Purchasing Document": 3165354054,
      "Company Code": "SG01",
      "Created On": "23-06-2023",
      "Created By": 40020154,
      Supplier: 1800001463,
      "Document Date": "23-06-2023",
      "Doc. condition no.": 1010980721,
      "Invoicing Party": 1800001463,
      "Number of foreign trade data": "0011814534",
      "Our Reference": "23062023",
      "Purchasing doc. processing state": "05",
      "Total val. upon release": 2156.57,
      "Mode of Transport": "02",
      "PO GTC": "06",
    },
    {
      "Purchasing Document": 3165354056,
      "Company Code": "SG01",
      "Created On": "23-07-2023",
      "Created By": 40020154,
      Supplier: 1800001463,
      "Document Date": "23-07-2023",
      "Doc. condition no.": 1010980721,
      "Invoicing Party": 1800001463,
      "Number of foreign trade data": "0011814534",
      "Our Reference": "23072023",
      "Purchasing doc. processing state": "05",
      "Total val. upon release": 1255.05,
      "Mode of Transport": "02",
      "PO GTC": "06",
    },
    {
      "Purchasing Document": 3165354058,
      "Company Code": "SG01",
      "Created On": "23-08-2023",
      "Created By": 40020154,
      Supplier: 1800001473,
      "Document Date": "23-08-2023",
      "Doc. condition no.": 1010980721,
      "Invoicing Party": 1800001473,
      "Number of foreign trade data": "0011814535",
      "Our Reference": "23082023",
      "Purchasing doc. processing state": "05",
      "Total val. upon release": 1017.15,
      "Mode of Transport": "02",
      "PO GTC": "06",
    },
    {
      "Purchasing Document": 3165354062,
      "Company Code": "SG01",
      "Created On": "22/04/2024",
      "Created By": 40020154,
      Supplier: 1800001473,
      "Document Date": "22/04/2024",
      "Doc. condition no.": 1010980721,
      "Invoicing Party": 1800001473,
      "Number of foreign trade data": "0011814535",
      "Our Reference": "23042024",
      "Purchasing doc. processing state": "05",
      "Total val. upon release": 411.25,
      "Mode of Transport": "02",
      "PO GTC": "06",
    },
    {
      "Purchasing Document": 3165354060,
      "Company Code": "SG01",
      "Created On": "15-05-2024",
      "Created By": 40020154,
      Supplier: 1800001483,
      "Document Date": "15-05-2024",
      "Doc. condition no.": 1010980721,
      "Invoicing Party": 1800001483,
      "Number of foreign trade data": "0011814536",
      "Our Reference": "23052024",
      "Purchasing doc. processing state": "05",
      "Total val. upon release": 5917.12,
      "Mode of Transport": "02",
      "PO GTC": "06",
    },
  ];

  const columnsPOHeader = [
    // Your PO Header table columns here
  ];

  const dataSourcePOLines = [
    {
      "Purchasing Document": 3165354054,
      Item: 1,
      Material: "3BSE078762R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 2,
      "Net Order Price": 78.29,
      "Net Order Value": 156.58,
    },
    {
      "Purchasing Document": 3165354054,
      Item: 2,
      Material: "3BSE070093R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 10,
      "Net Order Price": 84.35,
      "Net Order Value": 843.5,
    },
    {
      "Purchasing Document": 3165354054,
      Item: 3,
      Material: "3BSE070124R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 7,
      "Net Order Price": 82.25,
      "Net Order Value": 575.75,
    },
    {
      "Purchasing Document": 3165354054,
      Item: 4,
      Material: "3BSE070125R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 7,
      "Net Order Price": 54.3,
      "Net Order Value": 380.1,
    },
    {
      "Purchasing Document": 3165354054,
      Item: 5,
      Material: "3BSE070126R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 3,
      "Net Order Price": 66.88,
      "Net Order Value": 200.64,
    },
    {
      "Purchasing Document": 3165354056,
      Item: 1,
      Material: "3BSE070126R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 10,
      "Net Order Price": 66.88,
      "Net Order Value": 668.8,
    },
    {
      "Purchasing Document": 3165354056,
      Item: 2,
      Material: "3BSE070093R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 84.35,
      "Net Order Value": 421.75,
    },
    {
      "Purchasing Document": 3165354056,
      Item: 3,
      Material: "3BSE070124R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 2,
      "Net Order Price": 82.25,
      "Net Order Value": 164.5,
    },
    {
      "Purchasing Document": 3165354058,
      Item: 1,
      Material: "3BSE070124R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 82.25,
      "Net Order Value": 411.25,
    },
    {
      "Purchasing Document": 3165354058,
      Item: 2,
      Material: "3BSE070125R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 54.3,
      "Net Order Value": 271.5,
    },
    {
      "Purchasing Document": 3165354058,
      Item: 3,
      Material: "3BSE070126R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 66.88,
      "Net Order Value": 334.4,
    },
    {
      "Purchasing Document": 3165354062,
      Item: 1,
      Material: "3BSE070124R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 82.25,
      "Net Order Value": 411.25,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 1,
      Material: "3BSE078762R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 78.29,
      "Net Order Value": 391.45,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 2,
      Material: "3BSE070093R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 15,
      "Net Order Price": 84.35,
      "Net Order Value": 1265.25,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 3,
      Material: "3BSE070124R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 10,
      "Net Order Price": 82.25,
      "Net Order Value": 822.5,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 4,
      Material: "3BSE070125R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 8,
      "Net Order Price": 54.3,
      "Net Order Value": 434.4,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 5,
      Material: "3BSE070126R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 9,
      "Net Order Price": 66.88,
      "Net Order Value": 601.92,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 6,
      Material: "3BSE070127R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 3,
      "Net Order Price": 73.2,
      "Net Order Value": 219.6,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 7,
      Material: "3BSE070134R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 4,
      "Net Order Price": 78.1,
      "Net Order Value": 312.4,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 8,
      Material: "3BSE070135R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 87.88,
      "Net Order Value": 439.4,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 9,
      Material: "3BSE070142R1",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 11,
      "Net Order Price": 33.0,
      "Net Order Value": 363.0,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 10,
      Material: "3BSE070214-EN",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 112.34,
      "Net Order Value": 561.7,
    },
    {
      "Purchasing Document": 3165354060,
      Item: 11,
      Material: "3BSE070544",
      "Company Code": "SG01",
      Plant: "SGDQ",
      "Storage Location": "MN08",
      "Order Quantity": 5,
      "Net Order Price": 101.1,
      "Net Order Value": 505.5,
    },
  ];

  const columnsPOLines = [
    // Your PO Lines table columns here
  ];

  const dataSourceGR = [
    {
      po: 3165354056,
      item: 2,
      qty: 5,
      amount: 421.75,
    },
    {
      po: 3165354056,
      item: 3,
      qty: 2,
      amount: 164.5,
    },
    {
      po: 3165354058,
      item: 1,
      qty: 5,
      amount: 411.25,
    },
    {
      po: 3165354058,
      item: 2,
      qty: 5,
      amount: 271.5,
    },
    {
      po: 3165354058,
      item: 3,
      qty: 5,
      amount: 334.4,
    },
    {
      po: 3165354060,
      item: 1,
      qty: 5,
      amount: 391.45,
    },
    {
      po: 3165354060,
      item: 2,
      qty: 15,
      amount: 1265.25,
    },
    {
      po: 3165354060,
      item: 3,
      qty: 10,
      amount: 822.5,
    },
    {
      po: 3165354060,
      item: 4,
      qty: 8,
      amount: 434.4,
    },
    {
      po: 3165354060,
      item: 5,
      qty: 9,
      amount: 601.92,
    },
    {
      po: 3165354060,
      item: 6,
      qty: 3,
      amount: 219.6,
    },
    {
      po: 3165354060,
      item: 7,
      qty: 4,
      amount: 312.4,
    },
    {
      po: 3165354060,
      item: 8,
      qty: 5,
      amount: 439.4,
    },
    {
      po: 3165354060,
      item: 9,
      qty: 11,
      amount: 363,
    },
    {
      po: 3165354060,
      item: 10,
      qty: 5,
      amount: 561.7,
    },
    {
      po: 3165354060,
      item: 11,
      qty: 5,
      amount: 505.5,
    },
    {
      po: 3165354062,
      item: null,
      qty: 5,
      amount: 411.25,
    },
  ];

  const columnsGR = [
    // Your GR table columns here
  ];

  const handleButtonClick = (tableName) => {
    setCurrentTable(tableName);
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Button
            type={currentTable === "PO Header" ? "primary" : "default"}
            onClick={() => handleButtonClick("PO Header")}
            style={{ marginRight: "10px" }}
          >
            PO Header
          </Button>
          <Button
            type={currentTable === "PO Lines" ? "primary" : "default"}
            onClick={() => handleButtonClick("PO Lines")}
            style={{ marginRight: "10px" }}
          >
            PO Lines
          </Button>
          <Button
            type={currentTable === "GR" ? "primary" : "default"}
            onClick={() => handleButtonClick("GR")}
          >
            GR
          </Button>
        </div>
        {currentTable === "PO Header" && (
          <Table
            dataSource={dataSourcePOHeader}
            columns={columnsPOHeader}
            bordered
            pagination={false}
          />
        )}
        {currentTable === "PO Lines" && (
          <Table
            dataSource={dataSourcePOLines}
            columns={columnsPOLines}
            bordered
            pagination={false}
          />
        )}
        {currentTable === "GR" && (
          <Table
            dataSource={dataSourceGR}
            columns={columnsGR}
            bordered
            pagination={false}
          />
        )}
      </div>
    </Layout>
  );
};

export default SourceData;
