import * as React from 'react'
import TodoInput from './TodoInput'
import axios from '../../config/axios'
import './Todos.scss'

export default class Todos extends React.Component{
    addTodo = async(params: any)=>{
        try{
            const response = await axios.post('todos', params)
        }catch (e){
            throw new Error(e)
        }
    }
    render(){
        return (
            <div className="Todos" id="Todos">
                <TodoInput addTodo={(params)=>this.addTodo(params)}/>
            </div>
        )
    }
}