import * as React from 'react'
import { Router, Route} from "react-router-dom"
import history from './config/history'
import './App.scss'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </Router>
    )
  }
}
