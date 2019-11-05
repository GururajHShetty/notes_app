const Note = require('../models/note')

//list
module.exports.list = (req, res) => {
    const userId = req.user._id
    Note.find({ userId }).populate('category')
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

//create
module.exports.create = (req, res) => {
    const body = req.body
    // const note = new Note({
    //     title:body.title,
    //     description:body.description
    // })

    const note = new Note(body)
    note.userId = req.user._id
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id

    Note.findById(id).populate('category')
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.params.body

    Note.findByIdAndUpate(id, body, { new: true })
        .then(note => {
            if (note) {
                res.json(note)
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

    Note.findByIdAndDelete(id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}
