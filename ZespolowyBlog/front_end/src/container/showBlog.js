import React, { Component } from 'react';
import axios from 'axios';

class showBlog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        };

    }

    componentDidMount() {
        axios.get(`http://localhost:8080/blogs`)
            .then(res => {
                const blogs = res.data;
                console.log(res.data);
                this.setState({ blogs });
            })
    }

    render() {
        return (
            <ul>
            </ul>
        )
    }
}

export default showBlog;