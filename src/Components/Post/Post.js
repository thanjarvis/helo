import React, {Component} from 'react'

class Post extends Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <h4>Post title</h4>
                <h4>authors username</h4>
                <p>profile Pic</p>
            </div>
        )
    }
}

export default Post