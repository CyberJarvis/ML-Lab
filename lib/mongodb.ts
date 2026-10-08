import { MongoClient } from "mongodb";

// One client per server process. The global survives dev hot reloads, which would
// otherwise open a new connection pool on every edit.
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (!globalForMongo._mongoClient) {
    const pending = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect();
    // A failed connect must not be cached, or every later request would fail too.
    pending.catch(() => {
      globalForMongo._mongoClient = undefined;
    });
    globalForMongo._mongoClient = pending;
  }
  return globalForMongo._mongoClient;
}

export async function getDb() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB || "ml_virtual_lab");
}
