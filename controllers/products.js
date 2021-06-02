const Product = require('../models/product');

const createProduct = (req, res, next) => {
    const { title, subtitle, width, height, price, quantity } = req.body;
    Product.create({
        title, 
        subtitle, 
        width, 
        height, 
        price, 
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