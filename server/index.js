const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { simpleParser } = require("mailparser");
const pdf = require("pdf-parse");
const Imap = require("imap");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { error } = require("console");
const { ObjectId } = mongoose.Types;
const bcrypt = require("bcrypt");
const app = express();
app.use(cors({}));
const PORT = 5005;

require("dotenv").config();

const buildpath = path.join(__dirname, "../client/build");
app.use(express.static(buildpath));

app.use(bodyParser.json());

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const url =
  "mongodb+srv://rajeshdumpala1432:Tail%401234@cluster0.wyobtyc.mongodb.net/TouchlessAP";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const connect = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(url);
  }
  return mongoose.connection;
};

const parseTextToJSON = (pdfText) => {
  const lines = pdfText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const headerIndex = lines.findIndex((line) => line.startsWith("Product"));
  const headers = lines[headerIndex].split(/\s+/);
  const tableLines = lines.slice(headerIndex + 1);

  const items = tableLines.map((line) => {
    const [Product, LineItem, Qty, Amount, Tax, Total] = line.split(/\s+/);
    return { _id: new ObjectId(), Product, LineItem, Qty, Amount, Tax, Total };
  });

  const jsonResult = {
    CompanyName: lines[2].replace("PURCHASE", "").trim(),
    PO_Number: lines[3].split(" ")[3],
    Items: items,
  };

  console.log(JSON.stringify(jsonResult, null, 2));

  return jsonResult;
};

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing credentials" });
  }

  try {
    const dbo = await connect();
    const collection = dbo.collection("users");

    // Find the user with the given email
    const user = await collection.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Successful login, create token payload
        const payload = {
          user: {
            id: user._id,
            email: user.email,
            role: user.role, // Assuming you have a role field in your user schema
          },
        };

        // Sign the token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              message: "Login successful",
              token: token,
              data: user,
            });
          }
        );

        return;
      }
    }

    // Invalid credentials
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/api/getUsers", async (req, res) => {
  try {
    const dbo = await connect();
    const collection = dbo.collection("users");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/api/updatePdfData/:id", async (req, res) => {
  const { id } = req.params;
  const { qty, amount, status } = req.body;

  try {
    const dbo = await connect();
    const collection = dbo.collection("pdfdata");
    const pdfData = await collection.findOne({ _id: new ObjectId(id) });
    if (!pdfData) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update fields conditionally
    if (qty !== undefined) {
      pdfData.qty = qty;
    }
    if (status !== undefined) {
      pdfData.status = status;
    }
    if (amount !== undefined) {
      pdfData.amount = amount;
    }

    // Save the updated document
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: pdfData });

    res.status(200).json({ message: "Document updated successfully", pdfData });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({ message: "Error updating document", error });
  }
});
app.post("/api/registerUser", async (req, res) => {
  try {
    const { email, password, role, username, vendor } = req.body;
    const dbo = await connect();
    const collection = dbo.collection("users");

    // Check if the user already exists
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await collection.insertOne({
      email,
      password: hashedPassword,
      role,
      username,
      vendor,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.post("/api/postPodata/:poid", async (req, res) => {
  try {
    const { poNumber } = req.body; // Extract key and poNumber from request body
    const dbo = await connect();
    const collection = dbo.collection("poNumber");
    const poid = req.params.poid;
    const update = { $set: { poNumber } }; // Construct the update object
    const filter = { _id: new ObjectId(poid) };
    const result = await collection.updateOne(filter, update);
    // console.log(result);

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    res.status(200).json({ success: true, message: "Document updated" });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
app.get("/api/getPodata", async (req, res) => {
  try {
    const dbo = await connect();
    const collection = dbo.collection("poNumber");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching PO data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/postHeaderItems", async (req, res) => {
  try {
    const dbo = await connect();
    const collection = dbo.collection("xldata");

    const data = req.body;

    // Insert data into the collection
    const result = await collection.insertMany(data);

    res.status(201).json({
      message: "Data inserted successfully",
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An error occurred while inserting data" });
  }
});
app.get("/api/getHeaderItems", async (req, res) => {
  try {
    const dbo = await connect();
    const collection = dbo.collection("headeritems");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get pdf data and xl data
app.get("/api/getPdfData", async (req, res) => {
  try {
    const dbo = await connect();
    const collection = dbo.collection("pdfdata");
    const data = await collection.find({}).toArray();
    // Ensure the response is an array
    if (Array.isArray(data)) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: "Data format error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get pdf data and xl data
app.get("/api/getXlData", async (req, res) => {
  try {
    const dbo = await connect();
    const collection = dbo.collection("xldata");
    const data = await collection.find({}).toArray();
    // Ensure the response is an array
    if (Array.isArray(data)) {
      res.status(200).json(data);
    } else {
      res.status(500).json({ error: "Data format error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
