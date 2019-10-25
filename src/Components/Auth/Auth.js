import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'

class Auth extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = () => {
        axios.post('/api/register', {username: this.state.username, password:this.state.password})
        .then((res) => {
            this.props.getUser(res.data[0].id, res.data[0].username, res.data[0].profile_pic)
            console.log('what is getting sent to reducer.getUser', res.data[0])            
            this.props.history.push('/dashboard')            
            
            
        })
        .catch((err) =>{
            window.alert('there is already an existing account with that username')
            console.log(err)
        })
    }

    handleLogin = () => {
        axios.post('/api/login', {username: this.state.username, password: this.state.password})
        .then((res) => {
            console.log('authres.data', res.data);
            if(res.data){
                this.props.history.push('/dashboard')
                this.props.getUser(res.data[0].id, res.data[0].username, res.data[0].profile_pic)
            }else{
                window.alert('incorrect username or password')
            }
        })
    }

    render(){
        // console.log(this.state.password);
        
        
        return(
            <div>
                <h1>Auth</h1>
                <input
                    placeholder='Username'
                    value={this.state.username}
                    name='username'
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    name='password'
                    onChange={(e) => this.handleChange(e)}
                />
                <button
                    onClick={this.handleLogin}
                >Login</button>
                <button
                    onClick={this.handleRegister}
                >Register</button>
            </div>
        )
    }
}

export default connect(null, {getUser})(Auth)