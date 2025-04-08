// lib/db.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in .env.local');
}

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: 'userTodoDatabase', // Optional if it's already in the URI
    });

    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}
