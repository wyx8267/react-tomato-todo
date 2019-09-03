import * as React from 'react'
import { Input, Icon, Button } from 'antd'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

import './SignUp.scss'

interface ISignUpState {
    account: string,
    password: string,
    passwordConfirmation: string
}

export default class SignUp extends React.Component<any, ISignUpState> {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            passwordConfirmation: ''
        }
    }
    onChangeAccount = (e) => {
        this.setState({ account: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }
    onChangePasswordConfirmation = (e) => {
        this.setState({ passwordConfirmation: e.target.value })
    }
    submit = async () => {
        const { account, password, passwordConfirmation } = this.state
        try {
            await axios.post('sign_up/user', {
                account,
                password,
                password_confirmation: passwordConfirmation
            })
            console.log('success')
        } catch (e) {
            throw new Error(e)
        }
    }
    render() {
        const { account, password, passwordConfirmation } = this.state
        return (
            <div className="SignUp" id="SignUp">
                <h1>番茄TODO-注册</h1>
                <Input
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={account}
                    onChange={this.onChangeAccount}
                />
                <Input.Password
                    placeholder="请输入密码"
                    value={password}
                    onChange={this.onChangePassword}
                />
                <Input.Password
                    placeholder="请确认密码"
                    value={passwordConfirmation}
                    onChange={this.onChangePasswordConfirmation}
                />
                <Button className="loginButton" type="primary" onClick={this.submit}>注册</Button>
                <p>Or <Link to="/login">点此登录</Link></p>
            </div>
        )
    }
}
