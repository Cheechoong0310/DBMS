const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/?directConnection=true";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("🚀 Starting Demo...");
    await client.connect();
    const db = client.db("auditDB");
    const collection = db.collection("users");

    console.log("📝 Inserting/Updating data in MongoDB...");
    // This change should be caught by your 'Watcher' in Terminal 2
    const result = await collection.updateOne(
      { name: "Alice" },
      { $set: { balance: Math.floor(Math.random() * 1000), lastUpdated: new Date() } },
      { upsert: true }
    );

    console.log("✅ Database updated successfully!");
    console.log("Check Terminal 2 to see the Blockchain Hash!");

  } catch (error) {
    console.error("❌ Demo Error:", error.message);
  } finally {
    await client.close();
  }
}

run();