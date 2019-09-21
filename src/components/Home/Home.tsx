import * as React from 'react'
import { Dropdown, Icon, Menu } from 'antd'
import Todos from '../Todos/Todos'
import Tomatoes from '../Tomatoes/Tomatoes'
import Statistics from '../Statistics/Statistics'
import { connect } from 'react-redux'
import { initTodos } from '../../redux/actions/todos'
import { initTomatoes } from '../../redux/actions/tomatoes'
import axios from '../../config/axios'
import history from '../../config/history'
import './Home.scss'

interface IHomeState {
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

class Home extends React.Component<any, IHomeState> {
    constructor(props: any) {
        super(props)
        this.state = {
            user: {}
        }
    }
    async componentWillMount() {
        await this.getMe()
        await this.getTodos()
        await this.getTomatoes()
    }
    getTodos = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map(t => Object.assign({}, t, { editing: false }))
            this.props.initTodos(todos)
        } catch (e) {
            throw new Error(e)
        }
    }
    getTomatoes = async () => {
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        } catch (e) {
            throw new Error(e)
        }
    }
    getMe = async () => {
        const response = await axios.get('me')
        this.setState({ user: response.data })
    }
    render() {
        return (
            <div className="Home" id="Home">
                <header>
                    <span className="logo">TOMATO-TODO</span>
                    <Dropdown overlay={menu}>
                        <span className="userName">
                            {this.state.user && this.state.user.account}
                            <Icon type="down" style={{ marginLeft: 8 }} />
                        </span>
                    </Dropdown>
                </header>
                <main>
                    <Tomatoes />
                    <Todos />
                </main>
                <Statistics />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
})
const mapDispatchToProps = {
    initTodos,
    initTomatoes
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)