import React, { Component } from 'react';
import axios from 'axios';

class showBlog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            key:'',
            update:0
        };

    }


    handleDelete = (blog) => {

        const blogs = this.state.blogs;
        var index = blogs.indexOf(blog);
        blogs.splice(index, 1);

        this.setState({
            blogs
        });

        axios.delete(`http://localhost:8080/blogs/${blog.id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    };


    componentDidMount() {
        axios.get(`http://localhost:8080/blogs`)
            .then(res => {
                console.log(res.data._embedded.blogList);
                const blogs = res.data._embedded.blogList;
                this.setState({ blogs });
            })
    }

    render() {
        return (
            <div>
                { this.state.blogs.map(blog =>
                    <ul key={blog.id}>
                        <li>{blog.name}</li>
                        <li>{blog.subject}</li>
                        <li>{blog.description}</li>
                        <li>{blog.creationDate}</li>
                        <button onClick={this.handleEdit}>Edit this blog</button>
                        <button onClick={this.handleDelete.bind(this, blog)}>Delete this blog</button>
                    </ul>)
                }
            </div>
        )
    }
}

export default showBlog;