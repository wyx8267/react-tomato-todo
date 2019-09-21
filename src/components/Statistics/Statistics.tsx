import * as React from 'react'
import { connect } from 'react-redux'
import Polygon from './Polygon'
import TodoHistory from './TodoHistory/TodoHistory'
import { format } from 'date-fns'
import _ from 'lodash'

import './Statistics.scss'

interface IStatisticsProps {
    todos: any[]
}

class Statistics extends React.Component<IStatisticsProps> {
    constructor(props) {
        super(props)
    }
    get finishedTodos() {
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }
    get dailyTodos() {
        return _.groupBy(this.finishedTodos, (todo) => {
            return format(new Date(todo.updated_at), 'yyyy-MM-dd')
        })
    }
    render() {
        return (
            <div className="Statistics" id="Statistics">
                {/* <ul>
                    <li>番茄历史</li>
                    <li>
                        任务历史
                        累计完成{this.finishedTodos.length}个任务
                        <Polygon data={this.dailyTodos} totalFinishCount={this.finishedTodos.length} />
                    </li>
                </ul> */}
                <TodoHistory/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(Statistics)