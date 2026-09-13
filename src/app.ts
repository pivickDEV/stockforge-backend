import cors from 'cors'
import express from 'express'
import routes from './routes'

const app = express()

app.use(cors())


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api", routes)

app.get("/", (req, res) => {
  res.send("Hello Express")
})


export default app