import * as React from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import axios from '../../config/axios'
import './Todos.scss'
import { async } from 'q';

interface ITodosState {
    todos: any[]
}

export default class Todos extends React.Component<any, ITodosState>{
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }
    addTodo = async (params: any) => {
        const { todos } = this.state
        try {
            const response = await axios.post('todos', params)
            this.setState({ todos: [response.data.resource, ...todos] })
        } catch (e) {
            throw new Error(e)
        }
    }
    componentDidMount() {
        this.getTodos()
    }
    getTodos = async () => {
        try {
            const response = await axios.get('todos')
            const todos = response.data.resources.map(t => Object.assign({}, t, { editing: false }))
            this.setState({ todos })
        } catch (e) {
            throw new Error(e)
        }
    }
    updateTodo = async (id: number, params: any) => {
        const { todos } = this.state
        try {
            const response = await axios.put(`todos/${id}`, params)
            const newTodos = todos.map(t => {
                if (id === t.id) {
                    return response.data.resource
                } else {
                    return t
                }
            })
            this.setState({ todos: newTodos })
        } catch (e) {
            throw new Error(e)
        }
    }
    toEditing = (id: number) => {
        const { todos } = this.state
        const newTodos = todos.map(t => {
            if (id === t.id) {
                return Object.assign({}, t, { editing: true })
            } else {
                return Object.assign({}, t, { editing: false })
            }
        })
        this.setState({ todos: newTodos })
    }
    render() {
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params) => this.addTodo(params)} />
                <main>
                    {this.state.todos.map(t => {
                        return <TodoItem key={t.id} {...t} update={this.updateTodo} toEditing={this.toEditing} />
                    })}
                </main>
            </div>
        )
    }
}