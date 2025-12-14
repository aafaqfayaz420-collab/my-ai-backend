import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

/* Test route */
app.get("/", (req, res) => {
  res.send("Backend is running successfully ✅");
});

/* Simple chat route (test ke liye) */
app.post("/chat", async (req, res) => {
  const prompt = req.body.prompt || "Hello";

  res.json({
    reply: "Tumhara backend sahi chal raha hai 👍"
  });
});

/* IMPORTANT: Render ka PORT */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
