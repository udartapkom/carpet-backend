const router = require('express').Router();
const { auth } = require('../middleware/auth');

const authRoute = require('./auth');
const productRoute = require('./product');
const adminRoute = require('./admin');
const categoryRoute = require('./category');
const addToCatalogQualityRoute = require('./catalog')
const uploadImage = require('./upload-file')

router.use('/', authRoute);
router.use('/product', productRoute);
router.use('/admin', adminRoute);
router.use('/category', categoryRoute);
router.use('/catalog', addToCatalogQualityRoute);
router.use('/image', uploadImage);
  /* router.use('*', auth, () => {
    console.log('Данные не найдены');
  }); */
  module.exports = router;