import React, { Component } from 'react';
import FormBlog from './FormBlog';
import '../css/App.css';
import axios from 'axios'

class Main extends Component {
    render() {
        return (
            <div className="Form">
                <FormBlog />
            </div>
        );
    }
}

export default Main;