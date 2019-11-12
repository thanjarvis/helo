require("dotenv").config({ path: __dirname + "/../.env" });
const express = require('express')
const ctrl = require('./controller')
const app = express()
const session = require('express-session')
const bcrypt = require('bcryptjs')
const massive = require('massive')
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected');
    
})


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
}))

//auth endpoints
app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)
app.get('/api/logout', ctrl.logout)

//get posts endpoints
app.get('/api/getPosts/', ctrl.getPosts)
app.get('/api/getMyPosts/:id', ctrl.getMyPosts)
app.post('/api/getSearchedPosts', ctrl.getSearchedPosts)
app.post('/api/getMySearchedPosts/:id', ctrl.getMySearchedPosts)
app.get('/api/getSpecificPost/:id', ctrl.getSpecificPost)
app.post('/api/makeNewPost', ctrl.makeNewPost)



const port = SERVER_PORT
app.listen(port, () => console.log(`server running on port ${port}` ))