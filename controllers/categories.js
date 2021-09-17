const Category = require('../models/category');

const createCategory = (req, res, next) => {
   
    const {title, description, image, enabled } = req.body;
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

const getCategories = (req, res, next) => {
  
    Category.find()
    .then((categories) => {
            res.send(categories);
        })
    .catch((error) => {
        res.send('Ошибка получения списка категорий ' + error)
    })
}

module.exports = {
    createCategory,
    getCategories,
} 