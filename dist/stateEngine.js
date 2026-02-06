export function initializeSession(id) {
    return {
        id,
        state: "INIT"
    };
}
export function processInput(session, input) {
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
