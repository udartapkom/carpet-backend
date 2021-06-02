const Category = require('../models/category');

const createCategory = (req, res, next) => {
    const { title, description, image, enabled } = req.boby;
    Category.create({
        title,
        description,
        image,
        enabled
    })
    .then((category) => {
        Category.findById(category._id)
        .then((data) => {
            res.send(data);
        })
    })
    .catch((error) => {
        res.send('Ошибка создания категории ' + error)
    })
}

module.exports = {
    createCategory,
} 