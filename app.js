const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./Routes/userRoutes')
const postRouter = require('./Routes/postRoutes')
const chatRouter = require('./Routes/chatRoutes')
const contractRouter = require('./Routes/contractRoutes')

const AppError = require('./utils/appError')
const globalErrorHandle = require('./controllers/errorController')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/contracts', contractRouter);

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on PORT:- " + PORT);
})

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})