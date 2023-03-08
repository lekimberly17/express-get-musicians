// const {Sequelize, sequelize} = require('../db');

// let Band = sequelize.define('band', {
//     name: Sequelize.STRING,
//     genre: Sequelize.STRING
// });

// module.exports = {
//     Band
// };

const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")


// Get all bands
router.get('/', async (req, res) => {
    const data = await Band.findAll()
    res.send(data)
})

// Get a band by id
router.get('/:id', async (req, res) => {
    const id = await Band.findByPk(req.params.id)
    res.json(id)
})

// Update an existing band by ID
router.put('/:id', [
    check('name').notEmpty(),
    check('genre').notEmpty(),
    check('yearFormed').isInt().withMessage('Year formed must be an integer')
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { name, genre, yearFormed } = req.body
    const band = await Band.findByPk(id)

    band.name = name
    band.genre = genre
    band.yearFormed = yearFormed

    const updatedBand = await band.save()

    res.json(updatedBand)
})

// Delete a band by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const band = await Band.findByPk(id)

    await band.destroy()
    res.json({ message: 'Band deleted successfully' })
})

// Create a new band
router.post('/', [
    check('name').trim().notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 10, max: 30 }).withMessage('Name must be between 10 and 30 characters'),
    check('genre').trim().notEmpty().withMessage('Genre cannot be empty'),
    check('yearFormed').isInt().withMessage('Year formed must be an integer')
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { name, genre, yearFormed } = req.body
    const newBand = await Band.create({
        name,
        genre,
        yearFormed
    })

    const bands = await Band.findAll()
    res.json(bands)
})

module.exports = router
