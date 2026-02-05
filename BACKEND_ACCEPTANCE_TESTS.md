# BACKEND_ACCEPTANCE_TESTS

## Purpose

This document defines the acceptance criteria for GLAi Backend v1.

If these conditions are met,
the backend is considered functionally correct,
regardless of internal implementation details.

---

## General Acceptance Rule

The backend passes acceptance if:

- all responses respect SYSTEM_STATES
- all transitions follow STATE_ENGINE rules
- all failures preserve USER_TRUST
- no behavior contradicts glai-mobile documentation

---

## Test Group 1 — Session Handling

### Test 1.1 — New Session Initialization

Given:
- a request with a new session_id

Then:
- a session is created
- initial state is Listening or Uncertainty
- no assumptions are made

---

### Test 1.2 — Session Continuity

Given:
- multiple requests with the same session_id

Then:
- state continuity is preserved
- no state reset occurs unless required
- previous_state is tracked when applicable

---

## Test Group 2 — State Transitions

### Test 2.1 — Valid Transition

Given:
- a clear user input

Then:
- transition follows STATE_TRANSITION_TABLE
- response matches current_state behavior

---

### Test 2.2 — Invalid Transition Attempt

Given:
- a transition not allowed by STATE_TRANSITION_TABLE

Then:
- transition is denied
- state remains unchanged
- no response violates STOP_RULES

---

## Test Group 3 — Uncertainty Handling

### Test 3.1 — Ambiguous Input

Given:
- ambiguous or incomplete user input

Then:
- system transitions to Uncertainty
- at most one clarifying question is asked
- tone remains calm and neutral

---

### Test 3.2 — Insufficient Information

Given:
- not enough data to respond safely

Then:
- system admits uncertainty
- guessing does not occur

---

## Test Group 4 — Failure Handling

### Test 4.1 — Internal Failure

Given:
- a backend processing error

Then:
- FAILURE_HANDLING rules apply
- no internal details are exposed
- user trust is preserved

---

### Test 4.2 — No Response Available

Given:
- no safe response can be generated

Then:
- silence or minimal response is returned
- no misleading content is provided

---

## Test Group 5 — Abuse & Load

### Test 5.1 — Rapid Requests

Given:
- rapid repeated requests

Then:
- rate limiting is applied silently
- behavior does not degrade in tone or meaning

---

### Test 5.2 — Malformed Input

Given:
- invalid or malformed request data

Then:
- system handles input safely
- no crash or undefined behavior occurs

---

## Test Group 6 — Trust Preservation

### Test 6.1 — Previous Failure Recovery

Given:
- a failed interaction followed by a new request

Then:
- system acknowledges failure if appropriate
- interaction resets calmly
- trust is prioritized over task completion

---

## Final Acceptance Rule

If any acceptance test fails,
GLAi Backend v1 is not considered complete.

Fix the behavior, not the test.

End of Document
