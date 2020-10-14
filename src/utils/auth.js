const crypto = require("crypto")

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}
export const verifier = base64URLEncode(crypto.randomBytes(32))

function sha256(buffer) {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest()
}

export const challenge = base64URLEncode(sha256(verifier))
