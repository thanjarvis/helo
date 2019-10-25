require("dotenv").config({ path: __dirname + "/../.env" });
const express = require('express')
const ctrl = require('./controller')
const app = express()
const massive = require('massive')
const{SERVER_PORT, CONNECTION_STRING, SERVER_SECRET} = process.env
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected');
    
})

app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)

//get posts endpoints
app.get('/api/getPosts/', ctrl.getPosts)
app.get('/api/getMyPosts/:id', ctrl.getMyPosts)
app.post('/api/getSearchedPosts', ctrl.getSearchedPosts)
app.post('/api/getMySearchedPosts/:id', ctrl.getMySearchedPosts)


const port = SERVER_PORT
app.listen(port, () => console.log(`server running on port ${port}` ))