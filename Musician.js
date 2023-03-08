// const {Sequelize, sequelize} = require('./db');

// let Musician = sequelize.define('musician', {
//     name: Sequelize.STRING,
//     instrument : Sequelize.STRING
// });

// module.exports = {
//     Musician
// };

const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")


// Get all musicians
router.get('/', async (req, res) => {
    const data = await Musician.findAll()
    res.send(data)
})

// Get a musician by id
router.get('/:id', async (req, res) => {
    const id = await Musician.findByPk(req.params.id)
    res.json(id)
})

// Create a new musician
router.post('/musician', [
    check('name')
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 2, max: 20 }).withMessage('Name must be between 2 and 20 characters'),
    check('instrument').trim().notEmpty().withMessage('Instrument cannot be empty')
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { name, instrument } = req.body
    const newMusician = await Musician.create({
        name,
        instrument
    })

    const musician = await Musician.findAll()
    res.json(musician)
})


// Update an existing musician by ID
router.put('/:id', [
    check('name').notEmpty(),
    check('instrument').notEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { name, instrument } = req.body
    const musician = await Musician.findByPk(id)

    musician.name = name
    musician.instrument = instrument

    const updatedMusician = await musician.save()

    res.json(updatedMusician)
})

// Delete a musician by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const musician = await Musician.findByPk(id)

    await musician.destroy()
    res.json({ message: 'Musician deleted successfully' })
})

module.exports = router
