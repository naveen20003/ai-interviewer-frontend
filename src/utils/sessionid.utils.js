import { v7 as uuid } from "uuid";


function GenerateSessionId() {
    const sessionId = uuid();

    return sessionId;
}

export default GenerateSessionId