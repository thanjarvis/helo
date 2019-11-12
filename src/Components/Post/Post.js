import React, {Component} from 'react'
import axios from 'axios'

class Post extends Component{
    constructor(){
        super()
        this.state = {
            postTitle: '',
            postImg: '',
            postContent: '',
            authorUsername: '',
            authorProfilePic: ''

        }
    }
    componentDidMount =() => {
        this.getSpecificPost(this.props.match.params.postid)
    }

    getSpecificPost = (id) => {
        axios.get(`/api/getSpecificPost/${id}`)
        .then(res => {
            this.setState({
                    postTitle: res.data[0].title,
                    postImg: res.data[0].img,
                    postContent: res.data[0].content,
                    authorUsername: res.data[0].username,
                    authorProfilePic: res.data[0].profile_pic
            })
        })
    }

    render(){
        return(
            <div>
                <div>
                    <div>
                        <h2>{this.state.postTitle}</h2>
                        <img src={this.state.postImg}/>
                    </div>
                    <div>
                        <p>{this.state.postContent}</p>
                    </div>
                    <div>
                        <p>{this.state.authorUsername}</p>
                        <img src={this.state.authorProfilePic}/>
                    </div>
                </div>
            </div>
        )
    }
}



export default Post