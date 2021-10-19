const mongoose = require('mongoose');

const catalogShema = new mongoose.Schema({
menuCatalog: {

    quality: [{
        type: String,
        minlength: 2,
        maxlength: 30,
    }],
    design: [{
        type: String,
        minlength: 2,
        maxlength: 30,
    }],
    country: [{
        type: String,
        minlength: 2,
        maxlength: 30,
    }],
    form: [{
        type: String,
        minlength: 2,
        maxlength: 30,
    }]

}


});

module.exports = mongoose.model('catalog', catalogShema);