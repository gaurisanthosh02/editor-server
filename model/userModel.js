const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, default:''},
})

const editors = mongoose.model('editors', userSchema)

module.exports = editors