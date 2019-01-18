import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import BlogPostComment from "./BlogPostComment";

class Main extends Component {
    render() {
        return (
            <HashRouter>
            <div>
                <h1>Blog application</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/FormBlog">Create Blog</NavLink></li>
                    <li><NavLink to="/FormPost">Create Post</NavLink></li>
                    <li><NavLink to="/FormPostComment">Create Comment</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/FormBlog" component={Blog}/>
                    <Route path="/FormPost" component={BlogPost}/>
                    <Route path="/FormPostComment" component={BlogPostComment}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Main;