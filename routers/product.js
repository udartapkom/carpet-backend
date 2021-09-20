const router = require('express').Router(); 
const { 
    createProduct, 
    getAllProducts
} = require('../controllers/products');

router.post('/', createProduct);
router.get('/all', getAllProducts)

module.exports = router;