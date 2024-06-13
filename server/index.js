const express = require("express");
const bodyParser = require("body-parser");
const { simpleParser } = require("mailparser");
const pdf = require("pdf-parse");
const Imap = require("imap");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const app = express();
app.use(cors({}));
const PORT = 3001;

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
app.post("/api/parse-emails", async (req, res, next) => {
  const imapConfig = {
    user: req.body.user,
    password: req.body.password,
    host: req.body.host,
    port: req.body.port,
    tls: req.body.tls,
  };

  try {
    const imap = new Imap(imapConfig);
    imap.once("ready", () => {
      imap.openBox("INBOX", false, () => {
        imap.search(["UNSEEN", ["SINCE", new Date()]], (err, results) => {
          if (err) {
            return next(err);
          }

          if (results.length === 0) {
            res.json({ success: true, message: "No new messages to fetch" });
            imap.end();
            return;
          }

          const f = imap.fetch(results, { bodies: "" });
          let attachmentsCount = 0;

          f.on("message", (msg) => {
            let senderEmail;
            let attachmentsData = [];
            msg.on("body", (stream) => {
              simpleParser(stream, async (err, parsed) => {
                const { attachments, from } = parsed;

                senderEmail = "ChittyaRanjan.Bej@genpact.com";
                // from.value[0].address;

                if (Array.isArray(attachments) && attachments.length > 0) {
                  console.log(`Number of attachments: ${attachments.length}`);
                  attachmentsCount += attachments.length;

                  for (let i = 0; i < attachments.length; i++) {
                    const currentAttachment = attachments[i];

                    if (currentAttachment.contentType === "application/pdf") {
                      const pdfBuffer = currentAttachment.content;
                      try {
                        const data = await pdf(pdfBuffer);
                        const pdfText = data.text;

                        const jsonFromText = parseTextToJSON(pdfText);

                        fs.writeFile("attachment.pdf", pdfBuffer, (err) => {
                          if (err) {
                            console.error("Error writing PDF file:", err);
                            res.status(500).json({
                              success: false,
                              error: "Error writing PDF file",
                            });
                            return;
                          } else {
                            console.log(
                              "PDF file has been successfully created."
                            );
                          }
                        });

                        attachmentsData.push({
                          ...jsonFromText,
                          pdfBuffer: pdfBuffer.toString("base64"),
                          senderEmail,
                          attachmentsCount,
                        });

                        if (i === attachments.length - 1) {
                          const dbo = await connect();
                          await dbo
                            .collection("orderdetails")
                            .insertMany(attachmentsData);
                        }
                      } catch (jsonError) {
                        res.status(500).json({
                          success: false,
                          error: jsonError.message,
                        });
                      }
                    } else {
                      res.status(400).json({
                        success: false,
                        error: "Attachment is not a PDF",
                      });
                    }
                  }
                } else {
                  attachmentsCount = 0;
                  console.log(senderEmail);
                  const dbo = await connect();
                  const OrderDetails = dbo.collection("orderdetails");
                  await OrderDetails.insertOne({
                    companyName: "",
                    po_number: "",
                    quantity: "",
                    Amount: "",
                    pdfBuffer: "",
                    senderEmail,
                    attachmentsCount,
                  });
                }
              });
            });

            msg.once("attributes", (attrs) => {
              const { uid } = attrs;
              imap.addFlags(uid, ["\\Seen"], () => {
                console.log("Marked as read!");
              });
            });
          });

          f.once("error", (ex) => {
            console.log(ex.message);
            res.status(500).json({ success: false, error: ex.message });
          });

          f.once("end", () => {
            console.log("Done fetching all messages!");
            imap.end();
          });
        });
      });
    });

    imap.once("error", (err) => {
      console.log(err);
      res.status(500).json({ success: false, error: err.message });
    });

    imap.once("end", () => {
      console.log("Connection ended");
    });

    imap.connect();
  } catch (ex) {
    res.status(500).json({ success: false, error: ex.message });
  }
});

// POST API to fetch data based on a filter
app.post("/api/getXlData", async (req, res) => {
  try {
    const { poNum } = req.body; // Extract ponumber from request body
    console.log("poNum: ", poNum);
    if (!poNum) {
      return res
        .status(400)
        .json({ success: false, error: "ponumber is required" });
    }

    const dbo = await connect();
    const filter = { poNum }; // Construct the filter object
    const orders = await dbo.collection("xlData").find(filter).toArray();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
app.post("/api/getPdfData", async (req, res) => {
  try {
    const { poNum } = req.body; // Extract po number from request body
    if (!poNum) {
      return res
        .status(400)
        .json({ success: false, error: "PO number is required" });
    }

    const dbo = await connect();
    const filter = { poNum }; // Construct the filter object
    const orders = await dbo.collection("pdfData").find(filter).toArray();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
const orderItemSchema = new mongoose.Schema({
  Product: String,
  LineItem: String,
  Qty: Number,
  Amount: Number,
  Tax: Number,
  Total: Number,
});

const orderDetailSchema = new mongoose.Schema({
  CompanyName: String,
  PO_Number: String,
  Items: [orderItemSchema],
  senderEmail: String,
  pdfBuffer: String,
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
