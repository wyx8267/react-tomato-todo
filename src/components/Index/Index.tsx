import * as React from 'react'
import { Dropdown, Icon, Menu } from 'antd'
import Todos from '../Todos/Todos'
import axios from '../../config/axios'
import history from '../../config/history'
import './Index.scss'

interface IRouter {
    history: any
}

interface IIndexState {
    user: any
}

const logout = () => {
    localStorage.setItem('x-token', '')
    history.push('/login')
}

const menu = (
    <Menu>
        <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
        <Menu.Item key="2"><Icon type="logout" onClick={logout} />注销</Menu.Item>
    </Menu>
)

export default class Index extends React.Component<IRouter, IIndexState> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }
    async componentWillMount() {
        await this.getMe()
    }
    getMe = async () => {
        const response = await axios.get('me')
        this.setState({ user: response.data })
    }
    render() {
        return (
            <div className="Index" id="Index">
                <header>
                    <span className="logo">LOGO</span>
                    <Dropdown overlay={menu}>
                        <span>
                            {this.state.user && this.state.user.account}
                            <Icon type="down" style={{ marginLeft: 8 }} />
                        </span>
                    </Dropdown>
                </header>
                <main>
                    <Todos></Todos>
                </main>
            </div>
        )
    }
}