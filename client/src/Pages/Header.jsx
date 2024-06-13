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
const Process = ({ DBdata, PDFdata, setDBdata, setPDFdata ,successData,setSuccessData,failedData,setFailedData, currentTable, setCurrentTable}) => {
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
  const [activeTable, setActiveTable] = useState(null);

  const handleVerifyClick = () => {
    setActiveTable("verify");
  };

  const handleSuccessClick = () => {
    setActiveTable("success");
  };

  // Usage example:
  // <VerifyTable poNumber="3165354054" />; // Replace with the desired PO number
  // <SuccessTable poNumber="3165354054" />; // Replace with the desired PO number

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
        },
      );

      if (response.ok) {
        // Update the state immediately
        setMyres((prevData) =>
          prevData.map((item) =>
            item._id === selectedRow._id ? updatedRow : item,
          ),
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
              poNumbers.includes(headerItem.PO_Number),
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
          (header) => header.PO_Number === orderDetail.PO_Number,
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

      // console.log("Updated myres with status:", updatedMyres);
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
  // columns
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = (key) => {
    const row = data.find((item) => item.key === key);
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item });
      setData(newData);
      setEditingKey("");
    }
  };
  const handleChange = (value, key, column) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, [column]: value });
      setData(newData);
    }
  };
  const EditableCell = ({ editable, value, onChange }) => {
    return editable ? (
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </div>
    );
  };
  const columns2 = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
      width: 200,
    },
    {
      title: "Item",
      dataIndex: "Item",
      key: "Item",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Qty",
      dataIndex: "Qty",
      key: "Qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <EditableCell
          editable={isEditing(record)}
          value={text}
          onChange={(value) => handleChange(value, record.key, "price")}
        />
      ),
      width: 200,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (text, record) => (
        <EditableCell
          editable={isEditing(record)}
          value={text}
          onChange={(value) => handleChange(value, record.key, "Amount")}
        />
      ),
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>, // Render the status
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.key)} type="link">
              Save
            </Button>
            <Button onClick={cancel} type="link">
              Cancel
            </Button>
          </span>
        ) : (
          <Button disabled={editingKey !== ""} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
      width: 200,
    },
  ];
  const sucessColumns = [
    {
      title: "Purchasing Document",
      dataIndex: "poNum",
      key: "poNum",
    },
    {
      title: "Item",
      dataIndex: "Item",
      key: "Item",
    },
    {
      title: "Material",
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>, // Render the status
    },
  ];

  const xldata = [
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
      Item: 1,
      Material: "3BSE078762R1",
      qty: 5,
      price: 78.29,
      Amount: 391.45000000000005,
      key: 10,
    },
    {
      poNum: "3165354060",
      Item: 2,
      Material: "3BSE070093R1",
      qty: 15,
      price: 84.35,
      Amount: 1265.25,
      key: 11,
    },
    {
      poNum: "3165354060",
      Item: 3,
      Material: "3BSE070124R1",
      qty: 10,
      price: 82.25,
      Amount: 822.5,
      key: 12,
    },
    {
      poNum: "3165354060",
      Item: 4,
      Material: "3BSE070125R1",
      qty: 8,
      price: 54.3,
      Amount: 434.4,
      key: 13,
    },
    {
      poNum: "3165354060",
      Item: 5,
      Material: "3BSE070126R1",
      qty: 9,
      price: 66.88,
      Amount: 601.92,
      key: 14,
    },
    {
      poNum: "3165354060",
      Item: 6,
      Material: "3BSE070127R1",
      qty: 3,
      price: 73.2,
      Amount: 219.60000000000002,
      key: 15,
    },
    {
      poNum: "3165354060",
      Item: 7,
      Material: "3BSE070134R1",
      qty: 4,
      price: 78.1,
      Amount: 312.4,
      key: 16,
    },
    {
      poNum: "3165354060",
      Item: 8,
      Material: "3BSE070135R1",
      qty: 5,
      price: 87.88,
      Amount: 439.4,
      key: 17,
    },
    {
      poNum: "3165354060",
      Item: 9,
      Material: "3BSE070142R1",
      qty: 11,
      price: 33,
      Amount: 363,
      key: 18,
    },
    {
      poNum: "3165354060",
      Item: 10,
      Material: "3BSE070214-EN",
      qty: 5,
      price: 112.34,
      Amount: 561.7,
      key: 19,
    },
    {
      poNum: "3165354060",
      Item: 11,
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
      Material: "3BSE078762",
      qty: 5,
      price: 78.29,
      Amount: 391.45,
      key: 6,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      DESCRIPTION: "PFPC203-A Cylmate Transducer",
      key: 7,
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
      DESCRIPTION: "Bus Socket",
      key: 9,
      status: "Successfully Process",
    },
    {
      poNum: "3165354060",
      Item: 30,
      Material: "3BSE070124R1",
      DESCRIPTION: "EOW-x2 workplace",
      Material: "3BSE070124",
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
      Material: "3BSE070125",
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
      Material: "3BSE070126",
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
      Material: "3BSE070127",
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
      Material: "3BSE070134",
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
      Material: "3BSE070135",
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
      Material: "3BSE070142",
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
      Material: "3BSE070214-",
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
      Material: "3BSE070544",
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
  const [loading, setLoading] = useState(false);
  // const [pdfData, setPdfData] = useState([]);

  // const { poNumber } = usePoNumberStore();
  // console.log("poNumber: ", poNumber);

  // useEffect(() => {
  //   // Function to fetch PDF data from the API
  //   const fetchPdfData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3001/api/getPdfData",
  //         {
  //           poNum: "3165354054", // Replace with the PO number you want to fetch
  //         }
  //       );
  //       setPdfData(response.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching PDF data:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchPdfData();
  // }, [poNumber]);

  // const { poNumber } = usePO();
  // console.log("poNumber: ", poNumber);
  // const filterData = (poNumber) => {
  //   console.log("poNumber: ", poNumber);
  //   const verifyData = [];
  //   const successData = [];

  //   const filteredXlData = xldata.filter(
  //     (row) => String(row.poNum) === poNumber
  //   );
  //   console.log("filteredXlData: ", filteredXlData);

  //   const filteredPdfData = pdfData.filter(
  //     (row) => String(row.poNum) === poNumber
  //   );
  //   console.log("filteredPdfData: ", filteredPdfData);

  //   // Iterate through filtered xldata and compare with filtered pdfData
  //   filteredXlData.forEach((row) => {
  //     const matchingRow = filteredPdfData.find(
  //       (item) =>
  //         Math.floor(item.price) === Math.floor(row.price) &&
  //         Math.floor(item.Amount) === Math.floor(row.Amount)
  //     );

  //     if (!matchingRow) {
  //       row.status = "error"; // Add status property to row
  //       verifyData.push(row); // Add to verify table if no match is found
  //     } else {
  //       row.status = "success"; // Add status property to row
  //       successData.push(row); // Add to success table if a match is found
  //     }
  //   });

  //   return { verifyData, successData };
  // };

  // const VerifyTable = ({ poNumber }) => {
  //   console.log("poNumber: ", poNumber);
  //   const { verifyData } = filterData(poNumber);
  //   return <Table dataSource={verifyData} columns={columns2} />;
  // };

  // const SuccessTable = ({ poNumber }) => {
  //   console.log("poNumber: ", poNumber);
  //   const { successData } = filterData(poNumber);
  //   return (
  //     <Table
  //       dataSource={successData}
  //       scroll={{ y: 252 }}
  //       columns={sucessColumns}
  //     />
  //   );
  // };

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
                      currentTable = {currentTable}
                      setCurrentTable = {setCurrentTable}
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
