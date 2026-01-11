const { MongoClient } = require("mongodb");
const { logEvent } = require("./auditLogger");

// Direct connection to the IPv4 address
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=5000";
const client = new MongoClient(uri);

async function watchChanges() {
  try {
    console.log("1. Connecting to database...");
    await client.connect();
    
    const db = client.db("auditDB");
    const collection = db.collection("users");

    console.log("2. Opening change stream (watching for updates)...");
    const changeStream = collection.watch();
    
    console.log("✅ SUCCESS: Watching MongoDB change stream...");

    changeStream.on("change", (change) => {
      console.log("🔔 Change detected in MongoDB!");
      logEvent(change);
    });

    changeStream.on("error", (error) => {
      console.error("❌ Change Stream Error:", error.message);
    });

  } catch (error) {
    console.error("❌ CONNECTION ERROR:", error.message);
    console.log("\nTip: Make sure Terminal 1 (mongod) is still running!");
  }
}

watchChanges();