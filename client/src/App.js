import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    
  } from "react-router-dom";
import HomePage from "./HomePage";
import InGame from "./components/inGame";
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

const trackingId = "UA-172958383-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.set({
  userId: window.localStorage.getItem("mainUser"),
  // any data that is relevant to the user session
  // that you would like to track with google analytics
})

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});



export default class App extends Component {
    render() {
        return (
            <Router history={history}>

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
