const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/customer');

const createUser = (req, res, next) => {
    const { name, email, last_name,  mobile, password } = req.body;
    if(!name || !email || !password){
        res.send("Невозможно создать юзера");
    }
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        name,
        email,
        last_name,
        mobile,
        password: hash,
    }))
    .then((user) => {
        User.findById(user._id)
        .then((data) =>{
            res.send(data);
        })
    })
    .catch((error) => {
        res.send('Ошибка создания юзера ' + error)
    })
}

module.exports = {createUser};