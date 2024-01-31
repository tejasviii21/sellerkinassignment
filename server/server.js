const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require("./middlewares/db");
const errorMiddleware = require('./middlewares/errorHandler.js')

const dotenv = require('dotenv');
const keywordRouter = require("./routes/keyword.js");
dotenv.config()


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

connectDB();

app.use(keywordRouter);

app.use(errorMiddleware);


const port = process.env.PORT
 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})