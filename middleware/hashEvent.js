const crypto = require("crypto");

function hashEvent(event) {
  // Creating a unique digital fingerprint of the database change
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(event))
    .digest("hex");
}

//Export the function directly
module.exports = hashEvent;