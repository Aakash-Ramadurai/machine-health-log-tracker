const express = require("express");
const cors = require("cors");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const app = express();
app.use(cors());
app.use(express.json());

const client = new DynamoDBClient({ region: "ap-south-1" });
const db = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "MachineHealthLog";

// GET all machines
app.get("/machines", async (req, res) => {
  try {
    const data = await db.send(new ScanCommand({ TableName: TABLE_NAME }));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new machine log
app.post("/machines", async (req, res) => {
  try {
    const item = req.body;
    await db.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
    res.json({ message: "Machine log saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});