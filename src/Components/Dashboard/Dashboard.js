import React, {Component} from 'react'
import Post from '../Post/Post'
import axios from 'axios';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            searchInput: '',
            checkBox: false,
            posts: [],
        }
    }

    componentDidMount(){
        this.getAllPosts()        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

// controls whether or not im searching for my own posts or not
    handleClick = () => {
        if(this.state.checkBox === false){
            this.setState({
                checkBox: true
            })
        }else{
            this.setState({
                checkBox:false
            })
        }
    }

//searches for all posts
    getAllPosts = () => {
        axios.get('/api/getPosts')
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

//searches for my posts only
    getMyPosts = () => {
        axios.get(`/api/getMyPosts/${this.props.userId}`)
        .then(res => {
            this.setState({
                posts: res.data,
                searchInput: ''
            })
        })
    }

//searches for posts that contain keywords in title
    getSearchedPosts = () => {
        axios.post('/api/getSearchedPosts', {searchInput: this.state.searchInput})
        .then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data,
                searchInput: ''
            })
        })
    }

//searches for my posts that contain keywords
    getMySearchedPosts = () => {
        axios.post(`/api/getMySearchedPosts/${this.props.userId}`, {searchInput: this.state.searchInput})
        .then(res => {
            // console.log(res.data)
            this.setState({
                posts: res.data,
                searchInput: ''
            })
        })
    }

//looks at the values on state and does the corresponding search
    handleSearch = () => {
        if(this.state.checkBox === true && this.state.searchInput === ''){
            this.getMyPosts()
        }else if(this.state.checkBox === false && this.state.searchInput !== ''){
            this.getSearchedPosts()
        }else if(this.state.checkBox === true && this.state.searchInput !== ''){
            this.getMySearchedPosts()
        }
        
    }
    

    render(){
        // console.log('posts', this.state.posts);
        // console.log('serach', this.state.searchInput);
        console.log(this.props.userId);
        
        
        return(
            <div>
                <h1>Dashboard</h1>
                <input
                    placeholder='search'
                    name='searchInput'
                    value={this.state.searchInput}
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    onClick={this.handleSearch}
                >Search</button>
                <button>Reset</button>
                <div>
                    My Posts
                    <input
                        type='checkbox'
                        value={this.state.checkbox}
                        onClick={this.handleClick}
                    />

                    <div>
                        {this.state.posts.map((element) => {
                            console.log(element)
                            return(
                                <Link to={`/post/${element.id}`}>
                                    <div key={element.id}>
                                        <h4>{element.username}</h4>
                                        <h4>{element.title}</h4>
                                        <img src={element.profile_pic}/>
                                    </div>
                                </Link>
                                
                            )

                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const {userId} = reduxState
    return{
        userId
    }
}

export default connect(mapStateToProps)(Dashboard)