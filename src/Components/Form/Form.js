import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router'

class Form extends Component{
    constructor(){
        super()
        this.state = {
            title: '',
            img: '',
            content: '',
        }
    }

    handlechange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    makeNewPost = async () => {
        await axios.post('/api/makeNewPost', {title: this.state.title, img: this.state.img, content: this.state.content, authorId: this.props.userId})
        this.props.history.push('/dashboard')
        
    }

    render(){
        console.log(this.props.userId)
        return(
            <div>
                <input
                    name='title'
                    value={this.state.title}
                    onChange={(e) => this.handlechange(e)}
                    placeholder='Title'
                />
                <img src={this.state.img} alt='image not availible'/>
                <input
                    name='img'
                    value={this.state.img}
                    onChange={(e) => this.handlechange(e)}
                    placeholder='Image URL'
                />
                <input
                    name='content'
                    value={this.state.content}
                    onChange={(e) => this.handlechange(e)}
                    placeholder='Content'
                />
                <button
                    onClick={this.makeNewPost}
                >Post</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const{userId} = reduxState
    return{
        userId
    }
}

export default connect(mapStateToProps)(withRouter(Form))