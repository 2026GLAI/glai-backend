export type SystemState = "INIT" | "ACTIVE" | "STOPPED";

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
  _input: string
): StateEngineResult {
  return {
    session: {
      ...session,
      state: "ACTIVE"
    },
    response: "OK"
  };
}
