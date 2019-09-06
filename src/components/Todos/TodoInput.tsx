import * as React from 'react'
import { Input, Icon } from 'antd'
import { connect } from 'react-redux'
import { addTodo } from '../../redux/actions/todos'
import axios from '../../config/axios'

interface ITodoInputState {
    description: string
}
interface ITodoInputProps {
    addTodo: (payload: any) => any
}

class TodoInput extends React.Component<any, ITodoInputState, ITodoInputProps> {
    constructor(props) {
        super(props)
        this.state = {
            description: ''
        }
    }
    onKeyUp = (e) => {
        if (e.keyCode === 13 && this.state.description !== '') {
            this.postTodo()
        }
    }
    postTodo = async() => {
        try{
            const response = await axios.post('todos',{description:this.state.description})
            this.props.addTodo(response.data.resource)
        }catch(e){
            throw new Error(e)
        }
        this.setState({ description: '' })
    }
    render() {
        const { description } = this.state
        const suffix = description ? <Icon type="enter" onClick={this.postTodo} /> : <span />
        return (
            <div className="TodoInput" id="TodoInput">
                <Input
                    placeholder="添加新任务"
                    suffix={suffix}
                    value={description}
                    onChange={(e) => this.setState({ description: e.target.value })}
                    onKeyUp={this.onKeyUp}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})
const mapDispatchToProps = {
    addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput)