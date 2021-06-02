const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admins');

const { NODE_ENV, JWT_SECRET } = process.env;

const createAdmin = (req, res, next) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        res.send("Невозможно создать администратора");
    }
    bcrypt.hash(password, 10)
    .then((hash) => Admin.create({
        name,
        email,
        password: hash,
    }))
    .then((admin) => {
        Admin.findById(admin._id)
        .then((data) =>{
            res.send(data);
        })
    })
    .catch((error) => {
        res.send('Ошибка создания администратора ' + error)
    })
}

const loginAdmin = (req, res, next) => {
    const { email, password} = req.body;
    
    return Admin.findUserByCredentials(email, password)
    .then((admin) => {
        const adminToken = jwt.sign(
            { _id: admin._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'very-secret',
            { expiresIn: '3h'},
        );
        res.send({ adminToken });
    })
    .catch((err) => {
        next(err);
    });
};

module.exports = {
    createAdmin,
    loginAdmin,
};