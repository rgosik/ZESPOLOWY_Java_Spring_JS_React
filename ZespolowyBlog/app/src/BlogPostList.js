import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './css/BlogPostList.css';

class BlogPostList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            inputVal: '',
            blogPosts: [],csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {

        this.setState({isLoading: true});

        fetch('http://localhost:8080/blogPosts', {credentials: 'include'})
            .then(response => response.json())
            .then(data =>{
                console.log(data._embedded.blogPostList);
                this.setState({blogPosts: data._embedded.blogPostList, isLoading: false})})
            .catch(() => this.props.history.push('/blogPosts'));

    }

    async remove(id) {
        await fetch(`http://localhost:8080/blogPosts/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedBlogs = [...this.state.blogPosts].filter(i => i.id !== id);
            console.log(updatedBlogs);
            this.setState({blogPosts: updatedBlogs});
        });
    }

    render() {

        //console.log(this.props.user);

        const {blogPosts} = this.state;
        //comment loading to see anything
//        const {blogs, isLoading} = this.state;
//          if (isLoading) {
//              return <p>Loading...</p>;
//          }

        const groupList = blogPosts.map(blogPost => {
            if(this.state.inputVal === '') {
                return (
                    <div className="blog-post-wrapper" key={blogPost.id}>
                        <div className="title">{blogPost.title}</div>
                        <div className="content">{blogPost.content}</div>
                        <div className="creationDate">{blogPost.creationDate}</div>
                        <div>
                            <ButtonGroup className="buttons-group">
                                <Button size="sm" color="primary" tag={Link} to={"/blogPosts/" + blogPost.id}>Edit</Button>
                                <Button className="delete-button" size="sm" color="danger" onClick={() => this.remove(blogPost.id)}>Delete</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                )
            } else if(blogPost.title === this.state.inputVal){
            return (
            <div className="blog-post-wrapper" key={blogPost.id}>
                <div className="title">{blogPost.title}</div>
                <div className="content">{blogPost.content}</div>
                <div className="creationDate">{blogPost.creationDate}</div>
                <div>
                    <ButtonGroup className="buttons-group">
                        <Button size="sm" color="primary" tag={Link} to={"/blogPosts/" + blogPost.id}>Edit</Button>
                        <Button className="delete-button" size="sm" color="danger" onClick={() => this.remove(blogPost.id)}>Delete</Button>
                    </ButtonGroup>
                </div>
            </div>
            )
        }});

        return (

            <div>
                <AppNavbar/>
                <div className="input-with-text"><span>Find posts on blog </span>
                    <input id="value"
                           type="text"
                           onChange={(evt) => {
                               this.setState({
                                   inputVal : evt.target.value
                               });
                               console.log(evt.target.value);
                           }}
                    />
                </div>
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/blogPosts/new">Add Post</Button>
                    </div>
                    <h3>Blog posts</h3>

                        <div className="holder">
                        {groupList}
                        </div>

                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(BlogPostList));
