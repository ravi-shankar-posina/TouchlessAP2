import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Input, Form, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Layout from "../components/Layout";
import { server } from "../constants";
import axios from "axios";
import Tablecomponet from "./Tablecomponet";

const PoLineItems = ({
  DBdata,
  setDBdata,
  failedData,
  setFailedData,
  successData,
  setSuccessData,
  PDFdata,
  setPDFdata,
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

  const [currentTable, setCurrentTable] = useState("");
  const [loading, setLoading] = useState(true);

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

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-screen gap-3">
  //       <Spin /> Loading...
  //     </div>
  //   );
  // }
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

export default PoLineItems;
