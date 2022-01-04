const { log } = require('console');
const express = require('express');
const app = express();
app.use(express.json());
//let users = [{ id: '1', 'name': "Abhiskhek" }, { id: '2', 'name': "Hitesh" }, { id: '3', 'name': "aazz" }];
const userRouter = express.Router();
const authRouter = express.Router();
const mongoose = require('mongoose')
app.use('/auth', authRouter)
app.use('/user', userRouter)
// authRouter
//     .route('/signup')
//     .get(middleware1, getsigup, middleware2)
//     .post(postSignup)

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteuser)

// userRouter
//     .route("/:id")
//     .get(getId)
// function getsigup(req, res, next) {
//     console.log('get sign up called');
//     //res.sendFile('index.html', { root: __dirname })
//     next();
// }
// function postSignup(req, res) {
//     let obj = req.body;
//     console.log('====================================');
//     console.log(obj);
//     console.log('====================================');
//     res.json({
//         "mssg": "post request success",
//         "data": obj
//     })
// }
// // app.get('/', function (req, res) {
// //     res.sendFile('C:/Users/ASUS/OneDrive/Desktop/BKEND/views/index.html')
// // });
// // app.get('/about', function (req, res) {
// //     res.sendFile('./views/about.html', { root: __dirname })
// // })
// // app.get('/about-us', (req , res) => {
// //     res.redirect('/about');
// // })
// // app.use((req, res) => {
// //     res.status(404).sendFile('./views/404.html', { root: __dirname })
// // })
// function middleware1(req, res, next) {
//     console.log('middleware1 called');
//     next();
// }
// function middleware2(req, res, next) {
//     console.log('middleware2 called');
//     res.sendFile('index.html', { root: __dirname })

// }
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


// }
async function deleteuser(req, res) {
    let datatobedeleted = req.body;
    const data = await userModel.findOneAndDelete(datatobedeleted)
    res.json({
        "message": "data is deleted now :)",
        "data": data
    })
}
// function getId(req, res) {
//     console.log(req.params.id);
//     let paramsId = req.params.id;
//     let obj = {}
//     for (let i = 0; i < users.length; i++) {
//         if (users[i]['id'] == paramsId)
//             obj = users[i];
//     }
//     res.json({
//         "mssg": "Id fetched successfully",
//         "data": obj
//     })
// }
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
// (async function createUser() {
//     let user = {
//         name: 'jasbeeer',
//         email: 'nw@gmail.com',
//         password: 'qweewe',
//         confirmPassword: 'qweewe'
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();
app.listen(3000);
