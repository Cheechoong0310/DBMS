const hashEvent = require("../middleware/hashEvent");
const anchor = require("../middleware/anchorToBlockchain");

function logEvent(change) {
  const auditEvent = {
    operation: change.operationType,
    documentId: change.documentKey._id,
    timestamp: new Date()
  };

  const hash = hashEvent(auditEvent);
  anchor(hash);

  console.log("Audit Event Anchored:", hash);
}

// Export as an object for better compatibility
module.exports = { logEvent };