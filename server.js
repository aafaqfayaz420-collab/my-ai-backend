const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// GROQ API ROUTE
// ----------------------
app.post("/groq", async (req, res) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: req.body.prompt }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data?.choices?.[0]?.message?.content || "No response received"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Groq from "groq-sdk";
import fetch from "node-fetch";
import dotenv from "dotenv";


dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
res.send("Backend is working!");
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
