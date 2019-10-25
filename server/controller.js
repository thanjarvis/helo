module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let foundUser = await db.find_user(username)
        foundUser = foundUser[0]
        if (foundUser){
            res.status(409).send('there is already an account with this user')
        }else{
            db.make_user(username, password)
            .then(user => res.status(200).send(user))
            .catch(err => console.log(err))
        }   
    },
    
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        await db.find_user_for_login(username, password)
        .then(user => {
            res.status(200).send(user)
        })
        .catch(err => console.log(err))

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
        const {id} = req.params

        await db.get_my_posts(id)
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
        const {id} = req.params

        await db.get_my_searched_posts(id, searchInput)
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => console.log(err))
    }


}