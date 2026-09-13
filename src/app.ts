import cors from 'cors'
import express from 'express'
import routes from './routes'
import { connectDB } from './config/database'

const app = express()

app.use(cors())


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api", async (_req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    res.status(503).json({
      success: false,
      message: "Database unavailable",
    });
  }
});

app.use("/api", routes)

app.get("/", (req, res) => {
  res.send("Hello Express")
})


export default app