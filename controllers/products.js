const Product = require('../models/product');

const createProduct = (req, res, next) => {
    
    const { title, subtitle, categories, width, height, prise, quantity } = req.body;
    Product.create({
        title, 
        subtitle,
        categories,
        width, 
        height, 
        prise, 
        quantity
    })
    .then((product) => {
        Product.findById(product._id)
        .then((data) =>{
            res.send(data);
        })
    })
    .catch((error) => {
        res.send('Ошибка создания товара ' + error)
    })

}
module.exports = {createProduct};