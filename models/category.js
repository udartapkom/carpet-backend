const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: { // название
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    description: { // описание
        type: String,
        minlength: 2,
        maxlength: 500,
        default: 'Без описания',
    },
    image: {
        type: String,
    },
    enabled: {
        type: Boolean,
    },
    id: {
        type: Number,
    }

})

module.exports = mongoose.model('category', categorySchema);