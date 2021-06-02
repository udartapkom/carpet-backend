const router = require('express').Router();
const { createUser } = require('../controllers/customers');

router.post('/signup', createUser);
// router.post('/signin', login);

module.exports = router;