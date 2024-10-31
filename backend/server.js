const express = require('express');
const { chats } = require('./data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
connectDB();
const port = process.env.PORT || 5000

app.listen(port, console.log(`server listening at port ${port}`));

app.get('/', (req, res)=>{
    res.send("Welcome");
});

app.get('/api/chats', (req, res)=>{
    res.send(chats);
});

app.get('/api/chats/:id', (req, res) => {
    console.log(req.params.id);
    const singleChat = chats.find(c => c._id === req.params.id);

    if (!singleChat) {
        return res.status(404).send({ message: "Chat not found" });
    }

    res.send(singleChat);
});