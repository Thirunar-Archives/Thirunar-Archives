import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function ConnectMongoose() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, 
      // Optimized for mobile hotspot stability
      family: 4,
      tlsAllowInvalidCertificates: true, 
      connectTimeoutMS: 30000,
    };

    console.log("📡 Connecting to Shard Cluster...");
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Cloud Database Connected: Shard Cluster Active");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("Cloud Database Error:", e.message);
    throw e;
  }

  return cached.conn;
}

export default ConnectMongoose;