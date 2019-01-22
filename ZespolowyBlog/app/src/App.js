import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BlogList from './BlogList';
import BlogEdit from './BlogEdit';
import BlogPostList from './BlogPostList';
import BlogPostEdit from './BlogPostEdit';
import BlogPostCommentList from './BlogPostCommentList';
import BlogPostCommentEdit from './BlogPostCommentEdit';

import { CookiesProvider } from 'react-cookie';


class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/blogs' exact={true} component={BlogList}/>
                        <Route path='/blogs/:id' component={BlogEdit}/>

                        <Route path='/blogPosts' exact={true} component={BlogPostList}/>
                        <Route path='/blogPosts/:id' component={BlogPostEdit}/>

                        <Route path='/blogPostComments' exact={true} component={BlogPostCommentList}/>
                        <Route path='/blogPostComments/:id' component={BlogPostCommentEdit}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;