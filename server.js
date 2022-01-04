const { log } = require('console');
const express = require('express');
const app = express();
app.use(express.json());

const userRouter = express.Router();
const authRouter = express.Router();
const mongoose = require('mongoose')
app.use('/user', userRouter)

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteuser)

async function getUser(req, res) {
    let allusers = await userModel.findOne({ name: 'jasbeeer' })
    res.json({
        message: 'list of all users',
        data: allusers
    })
}
async function postUser(req, res) {
    let data = req.body;
    let user = await userModel.create(data);
    //console.log(users)
    res.json({
        message: "data recieved",
        data: user
    })
}
async function updateUser(req, res) {
    console.log('req body -> data' + req.body);
    //update data 
    let datatobeupdated = req.body;
    let user = await userModel.findOneAndUpdate({
        email: "hit@gmail.com"
    }, datatobeupdated)
    res.json({
        message: "data updated successfully :)"
    })
}
async function deleteuser(req, res) {
    let datatobedeleted = req.body;
    const data = await userModel.findOneAndDelete(datatobedeleted)
    res.json({
        "message": "data is deleted now :)",
        "data": data
    })
}

const db_link = 'mongodb://127.0.0.1:27017'
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
        unique: true
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
        required: true
    }
})

const userModel = mongoose.model('userModel', userSchema);

app.listen(3000);
