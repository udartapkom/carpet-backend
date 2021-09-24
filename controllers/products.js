const Product = require('../models/product');
const { ERR_MSG } = require('../utils/constants');
const {
    BadRequestErr,
    ForbiddenErr,
    NotFoundErr,
  } = require('../errors/index');

const createProduct = (req, res, next) => {
    
    const { title, subtitle, categories, width, height, image, prise, quantity, quality, design, country, form } = req.body;
    Product.create({
        title, 
        subtitle,
        categories,
        width, 
        height,
        image, 
        prise, 
        quantity,
        quality,
        design,
        country,
        form
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
  
  const delProductById = (req, res, next) => {
      const {productID} = req.params;
        Product.findById(productID)
        .then((product) => {
            product.remove()
            .then(() => res.send(product))
            .catch(next);
        })
        .catch(() => {
            throw new NotFoundErr(ERR_MSG.NOT_FOUND);
        })
        .catch(next);
  }

module.exports = {
    createProduct,
    getAllProducts,
    delProductById,
};