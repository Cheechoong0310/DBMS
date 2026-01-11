const fs = require("fs");
const path = require("path");

function anchor(hash) {
  const ledgerPath = path.join(__dirname, "../blockchain/ledger.json");
  const newEntry = {
    hash: hash,
    timestamp: new Date().toISOString()
  };

  let ledger = [];
  if (fs.existsSync(ledgerPath)) {
    ledger = JSON.parse(fs.readFileSync(ledgerPath));
  }

  ledger.push(newEntry);
  fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));
}

// THE KEY FIX: Export the function directly
module.exports = anchor;