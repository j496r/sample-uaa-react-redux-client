import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import { syncHistoryWithStore } from 'react-router-redux';
import HomePage from './components/homePage';
import CallbackPage from './components/callback';
import LoginPage from './components/loginPage';

// Create a new history object that is synced with the store.
const history = syncHistoryWithStore(browserHistory, store);

export default function Routes(props) {
  return (
    // The <Route> components define the different routes in the application and 
    // specify which components should be rendered when the route is active. 
    // When the user navigates to a different route, the history object is updated, 
    // and the Redux store is updated with the new routing state. The <Router> 
    // component listens for changes to the routing state and updates the UI accordingly.

    <Router history={history}>
      <Route path="/" component={HomePage}/>
      <Route path="/callback" component={CallbackPage} />
    </Router>
  );
}
