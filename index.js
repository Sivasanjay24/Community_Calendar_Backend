const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
app.use(cors());
dotenv.config();
const Details = require("./model/details");
const mdb = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());
mdb
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Failed", err);
  });
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Backend</h1>");
});
const port = 3001;
app.listen(port, () => console.log(`Server is running on port: ${port}`));


app.post("/details", async (req, res) => {
  try {
    const { Title, Date, Description, Category } = req.body;
    const details = new Details({
      Title,
      Date,
      Description,
      Category,
      status: 'pending', 
    });
    await details.save();
    console.log("Details Stored");
    res.status(201).json({ message: "Details Updated", isStored: true });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ message: "Details Update failed", isStored: false });
  }
});

app.get('/details', async (req, res) => {
  try {
    const events = await Details.find({ status: 'approved' }); 
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/details/pending', async (req, res) => {
  try {
    const events = await Details.find({ status: 'pending' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/details/:id/approve', async (req, res) => {
  try {
    const event = await Details.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/details/:id/reject', async (req, res) => {
  try {
    const event = await Details.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});