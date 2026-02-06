# /interact API CONTRACT — v1

Этот документ фиксирует HTTP-контракт endpoint `/interact`.
Он является единственным источником истины для backend ↔ client.

Любые изменения контракта:
- только через новую версию
- с обновлением этого файла

---

## 1. ENDPOINT

- Method: POST
- Path: /interact
- Content-Type: application/json

---

## 2. REQUEST

### 2.1 Schema

```json
{
  "sessionId": "string",
  "input": "string"
}
