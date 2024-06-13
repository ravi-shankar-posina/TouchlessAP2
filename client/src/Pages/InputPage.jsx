import React, { useState } from "react";
import { usePO } from "./POContext";
import { Button, Input, message } from "antd";
import Layout from "../components/Layout";

const InputPage = () => {
  const [inputValue, setInputValue] = useState("");
  const { setPONumber } = usePO();
  const id = "6666bfc4eee7d1ee0e79c5c3";
  const handleSubmit = () => {
    // Send PUT request to backend API with the PO number in the URL path
    fetch(`${process.env.REACT_APP_API_URL}/api/postPodata/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ poNumber: inputValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update PO number");
        }
        console.log("PO number updated:", inputValue);
        setPONumber(inputValue);
      })
      .catch((error) => console.error("Error updating PO number:", error));
    message.success("submit");
    setInputValue("");
  };

  return (
    <Layout>
      <div
        style={{ display: "flex", flexDirection: "row", gap: 10, width: 400 }}
      >
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>
          1 = <span>3165354054</span>
        </span>{" "}
        <span>
          2 =<span>3165354060</span>{" "}
        </span>
        <span>
          3 = <span>3165354058</span>{" "}
        </span>
      </div>
    </Layout>
  );
};

export default InputPage;
