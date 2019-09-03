import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.scss'
import Login from './components/Login/Login'
import Index from './components/Index/Index'
import SignUp from './components/SignUp/SignUp'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signUp" component={SignUp} />
      </Router>
    )
  }
}
