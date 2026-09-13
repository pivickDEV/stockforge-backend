import cors from 'cors'
import express from 'express'
import routes from './routes'
import { connectDB } from './config/database'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure the DB connection is established (or reused from cache) before
// any route handler runs a query. Without this, on a cold start the first
// request(s) can hit Mongoose before the connection exists, causing
// "buffering timed out" errors.
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err)
    res.status(500).json({ success: false, message: 'Database connection failed' })
  }
})

app.use("/api", routes)

app.get("/", (req, res) => {
  res.send("Hello Express")
})


export default app