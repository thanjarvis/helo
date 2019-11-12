const bcrypt = require('bcryptjs')
// const session = require('express-session')
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
// }))


module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let foundUser = await db.find_user(username)
        foundUser = foundUser[0]
        if (foundUser){
            res.status(409).send('there is already an account with this user')
        }else{
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            let createdUser = await db.make_user(username, hash)
            let user = createdUser[0]
            // req.session.user = {id: createdUser[0].id, username: createdUser[0].username}
            // res.status(200).send(req.session.user)

            req.session.user = {
                id: user.id,
                username: username,
                profilePic: user.profile_pic
            }



            res.status(200).send(req.session.user)

            // db.make_user(username, hash)
            // .then(user => res.status(200).send(user))
            // .catch(err => console.log(err))
        }   
    },
    
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let foundUser = await db.find_user_for_login(username)

        if(!foundUser){
            res.status(200).send('user account not found')
        }
        let result = bcrypt.compareSync(password, foundUser[0].password)

        if(!result){
            res.status(403).send('wrong password')
        }

        let user = foundUser[0]

        req.session.user = {
            id: user.id,
            username: username,
            profilePic: user.profile_pic
        }
        res.status(200).send(req.session.user)

        // await db.find_user_for_login(username, password)
        // .then(user => {
        //     res.status(200).send(user)
        // })
        // .catch(err => console.log(err))

    },

    logout: async (req, res) => {
        req.session.destroy
        res.sendStatus(200)
    },

    getPosts: async (req, res) => {
        const db = req.app.get('db')

        await db.get_all_posts()
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => console.log(err))

    },

    getMyPosts: async (req, res) => {
        const db = req.app.get('db')
        // const {id} = req.params

        await db.get_my_posts(req.session.user.id)
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => console.log(err))

    },
    getSearchedPosts: async (req, res) => {
        const db = req.app.get('db')
        const {searchInput} = req.body
        // console.log('hit getSearchedPosts endpoint', req.body);
        

        await db.get_searched_posts(searchInput)
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => console.log(err))        
    },

    getMySearchedPosts: async (req, res) => {
        const db = req.app.get('db')
        const {searchInput} = req.body
        // const {id} = req.params

        await db.get_my_searched_posts(req.session.user.id, searchInput)
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => console.log(err))
    },

    getSpecificPost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        let specificPost = await db.get_specific_post(id)
        res.status(200).send(specificPost)
    },

    makeNewPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, img, content, authorId} = req.body
        db.make_new_post(title, img, content, req.session.user.id)
        res.sendStatus(200)
    }


}