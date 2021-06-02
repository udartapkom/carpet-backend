const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    last_name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
    mobile: {
      type:Number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: 'Некоррекртный Email',
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
})
UserSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new UnautorizedErr(ERR_MSG.UNAUTORIZED));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new UnautorizedErr(ERR_MSG.UNAUTORIZED));
            }
            return user;
          });
      });
  };
module.exports = mongoose.model('user', UserSchema);