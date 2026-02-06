export type SystemState = "INIT" | "ACTIVE" | "UNCERTAINTY" | "STOPPED";

export interface SessionState {
  id: string;
  state: SystemState;
}

export interface StateEngineResult {
  session: SessionState;
  response: string;
}

export function initializeSession(id: string): SessionState {
  return {
    id,
    state: "INIT"
  };
}

export function processInput(
  session: SessionState,
  input: string
): StateEngineResult {
  if (session.state === "STOPPED") {
    return {
      session,
      response: "SESSION_STOPPED"
    };
  }

  if (typeof input !== "string" || input.trim() === "") {
    return {
      session: {
        ...session,
        state: "UNCERTAINTY"
      },
      response: "UNCERTAIN_INPUT"
    };
  }

  switch (session.state) {
    case "INIT":
      return {
        session: {
          ...session,
          state: "ACTIVE"
        },
        response: "OK"
      };

    case "ACTIVE":
      return {
        session,
        response: "OK"
      };

    case "UNCERTAINTY":
      return {
        session: {
          ...session,
          state: "ACTIVE"
        },
        response: "OK"
      };

    default:
      return {
        session: {
          ...session,
          state: "UNCERTAINTY"
        },
        response: "UNCERTAIN_STATE"
      };
  }
}
