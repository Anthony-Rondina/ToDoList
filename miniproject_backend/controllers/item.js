const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
    Item.find({}, (err, foundItems) => {
        if (!err) {
            res.status(200).json(foundItems)
        } else {
            res.status(400).json(err)
        }
    })
})

router.get("/table", (req, res) => {
    Item.find({}, (err, foundItem) => {
        if (!err) {
            const formattedData = foundItem.reduce((acc, item) => {

                //Object...key      If key exists       Key += item            else additem
                acc[item.status] = acc[item.status] ? [...acc[item.status], item] : [item]
                return acc
            }, {})
            res.status(200).json(formattedData)
        } else {
            res.status(400).json(err)
        }
    })
})

//UPDATE
router.put("/:id", (req, res) => {
    const { body } = req
    Item.findByIdAndUpdate(req.params.id, body, { new: true }, (err, updatedItem) => {
        if (!err) {
            res.status(200).json(updatedItem)
        } else {
            res.status(400).json(err)
        }
    })
})

//Create
router.post('/', (req, res) => {
    const { body } = req
    console.log(body)
    Item.create(body, (err, createdItem) => {
        if (!err) {
            res.status(200).json({ message: "Item Created!", createdItem })
        } else {
            res.status(400).json(err)
        }
    })
})

//DELETE
router.delete("/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            res.status(200).json({ message: "Deleted Item" })
        } else {
            res.status(400).json(err)
        }
    })
})

//Show
router.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, foundItem) => {
        if (!err) {
            res.status(200).json({ message: "All Good!", foundItem })
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router