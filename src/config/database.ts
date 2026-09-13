import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI!

// Serverless-safe connection cache.
// Vercel can reuse a "warm" function instance across requests, so we cache the
// connection promise on the global object to avoid reconnecting (and to avoid
// racing multiple concurrent cold-start connections) on every invocation.
let cached = (global as any)._mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null }
}

export const connectDB = async () => {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    cached!.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false, // fail fast instead of buffering/hanging for 10s
      })
      .then((m) => {
        console.log('MongoDB Connected')
        return m
      })
      .catch((err) => {
        cached!.promise = null // allow retry on next request
        throw err
      })
  }

  cached!.conn = await cached!.promise
  return cached!.conn
}