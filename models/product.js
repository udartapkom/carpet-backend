const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    title: { // название
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    subtitle: { // описание
        type: String,
        minlength: 2,
        maxlength: 500,
        default: 'Без описания',
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    width: { // ширина
        type: Number,
    },
    height: { // высота
        type: Number,
    },
    image: {
        type: String,
    },
    prise: { // цена
        type: Number,
    },
    quantity: { // количество на складе
        type: Number,
    },
})
module.exports = mongoose.model('product', ProductSchema);