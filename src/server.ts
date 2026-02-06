import express, { Request, Response } from "express";
import { initializeSession, processInput } from "./stateEngine.js";

const app = express();

// === CORS ===
app.use((req: Request, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json({ limit: "10kb" }));

const sessions = new Map<string, any>();

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.post("/interact", (req: Request, res: Response) => {
  const { sessionId, input } = req.body ?? {};

  if (!sessionId || typeof input !== "string") {
    res.status(400).json({ error: "INVALID_REQUEST" });
    return;
  }

  let session = sessions.get(sessionId);

  if (!session) {
    if (sessions.size >= 1000) {
      res.status(429).json({ error: "SESSION_LIMIT_REACHED" });
      return;
    }
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

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`GLAi backend listening on port ${PORT}`);
});
