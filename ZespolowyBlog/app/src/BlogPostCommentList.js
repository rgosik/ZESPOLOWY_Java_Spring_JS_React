import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './css/BlogPostCommentList.css';

class BlogPostCommentList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            inputVal: '',
            blogPostComments: [],csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {

        this.setState({isLoading: true});

        fetch('http://localhost:8080/blogPostComments', {credentials: 'include'})
            .then(response => response.json())
            .then(data =>{
                console.log(data._embedded.blogPostCommentList);
                this.setState({blogPostComments: data._embedded.blogPostCommentList, isLoading: false})})
            .catch(() => this.props.history.push('/blogPostComments'));

    }

    async remove(id) {
        await fetch(`http://localhost:8080/blogPostComments/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedBlogs = [...this.state.blogPostComments].filter(i => i.id !== id);
            console.log(updatedBlogs);
            this.setState({blogPostComments: updatedBlogs});
        });
    }

    render() {

        //console.log(this.props.user);

        const {blogPostComments} = this.state;
        //comment loading to see anything
//        const {blogs, isLoading} = this.state;
//          if (isLoading) {
//              return <p>Loading...</p>;
//          }

        const groupList = blogPostComments.map(blogPostComment => {
            if(this.state.inputVal === '') {
                return (
                    <div className="blog-post-wrapper" key={blogPostComment.id}>
                        <div className="title">{blogPostComment.title}</div>
                        <div className="content">{blogPostComment.content}</div>
                        <div className="creationDate">{blogPostComment.creationDate}</div>
                        <div>
                            <ButtonGroup className="buttons-group">
                                <Button size="sm" color="primary" tag={Link} to={"/blogPostComments/" + blogPostComment.id}>Edit</Button>
                                <Button className="delete-button" size="sm" color="danger" onClick={() => this.remove(blogPostComment.id)}>Delete</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                )
            } else if(blogPostComment.content.includes(this.state.inputVal)){
                return (
                    <div className="blog-post-wrapper" key={blogPostComment.id}>
                        <div className="title">{blogPostComment.title}</div>
                        <div className="content">{blogPostComment.content}</div>
                        <div className="creationDate">{blogPostComment.creationDate}</div>
                        <div>
                            <ButtonGroup className="buttons-group">
                                <Button size="sm" color="primary" tag={Link} to={"/blogPostComments/" + blogPostComment.id}>Edit</Button>
                                <Button className="delete-button" size="sm" color="danger" onClick={() => this.remove(blogPostComment.id)}>Delete</Button>
                            </ButtonGroup>
                        </div>
                    </div>
                )
            }});

        return (

            <div>
                <AppNavbar/>
                <div className="input-with-text"><span>Find comments on blog </span>
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
                        <Button color="success" tag={Link} to="/blogPostComments/new">Add Comment</Button>
                    </div>
                    <h3>Comments</h3>

                    <div className="holder">
                        {groupList}
                    </div>

                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(BlogPostCommentList));
