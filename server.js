const mongoose = require('mongoose')
const emailValidator = require("email-validator");
const db_link = 'mongodb://127.0.0.1:27017'
const bcrypt = require('bcryptjs')

mongoose.connect(db_link, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        console.log('db connect')
    })
    .catch(function (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    });
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email)
        }
    },
    password:
    {
        type: String,
        required: true,
        min: 8
    },
    confirmPassword:
    {
        type: String,
        required: true,
        validate: function () {
            return this.confirmPassword == this.password
        }

    }
})
userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})
userSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt()
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString
})
userSchema.post('save', function (doc) {
    console.log('after saving in database', doc);
})
const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel
