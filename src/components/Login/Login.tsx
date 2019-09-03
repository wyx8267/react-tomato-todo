import * as React from 'react'
import { Input, Icon, Button } from 'antd'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

import './Login.scss'

interface ILoginState {
    account: string,
    password: string
}

export default class Login extends React.Component<any, ILoginState> {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: ''
        }
    }
    onChange=(key:keyof ILoginState,value:string)=>{
        const newState = {}
        newState[key] = value
        this.setState(newState)
    }
    submit = async () => {
        const { account, password } = this.state
        try {
            await axios.post('sign_in/user', {
                account,
                password
            })
            this.props.history.push('/')
        } catch (e) {
            throw new Error(e)
        }
    }
    render() {
        const { account, password } = this.state
        return (
            <div className="Login" id="Login">
                <h1>番茄TODO-登录</h1>
                <Input
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={account}
                    onChange={(e)=>this.onChange('account',e.target.value)}
                />
                <Input.Password
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => this.onChange('password', e.target.value)}
                />
                <Button className="loginButton" type="primary" onClick={this.submit}>登录</Button>
                <p>Or <Link to="/signUp">点此注册</Link></p>
            </div>
        )
    }
}