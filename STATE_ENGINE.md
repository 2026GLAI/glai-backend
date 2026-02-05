# STATE_ENGINE

## Purpose

This document defines how GLAi v1 represents, stores,
and transitions between behavioral states on the backend.

It is implementation-agnostic.
No programming language, framework, or database is assumed.

The goal is behavioral correctness, not performance.

---

## Core Concept

GLAi operates as a strict state machine.

At any moment, a session is in exactly one state,
as defined in SYSTEM_STATES.md.

State transitions are explicit, controlled,
and must be logged.

---

## State Representation

Each session must have:

- session_id
- current_state
- previous_state (optional)
- timestamp_entered
- context_snapshot (minimal)

No hidden or inferred state is allowed.

---

## Allowed States

Only states defined in SYSTEM_STATES.md are valid.

Any unknown or invalid state must immediately
transition to **Uncertainty**.

---

## Transition Rules

A state transition may occur only when:

- user input is received
- system uncertainty is detected
- a limitation is triggered
- a failure condition occurs
- recovery is initiated

Transitions must never be implicit.

---

## Transition Validation

Before changing state, the engine must verify:

- target state is allowed
- transition is permitted by STATE_TRANSITION_TABLE.md
- no STOP_RULE is active

If validation fails:
- transition is denied
- system remains in current state
- TRUST_PRESERVATION applies

---

## Default Behavior

If state cannot be determined reliably:

- transition to **Uncertainty**
- slow down interaction
- request clarification if allowed

Guessing is forbidden.

---

## Failure Handling

If the state engine fails internally:

- interaction must pause
- FAILURE_HANDLING rules apply
- no response may be generated from an unknown state

Silence is acceptable.
Incorrect behavior is not.

---

## Logging Requirements

Every state transition must be logged with:

- session_id
- from_state
- to_state
- trigger reason
- timestamp

Logs must be sufficient for audit,
not for analytics or optimization.

---

## Non-Goals

The state engine must not:

- optimize responses
- learn from behavior
- adapt state rules dynamically
- bypass validation for speed

---

## Authority

This document is subordinate to:
- SYSTEM_STATES.md
- STATE_TRANSITION_TABLE.md
- STOP_RULES.md

If conflict exists,
those documents override this one.

---

## Final Rule

The state engine exists to protect the user,
not to maximize throughput.

Correctness over cleverness.
Restraint over speed.

End of Document
