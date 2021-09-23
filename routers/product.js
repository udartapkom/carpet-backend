const router = require('express').Router(); 
const { 
    createProduct, 
    getAllProducts,
    delProductById
} = require('../controllers/products');

router.post('/', createProduct);
router.get('/all', getAllProducts)
router.delete('/:productID', delProductById)

module.exports = router;