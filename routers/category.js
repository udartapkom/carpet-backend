const router = require('express').Router(); 
const { createCategory, getCategories } = require('../controllers/categories');

router.post('/', createCategory);
router.get('/', getCategories);

module.exports = router;