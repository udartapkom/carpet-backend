const router = require('express').Router(); 
const { createAdmin, loginAdmin, getCurrentUser } = require('../controllers/admins');
//const { createCategory } = require('../controllers/categories');
const { auth } = require('../middleware/auth');

//Роуты создания и пр. для админа
router.post('/', createAdmin);
router.get('/signin', loginAdmin);
router.get('/me', getCurrentUser);

//роуты категорий
//router.post('/category', createCategory);

module.exports = router;