const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.get('/musicians', async (req, res) => {
    const data = await Musician.findAll()
    res.send(data);
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})