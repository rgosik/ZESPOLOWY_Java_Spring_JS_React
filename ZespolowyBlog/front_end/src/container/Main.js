import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import FormBlog from "./FormBlog";
import FormPost from "./FormPost";


class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Blog application</h1>
                <ul className="header">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/FormBlog">FormBlog</NavLink></li>
                    <li><NavLink to="/FormPost">FormPost</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/FormBlog" component={FormBlog}/>
                    <Route path="/FormPost" component={FormPost}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;