# FIRST_BACKEND_ENDPOINT

## Purpose

This document defines the first and only mandatory backend endpoint
required to operate GLAi v1.

It establishes the minimal API contract between client and backend,
focused on safety, clarity, and state correctness.

---

## Core Principle

GLAi v1 exposes as little surface area as possible.

One endpoint is sufficient.

More endpoints increase risk without increasing trust.

---

## Endpoint Overview

Name: `/interact`  
Method: `POST`

This endpoint handles:

- user input
- session continuity
- state transitions
- safe response delivery

No other endpoint is required for v1.

---

## Request Structure

The request must contain:

- session_id (string)
- user_input (string)
- client_metadata (optional)

The backend must not assume:
- formatting
- language correctness
- intent clarity

---

## Response Structure

The response must contain:

- session_id
- current_state
- response_text (may be empty)
- flags (optional)

The response must never include:
- internal errors
- stack traces
- system explanations
- confidence indicators

---

## State Handling

Upon receiving a request, the backend must:

1. Validate session_id
2. Retrieve or initialize session state
3. Process input through STATE_ENGINE
4. Determine allowed response
5. Return response consistent with current_state

At no point may the backend skip state validation.

---

## Failure Conditions

If any step fails:

- FAILURE_HANDLING rules apply
- response may be limited or empty
- trust preservation overrides completeness

Silence is preferable to an incorrect response.

---

## Security & Abuse Considerations

The endpoint must:

- accept arbitrary text safely
- resist malformed input
- apply rate limiting silently
- avoid behavioral change under load

Abuse is handled through limitation,
not confrontation.

---

## Non-Goals

This endpoint does not:

- stream responses
- provide analytics
- expose configuration
- support multi-step workflows

These are explicitly out of scope for v1.

---

## Authority

This document is governed by:

- STATE_ENGINE.md
- SYSTEM_STATES.md
- STOP_RULES.md
- DATA_BOUNDARIES.md

If conflict exists,
those documents override this one.

---

## Final Rule

If implementing this endpoint requires creativity,
the implementation is wrong.

Minimalism is the feature.

End of Document
