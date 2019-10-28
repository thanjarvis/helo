import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios';


class Nav extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    logout = () => {
        axios.get('/api/logout')
    }


    render(){
        // console.log('what arrives at the nav bar', this.props);
        
        return(
            <div>
                <h4>{this.props.username}</h4>
                <img src={this.props.profilePic}/>
                
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/new'><button>New Post</button></Link>
                <Link to='/'><button
                    onClick={this.logout}
                >Logout</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const {userId, username, profilePic} = reduxState
    return {
        userId,
        username,
        profilePic
    }
}

export default connect(mapStateToProps)(Nav)