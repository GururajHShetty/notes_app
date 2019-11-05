const Category = require('../models/category')
const Note = require('../models/note')

module.exports.list = (req, res) => {
    const userId = req.user._id
    Category.find({ userId })
        .then(categories => {
            if (categories) {
                res.json(categories)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const category = new Category(body)
    category.userId = req.user._id
    category.save()
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Promise.all([Category.findById(id), Note.find({ categoryId: id })])
        .then(data => {
            const [category, notes] = data
            const newCategory = Object.assign({}, category.toObject())
            newCategory.notes = notes
            res.json(newCategory)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const { id } = req.params
    const { body } = req

    Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .then(category => {
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const { id } = req.params
    
    Category.findByIdAndDelete(id)
        .then(category => {
            if (category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}