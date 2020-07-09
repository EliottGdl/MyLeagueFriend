import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
import HomePage from "./HomePage";
import InGame from "./components/inGame";

export default class App extends Component {
    render() {
        return (
            <Router>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/inGame/:username" children={<InGame/>}/>
        </Switch>
    </Router>
        )
    }
}
