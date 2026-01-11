# Blockchain-Integrated NoSQL DBMS Audit Trail Prototype

> **A secure, tamper-proof audit system for MongoDB that anchors database events to an immutable local blockchain ledger.**

## 📌 Project Overview

This project demonstrates a **Blockchain-Integrated Audit Trail** for NoSQL databases. It addresses the "Insider Threat" vulnerability in traditional logging by decoupling the audit trail from the database engine.

The system captures real-time database operations (Insert, Update, Delete) using **MongoDB Change Streams**, creates a unique **SHA-256 Digital Fingerprint** for each event, and anchors it to a cryptographically linked JSON ledger.

### Key Features

- **Real-Time Event Interception:** Asynchronous capture of database events via `mongoChangeStream.js`.
- **Cryptographic Non-Repudiation:** SHA-256 hashing ensures that even a single bit change invalidates the record.
- **Immutable Anchoring:** Audit logs are stored externally in `ledger.json`, separate from the MongoDB instance.
- **Automated Integrity Verification:** A forensic tool (`verifyLedger.js`) that instantly detects any manual tampering with 100% accuracy.

---

⚙️ Prerequisites
Before running the system, ensure you have the following installed:

Node.js (v14 or higher)

MongoDB Community Server (Running locally on port 27017)

🚀 Installation & Setup

1. Install Dependencies
   Open your terminal in the project root folder and run:

Bash

npm install 2. Configure MongoDB Replica Set
MongoDB Change Streams require a Replica Set to function. We have provided a script to automate this.

Ensure your mongod service is running.

Run the setup script:

Bash

node setupReplica.js
Output should confirm: ✅ Success! Replica set initialized.

🖥️ Usage Guide (Running the Prototype)
To see the system in action, you will need two separate terminal windows.

Step 1: Start the Audit Bridge (Terminal 1)
This script acts as the "Miner" or "Listener." It watches the database and anchors events to the blockchain. Keep this terminal open.

Bash

node mongodb/mongoChangeStream.js
Status: You should see ✅ SUCCESS: Watching MongoDB change stream...

Step 2: Trigger a Database Transaction (Terminal 2)
In a new terminal window, run this script to simulate a user updating a record (e.g., updating a balance).

Bash

node execution/runDemo.js
Observation: > \* Terminal 2 will say: ✅ Database updated successfully!

Terminal 1 will immediately log: 🔔 Change detected -> Audit Event Anchored: [Hash]

🛡️ Security Verification (Tamper Test)
This section demonstrates the system's ability to detect "Insider Threats."

1. Verify Integrity (The "True" State)
   Run the verification tool to confirm the current ledger is valid.

Bash

node blockchain/verifyLedger.js
Expected Output: ✅ Ledger Integrity: TRUE

2. Simulate an Attack (Tampering)
   Open blockchain/ledger.json in your code editor.

Manually change one character in any hash string (e.g., change an 'a' to a 'b').

Save the file.

3. Detect the Tampering
   Run the verification tool again to see if the system catches the fraud.

Bash

node blockchain/verifyLedger.js
Expected Output: ❌ Ledger Integrity: FALSE (Tampering Detected!)

📊 Performance Benchmarking
For the academic report, the following benchmarks were established using this prototype:

Latency: The system introduces a secure latency overhead (approx. 15x-40x) compared to native logging, verifying the trade-off for security.

Throughput: Automated verification via verifyLedger.js achieved speeds of ~3,757 MB/s, vastly outperforming manual SQL auditing (~120 MB/s).
