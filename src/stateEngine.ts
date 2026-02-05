// src/stateEngine.ts

/**
 * This file implements the GLAi v1 State Engine.
 * It follows STATE_ENGINE.md and SYSTEM_STATES.md strictly.
 */

export type State =
  | "Listening"
  | "Understanding"
  | "Responding"
  | "Uncertainty"
  | "Limitation"
  | "EmotionalDeEscalation"
  | "TrustPreservation";

export interface SessionState {
  sessionId: string;
  currentState: State;
  previousState?: State;
  enteredAt: number;
}

/**
 * Result returned by the state engine after processing input.
 */
export interface StateEngineResult {
  state: State;
  responseText: string | null;
}

/**
 * Initialize a new session state.
 * This is the only allowed entry point for new sessions.
 */
export function initializeSession(sessionId: string): SessionState {
  return {
    sessionId,
    currentState: "Listening",
    enteredAt: Date.now(),
  };
}

/**
 * Core state transition function.
 * All state changes must pass through here.
 */
export function processInput(
  session: SessionState,
  userInput: string
): StateEngineResult {
  const trimmed = userInput.trim();

  // Rule: empty or meaningless input leads to Uncertainty
  if (trimmed.length === 0) {
    return transition(session, "Uncertainty", null);
  }

  switch (session.currentState) {
    case "Listening":
      return transition(session, "Understanding", null);

    case "Understanding":
      return transition(session, "Responding", "I understand. Let me help.");

    case "Responding":
      // After responding, return to Listening
      return transition(session, "Listening", null);

    case "Uncertainty":
      return transition(
        session,
        "Uncertainty",
        "I’m not sure I understood. Could you clarify?"
      );

    case "Limitation":
      return transition(
        session,
        "Limitation",
        "I can’t help with that, but I can try another approach."
      );

    case "EmotionalDeEscalation":
      return transition(
        session,
        "Listening",
        "I hear you. Take your time."
      );

    case "TrustPreservation":
      return transition(
        session,
        "Listening",
        "Let’s start again, simply."
      );

    default:
      // Safety net — should never happen
      return transition(session, "Uncertainty", null);
  }
}

/**
 * Performs a validated state transition.
 */
function transition(
  session: SessionState,
  nextState: State,
  responseText: string | null
): StateEngineResult {
  session.previousState = session.currentState;
  session.currentState = nextState;
  session.enteredAt = Date.now();

  return {
    state: nextState,
    responseText,
  };
}
