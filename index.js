const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3060;
const connectDB = require("./database")
const Task = require('./models/test')

app.use(express.json());
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);


app.post("/newTask", async (req, res) => {
    const {name} = await req.body
    
    try {
        await connectDB();
        const alreadyExists = await Task.findOne({name: name})
        console.log(alreadyExists)
        if (alreadyExists == null) {
            const newTask = new Task({
                name: name
            })
            await newTask.save()
            res.status(200).send(newTask)
        } else {
            res.send("already exists")
        }

    } catch (error) {
        res.send("Failed to create new task", { status: 500 });
    }

})



app.listen(PORT, console.log(`Server started on port ${PORT}`));