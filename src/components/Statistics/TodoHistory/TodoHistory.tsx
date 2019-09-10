import * as React from 'react'
import { connect } from 'react-redux'
import { format, getDay } from 'date-fns'
import { Tabs } from 'antd'
import TodoHistoryTodoItem from './TodoHistoryTodoItem'
import _ from 'lodash'

import './TodoHistory.scss'

const TabPane = Tabs.TabPane

interface ITodoHistoryProps {
    todos: any[]
}

class TodoHistory extends React.Component<ITodoHistoryProps> {
    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }
    get deletedTodos() {
        return this.props.todos.filter(t => t.deleted)
    }
    get dailyFinishedTodos() {
        return _.groupBy(this.finishedTodos, (todo) => {
            return format(new Date(todo.updated_at), 'yyyy-MM-dd')
        })
    }
    get finishedDates() {
        return Object.keys(this.dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a))
    }
    constructor(props) {
        super(props)
    }
    render() {
        const finishedTodoList = this.finishedDates.map(date => {
            const weekday = (date)=>{
                switch(getDay(new Date(date))){
                    case 1: return '周一'
                    case 2: return '周二'
                    case 3: return '周三'
                    case 4: return '周四'
                    case 5: return '周五'
                    case 6: return '周六'
                    case 0: return '周日'
                }
            }
            return (
                <div key={date} className="dailyTodos">
                    <div className="summary">
                        <p className="date">
                            <span>{date}</span>
                            <span>{weekday(date)}</span>
                        </p>
                        <p className="finishedCount">
                            完成了{this.dailyFinishedTodos[date].length}个任务
                        </p>
                    </div>
                    <div className="todoList">
                        {
                            this.dailyFinishedTodos[date].map(todo => <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="completed" />)
                        }
                    </div>
                </div>
            )
        })
        const deletedTodoList = this.deletedTodos.map(todo => {
            return (
                <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="deleted" />
            )
        })
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成的任务" key="1">
                    <div className="TodoHistory" id="TodoHistory">
                        {finishedTodoList}
                    </div>
                </TabPane>
                <TabPane tab="已删除的任务" key="2">
                    <div className="TodoHistory" id="TodoHistory">
                        {deletedTodoList}
                    </div>
                </TabPane>
            </Tabs>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory)