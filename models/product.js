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
       // type: Number,
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
    quality: { // Качество
        type: String,
        minlength: 2,
        maxlength: 70,
    },
    design: { // Дизайн
        type: String,
        minlength: 2,
        maxlength: 70,
    },
    country: { // Страна
        type: String,
        minlength: 2,
        maxlength: 70,
    },
    form: { // форма
        type: String,
        minlength: 2,
        maxlength: 70,
    },
})
module.exports = mongoose.model('product', ProductSchema);