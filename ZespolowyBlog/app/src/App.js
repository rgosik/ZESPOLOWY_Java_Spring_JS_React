import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import GroupList from './GroupList';
import GroupEdit from './GroupEdit';
import { CookiesProvider } from 'react-cookie';


class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/blogs' exact={true} component={GroupList}/>
                        <Route path='/blogs/:id' component={GroupEdit}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;