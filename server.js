const { log } = require('console');
const express = require('express');
const app = express();
const userModel = require('./views/userModel');
app.use(express.json());

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/auth', authRouter)
app.use('/user', userRouter)
//
userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteuser)

//
async function getUser(req, res) {
    let allusers = await userModel.find()
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
        email: "newid2@gmail.com"
    }, datatobeupdated)
    res.json({
        message: "data updated successfully :)"
    })
}


// }
async function deleteuser(req, res) {
    let datatobedeleted = req.body;
    const data = await userModel.findOneAndDelete(datatobedeleted)
    res.json({
        "message": "data is deleted now :)",
        "data": data
    })
}
//
app.listen(3000);
