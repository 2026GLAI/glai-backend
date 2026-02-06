import express from "express";
import { initializeSession, processInput } from "./stateEngine.ts";

const app = express();
app.use(express.json());

const sessions = new Map<string, any>();

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.post("/interact", (req, res) => {
  const { sessionId, input } = req.body ?? {};

  if (!sessionId || typeof input !== "string") {
    res.status(400).json({
      error: "INVALID_REQUEST"
    });
    return;
  }

  let session = sessions.get(sessionId);

  if (!session) {
    session = initializeSession(sessionId);
    sessions.set(sessionId, session);
  }

  const result = processInput(session, input);
  sessions.set(sessionId, result.session);

  res.json({
    sessionId,
    state: result.session.state,
    response: result.response
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`GLAi backend v1 listening on port ${PORT}`);
});
