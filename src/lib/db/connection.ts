/**
 * MongoDB Connection Utility
 * Handles connection pooling and caching for serverless environments
 */

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global type declaration for mongoose connection caching
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Cached connection for serverless environments
 * Prevents exhausting database connections on every request
 */
let cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB with connection pooling
 * @returns Mongoose connection instance
 */
export async function connectDB(): Promise<Mongoose> {
  // Check if URI is defined
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection promise if not exists
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        console.error('❌ MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Disconnect from MongoDB
 * Useful for graceful shutdowns
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('🔌 MongoDB disconnected');
  }
}

/**
 * Check if database is connected
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Get connection status
 */
export function getConnectionStatus(): string {
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
}

export default connectDB;
