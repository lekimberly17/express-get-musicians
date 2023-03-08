// const express = require("express");
// const app = express();
// const {Musician} = require("./Musician")
// const {sequelize} = require("./db")

// const port = 3000;

// //TODO

// // middleware
// app.use(express.json())

// // Create an express route for creating (adding) a new Musician on your musician database. 
// app.post('/musician', async (req, res) => {
//     const { name, instrument} = req.body;
//     const musician = await Musician.create({
//         name,
//         instrument
//     })
//     res.json(newMusician)
// })

// // Create an express route for updating (replacing) an existing musician with a new musician on your musician database based on ID.
// app.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, instrument} = req.body
//     const musician = await Musician.findByPk(id)

  
//     musician.name = name
//     musician.instrument = instrument

//     const updatedMusician = await musician.save()

//     res.json(updatedMusician)
// })

// // Create an express route for deleting (removing) a musician on your database. 
// app.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     const musician = await Musician.findByPk(id);

//     await musician.destroy();
//     res.json({ message: 'Restaurant deleted successfully' });
// })

// app.get('/musicians', async (req, res) => {
//     const data = await Musician.findAll()
//     res.send(data);
// })

// app.get('/musicians/:id', async (req, res) => {
//     const id = await Musician.findByPk(req.params.id)
//     res.json(id);
// })

// app.listen(port, () => {
//     sequelize.sync();
//     console.log(`Listening on port ${port}`)
// })

// Part 4

const express = require("express")
const app = express()

const musicianRouter = require("./Musician")
const bandRouter = require("./Band")
const { check, validationResult } = require("express-validator")
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express Routes
app.use("/musician", musicianRouter)
app.use("/band", bandRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
