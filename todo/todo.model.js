const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: String,
    note: String,
    due: String
}, { versionKey: false });

module.exports = mongoose.model('Todo', TodoSchema);