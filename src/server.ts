import express from "express";
import { initializeSession, processInput } from "./stateEngine.ts";
import type { SessionState } from "./stateEngine.ts";

const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * In-memory session store.
 * Acceptable for v1. Persistence is out of scope.
 */
const sessions = new Map<string, SessionState>();

/**
 * Health check endpoint.
 */
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

/**
 * Core interaction endpoint.
 * Pure wiring: HTTP → state engine.
 */
app.post("/interact", (req, res) => {
  const { session_id, user_input } = req.body ?? {};

  if (typeof session_id !== "string" || typeof user_input !== "string") {
    return res.status(400).json({
      error: "Invalid request",
    });
  }

  let session = sessions.get(session_id);

  if (!session) {
    session = initializeSession(session_id);
    sessions.set(session_id, session);
  }

  const result = processInput(session, user_input);

  return res.status(200).json({
    session_id: session.sessionId,
    current_state: result.state,
    response_text: result.responseText,
  });
});

app.listen(PORT, () => {
  console.log(`GLAi backend v1 listening on port ${PORT}`);
});
