import express from "express";

const app = express();
const PORT = 3000;

/**
 * Health check.
 * This endpoint exists only to verify that the server is running.
 * It has no behavioral meaning.
 */
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

/**
 * Placeholder for /interact endpoint.
 * Behavior is not implemented yet.
 */
app.post("/interact", (_req, res) => {
  res.status(501).json({
    error: "Not implemented",
  });
});

app.listen(PORT, () => {
  console.log(`GLAi backend v1 listening on port ${PORT}`);
});
