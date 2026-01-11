const { MongoClient } = require("mongodb");

// Changed 'localhost' to '127.0.0.1' and added a direct connection flag
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=5000";
const client = new MongoClient(uri);

async function setup() {
  try {
    console.log("Connecting to MongoDB at 127.0.0.1:27017...");
    await client.connect();
    console.log("Connecting to admin database...");
    const admin = client.db("admin");
    
    console.log("Initiating Replica Set...");
    await admin.command({ replSetInitiate: {} });
    console.log("✅ Success! Replica set initialized.");
  } catch (err) {
    if (err.message.includes("already initialized")) {
      console.log("ℹ️ Replica set is already setup. You are good to go!");
    } else {
      console.error("❌ Error:", err.message);
      console.log("\nNote: Make sure you edited the 'mongod.cfg' file and RESTARTED the MongoDB service first!");
    }
  } finally {
    await client.close();
  }
}

setup();