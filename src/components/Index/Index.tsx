import * as React from 'react'
import { Button } from 'antd'
import axios from '../../config/axios'

interface IRouter {
    history: any
}

interface IIndexState{
    user:any
}

export default class Index extends React.Component<IRouter, IIndexState> {
    constructor(props: any) {
        super(props)
        this.state={
            user:{}
        }
    }
    async componentWillMount(){
        await this.getMe()
    }
    getMe = async()=>{
        try{
            const response = await axios.get('me')
            this.setState({user: response.data})
        }catch(e){
            
        }
    }
    logout = () => {
        localStorage.setItem('x-token', '')
        this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                <p>欢迎，{this.state.user && this.state.user.account}</p>
                <Button onClick={this.logout}>注销</Button>
            </div>
        )
    }
}