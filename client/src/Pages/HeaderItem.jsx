import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import Layout from "../components/Layout";
import axios from "axios";

const HeaderItem = () => {
  const [currentTable, setCurrentTable] = useState("PO Header");
  const [headerItem, setHeaderItem] = useState("");
  const [loading, setLoading] = useState(true);

  const columnsPOLines = [
    {
      dataIndex: "poNumber",
      key: "poNumber",
      title: "PO Document",
    },
    {
      dataIndex: "poDate",
      key: "poDate",
      title: "PO Date",
      width: 140,
    },
    {
      dataIndex: "vendor",
      key: "vendor",
      title: "Vendor No.",
    },
    {
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      title: "Invoice Date",
      width: 120,
    },
    {
      dataIndex: "invoiceNo",
      key: "invoiceNo",
      title: "Invoice No",
    },
    {
      dataIndex: "payment",
      key: "payment",
      title: "Payment Terms",
    },
    {
      dataIndex: "delivery",
      key: "delivery",
      title: "Delivery Terms",
    },
    {
      dataIndex: "shipping",
      key: "shipping",
      title: "Shipping and Handling",
    },
    {
      dataIndex: "tax",
      key: "tax",
      title: "Sales Tax",
    },
    {
      dataIndex: "excise",
      key: "excise",
      title: "Excise Tax",
    },
    {
      dataIndex: "fees",
      key: "fees",
      title: "Additional Fees",
    },
    {
      dataIndex: "lateCharges",
      key: "lateCharges",
      title: "Late payment Charges",
    },
    {
      dataIndex: "discount",
      key: "discount",
      title: "Discounts & Adjustments",
    },
  ];

  const getHeaderItems = async (values) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/getHeaderItems`,
        {}
      );

      setHeaderItem(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };
  useEffect(() => {
    getHeaderItems();
  }, []);
  const handleButtonClick = (tableName) => {
    setCurrentTable(tableName);
  };
  const [dateString, setDateString] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateString(getFormattedDate());
    }, 1000); // Update dateString every second (1000 milliseconds)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return (
    <Layout>
      <div style={{}}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 25,
            fontWeight: 450,
            marginBottom: 10,
          }}
        >
          Invoice Verification
        </span>
        <span
          style={{
            display: "flex",
            justifyContent: "start",
            fontSize: 20,
            marginBottom: 4,
          }}
        >
          Invoice Header Details
        </span>
        <div style={{ padding: 4 }}>
          {" "}
          <Table
            dataSource={headerItem}
            columns={columnsPOLines}
            pagination={false}
            bordered
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HeaderItem;
