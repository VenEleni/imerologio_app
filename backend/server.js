const express = require("express");
const cors = require("cors")
const db = require("./config/connection")
const journalRouter = require("./routes/journalRoute")
const userRouter = require("./routes/userRoute")
const dotenv = require("dotenv")
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URI = process.env.FRONTEND_URI

app.use(express.json());
 
app.use(cors({
  // origin: "*",
  origin: FRONTEND_URI, // allow your client app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // allowed headers
  credentials: true // if you need to send cookies or other crede
  }));
  

app.use("/journal", journalRouter)
app.use("/user", userRouter)



app.listen(PORT, ()=> {
    console.log(`Server is running on: http://localhost:${PORT}`)
})