import express from "express";
import dotenv from 'dotenv';
import userRouter from './routes/user.js'
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 8002;
dotenv.config();

// middleware
app.use(express.json());

// db config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB database is connected successfully'))
  .catch(err => console.error('MongoDB database fails to connect'))

// route config
app.get('/', (req,res) => {
  res.send("Hello World!")
})

app.use("/user", userRouter)

// listening config
app.listen(port, () => {
  console.log(`Entry-Template is listening to port ${port}`)
})