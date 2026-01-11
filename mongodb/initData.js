const { MongoClient } = require("mongodb");

// We added a timeout so it doesn't hang forever
const uri = "mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=5000";
const client = new MongoClient(uri);

async function init() {
  console.log("1. Script started...");
  try {
    console.log("2. Attempting to connect to MongoDB at 127.0.0.1:27017...");
    await client.connect();
    console.log("3. Connected successfully!");

    const db = client.db("auditDB");
    const users = db.collection("users");

    console.log("4. Cleaning old data...");
    await users.deleteMany({});

    console.log("5. Inserting Alice...");
    const result = await users.insertOne({ name: "Alice", role: "admin" });
    
    console.log(`✅ SUCCESS: Inserted document with ID: ${result.insertedId}`);
  } catch (error) {
    console.error("❌ ERROR REACHED:");
    console.error(error.stack);
  } finally {
    console.log("6. Closing connection.");
    await client.close();
    process.exit(); // Forces the script to end
  }
}

init().catch(err => console.error("GLOBAL ERROR:", err));