import { Table, Input, message } from "antd";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const InputPage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [file, setFile] = useState(null);

  const requiredColumns = [
    "Purchasing Document",
    "Item",
    "Material",
    "Net Order Price",
    "Order Quantity",
    "Net Order Value",
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile); // Store the file in the state

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const workbook = XLSX.read(event.target.result, { type: "binary" });
          const allData = [];
          const allHeaders = new Set();

          workbook.SheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Log raw data for debugging
            console.log(`Raw data from sheet ${sheetName}:`, rawData);

            if (rawData.length < 2) {
              return;
            }

            const headers = rawData[1];
            rawData.slice(2).forEach((row) => {
              const filteredRow = {};
              let hasData = false;

              requiredColumns.forEach((col) => {
                const colIndex = headers.indexOf(col);
                const value = colIndex >= 0 ? row[colIndex] : "";
                if (value) hasData = true; // Check if there's any non-empty value
                filteredRow[col] = value; // Default to empty string if the column is missing
              });

              // Only add row if it has data
              if (hasData) allData.push(filteredRow);
            });

            // Update allHeaders based on requiredColumns
            requiredColumns.forEach((col) => allHeaders.add(col));
          });

          // Define columns based on requiredColumns
          const cols = Array.from(allHeaders).map((key) => ({
            title: key,
            dataIndex: key,
            key,
          }));

          setData(allData);
          setColumns(cols);

          // Log combined data and columns to the console
          console.log("Combined Data:", JSON.stringify(allData, null, 2));
          console.log("Columns:", JSON.stringify(cols, null, 2));
        } catch (error) {
          message.error(
            "Failed to read file. Please ensure the file format is correct."
          );
        }
      };

      reader.readAsBinaryString(uploadedFile);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Input
        type="file"
        onChange={handleFileUpload}
        style={{ width: 230, marginRight: 20 }}
      />
      {data.length > 0 ? (
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record, index) => index} // Use index as a key for rows
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default InputPage;
