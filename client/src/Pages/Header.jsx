import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import { server } from "../constants";
import * as XLSX from "xlsx";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { usePO } from "./POContext";
import Tablecomponet from "./Tablecomponet";
const Process = ({
  DBdata,
  PDFdata,
  setDBdata,
  setPDFdata,
  successData,
  setSuccessData,
  failedData,
  setFailedData,
  currentTable,
  setCurrentTable,
}) => {
  const [myres, setMyres] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editValues, setEditValues] = useState({
    Qty: "",
    Amount: "",
    Tax: "",
    Total: "",
  });

  const onViewClick = (record) => {
    setSelectedRow(record);
    setEditValues({
      Qty: record.Qty,
      Amount: record.Amount,
      Tax: record.Tax,
      Total: record.Total,
    });
    setPdfVisible(true);
  };

  const handleOnClose = () => {
    setPdfVisible(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const handleEditSubmit = async () => {
    const updatedRow = { ...selectedRow, ...editValues };

    try {
      const response = await fetch(
        `${server}/api/update-order/6662d6f0b28fc55535956a76/${selectedRow._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRow),
        }
      );

      if (response.ok) {
        // Update the state immediately
        setMyres((prevData) =>
          prevData.map((item) =>
            item._id === selectedRow._id ? updatedRow : item
          )
        );

        setPdfVisible(false);
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const [pdfBuffer, setpdfbuffer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await fetch(`${server}/api/get-data`);
        if (!orderResponse.ok) {
          throw new Error(`HTTP error! Status: ${orderResponse.status}`);
        }
        const orderData = await orderResponse.json();
        setpdfbuffer(orderData.data[0].pdfBuffer);
        // console.log("Fetched order data:", orderData);

        if (orderData && Array.isArray(orderData.data)) {
          const flattenedOrderData = orderData.data.flatMap((entry) => {
            if (entry.Items && Array.isArray(entry.Items)) {
              return entry.Items.map((item) => ({
                ...item,
                PO_Number: entry.PO_Number,
                _id: item._id,
                pdfBuffer: item.pdfBuffer,
              }));
            } else {
              console.error("Invalid Items structure for entry:", entry);
              return [];
            }
          });

          // Extract PO numbers from order details
          const poNumbers = flattenedOrderData.map((item) => item.PO_Number);

          const headerResponse = await fetch(`${server}/api/get-header-data`);
          if (!headerResponse.ok) {
            throw new Error(`HTTP error! Status: ${headerResponse.status}`);
          }
          const headerData = await headerResponse.json();
          console.log("Fetched headerData:", headerData);

          if (headerData && Array.isArray(headerData.data)) {
            // Filter header data based on PO numbers
            const filteredHeaderData = headerData.data.filter((headerItem) =>
              poNumbers.includes(headerItem.PO_Number)
            );
            console.log("Filtered headerData:", filteredHeaderData);
            setHeaderData(filteredHeaderData);
          } else {
            console.error("Invalid header data structure.");
          }

          setMyres(flattenedOrderData);
        } else {
          console.error("Invalid data structure for order data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (headerData.length > 0 && myres.length > 0) {
      const updatedMyres = myres.map((orderDetail) => {
        const matchingHeader = headerData.find(
          (header) => header.PO_Number === orderDetail.PO_Number
        );
        if (matchingHeader) {
          const totalOrderDetail = parseFloat(orderDetail.Total);
          const totalHeader = parseFloat(matchingHeader.Total);
          if (totalHeader === totalOrderDetail) {
            return { ...orderDetail, status: "Pass" };
          } else {
            return { ...orderDetail, status: "Fail" };
          }
        }
        return { ...orderDetail, status: "Not Found" };
      });

      setMyres(updatedMyres);
    }
  }, [headerData]);

  const columns = [
    { title: "PO Number", dataIndex: "PO_Number", key: "PO_Number" },
    { title: "Line Item", dataIndex: "LineItem", key: "LineItem" },
    { title: "Qty", dataIndex: "Qty", key: "Qty" },
    { title: "Amount", dataIndex: "Amount", key: "Amount" },
    { title: "Tax", dataIndex: "Tax", key: "Tax" },
    { title: "Total", dataIndex: "Total", key: "Total" },
  ];

  const columns1 = [
    { title: "PO Number", dataIndex: "PO_Number", key: "PO_Number" },
    { title: "Line Item", dataIndex: "LineItem", key: "LineItem" },
    { title: "Qty", dataIndex: "Qty", key: "Qty" },
    { title: "Amount", dataIndex: "Amount", key: "Amount" },
    { title: "Tax", dataIndex: "Tax", key: "Tax" },
    { title: "Total", dataIndex: "Total", key: "Total" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        console.log("pdfBuffer:", record);
        return (
          <Button
            style={{ backgroundColor: "#15f4ee" }}
            onClick={() => onViewClick(record)}
            disabled={!pdfBuffer} // This condition determines if the button is disabled
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <Layout>
      <div style={{ width: "100%", padding: "10px", height: "90vh" }}>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Tablecomponet
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
        </div>

        {/* <div style={{ flex: 1, overflow: "hidden", height: "45vh" }}>
          <Table
            columns={columns1}
            dataSource={myres}
            pagination={{ pageSize: 8 }}
          />
        </div> */}

        <Modal
          title="Details Page"
          width={"80%"}
          bodyStyle={{ height: "85vh" }}
          style={{ position: "sticky" }}
          footer={null}
          visible={pdfVisible}
          onCancel={handleOnClose}
          closeIcon={
            <CloseOutlined style={{ fontSize: "20px", color: "#999" }} />
          }
        >
          {pdfVisible && selectedRow ? (
            <div style={{ display: "flex", height: "75vh" }}>
              <div style={{ flex: 0.7, padding: "10px" }}>
                <iframe
                  title="PDF Viewer"
                  src={`data:application/pdf;base64,${pdfBuffer}`}
                  width="100%"
                  height="100%"
                />
              </div>
              <div
                style={{
                  flex: 0.4,
                  padding: "1px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form layout="vertical">
                  <Form.Item label={<b>Qty</b>} style={{ width: "100%" }}>
                    <Input
                      name="Qty"
                      value={editValues.Qty}
                      onChange={handleEditChange}
                    />
                  </Form.Item>
                  <Form.Item label={<b>Amount</b>} style={{ width: "100%" }}>
                    <Input
                      name="Amount"
                      value={editValues.Amount}
                      onChange={handleEditChange}
                    />
                  </Form.Item>
                  <Form.Item label={<b>Tax</b>} style={{ width: "100%" }}>
                    <Input
                      name="Tax"
                      value={editValues.Tax}
                      onChange={handleEditChange}
                    />
                  </Form.Item>
                  <Form.Item label={<b>Total</b>} style={{ width: "100%" }}>
                    <Input
                      name="Total"
                      value={editValues.Total}
                      onChange={handleEditChange}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={handleEditSubmit}>
                    POST
                  </Button>
                </Form>
              </div>
            </div>
          ) : (
            <div>
              <p>Modal content cannot be displayed. Please check the data.</p>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Process;
