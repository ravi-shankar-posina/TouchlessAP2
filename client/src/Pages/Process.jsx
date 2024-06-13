import React, { useState, useEffect } from "react";
import { Table, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { server } from "../constants";
import Layout from "../components/Layout";

const Process = () => {
  console.log(server);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [myres, setMyres] = useState([]);
  const [showPdf, setShowPdf] = useState(false);

  const navigate = useNavigate();  // Initialize useNavigate

  const handleOnSubmit = () => {
    // Your submit logic here
  };

  const onDeleteClick = async (record) => {
    try {
      console.log("process.env:", process.env);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/delete-data/${record._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Deleted Successfully");
        const updatedData = myres.filter((item) => item._id !== record._id);
        setMyres(updatedData);
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }   
  };

  const handleOnClose = () => {
    setPdfVisible(false);
    setShowPdf(false); // Hide PDF when modal is closed
  };

  const onViewClick = (record) => {
    console.log("onViewClick triggered");
    setSelectedRow(record);
    setPdfVisible(true);
    navigate('/header');  // Navigate to the "Header" page
  };

  const onInnerViewClick = () => {
    setShowPdf(true); // Show PDF when inner view button is clicked
  };

  const closePdfViewer = () => {
    setShowPdf(false); // Hide PDF viewer
  };

  useEffect(() => {
    console.log(selectedRow);
    if (selectedRow && selectedRow.data) {
      console.log("selectedRow.data in useEffect:", selectedRow.data);
    }
  }, [selectedRow]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch(`${server}/api/get-data`);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);

        // Check if data.data is an array
        if (Array.isArray(data.data)) {
          // Add a serial number to each data object
          const dataWithSerial = data.data.map((item, index) => ({
            ...item,
            sno: index + 1,
          }));
          // Update component state with fetched data
          setMyres(dataWithSerial);
        } else {
          console.error("Invalid data structure. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "Sno", dataIndex: "sno", key: "sno" },
    { title: "Email_Id", dataIndex: "senderEmail", key: "senderEmail" },
    {
      title: "No. of Attachments",
      dataIndex: "attachmentsCount",
      key: "attachmentsCount",
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      render: (text, record) => (
        <span>
          {record.attachmentsCount > 0 ? (
            <Checkbox checked disabled />
          ) : (
            "No Attachment"
          )}
        </span>
      ),
    },
    { title: "GR Status", dataIndex: "grStatus", key: "grStatus" },
    { title: "GR No", dataIndex: "grNo", key: "grNo" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            style={{ backgroundColor: "#15f4ee" }}
            onClick={() => {
              onViewClick(record);
            }}
            disabled={record.attachmentsCount === 0}
          >
            View
          </Button>
          <Button
            type="danger"
            style={{ color: "#fd5c63" }}
            onClick={() => onDeleteClick(record)}
          >
            <b>Delete</b>
          </Button>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ width: "100%", padding: "10px", height: "90vh" }}>
        <Table
          columns={columns}
          dataSource={myres}
          pagination={{ pageSize: 8 }}
        />
      </div>
    </Layout>
  );
};

export default Process;















