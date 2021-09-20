const Product = require('../models/product');
const { ERR_MSG } = require('../utils/constants');
const {
    BadRequestErr,
    ForbiddenErr,
    NotFoundErr,
  } = require('../errors/index');

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
const getAllProducts = (req, res, next) => {
    //const owner = req.user._id;
    Product.find()
      .orFail(() => {
        throw new NotFoundErr(ERR_MSG.NOT_FOUND);
      })
      .then((data) => res.send(data))
      .catch(next);
  };

module.exports = {
    createProduct,
    getAllProducts,
};