const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;

    const createHash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

    const reHashCandidateByLength = (candidate) => candidate.length > MAX_PARTITION_KEY_LENGTH ? createHash(candidate) : candidate;

    const createCandidateFromEvent = (event) => {
        const candidate = event.partitionKey || createHash(JSON.stringify(event));
        return typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;
    }

    const candidate = event ? createCandidateFromEvent(event) : TRIVIAL_PARTITION_KEY;

    return reHashCandidateByLength(candidate);
};