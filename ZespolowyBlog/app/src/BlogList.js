import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class BlogList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {blogs: [],csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {

        this.setState({isLoading: true});

        fetch('http://localhost:8080/api/blogsAll', {credentials: 'include'})
            .then(response => response.json())
            .then(data =>{
                console.log(data._embedded.blogList);
                this.setState({blogs: data._embedded.blogList, isLoading: false})})
            .catch(() => this.props.history.push('/blogs'));

    }

    async remove(id) {
        await fetch(`http://localhost:8080/api/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedBlogs = [...this.state.blogs].filter(i => i.id !== id);
            console.log(updatedBlogs);
            this.setState({blogs: updatedBlogs});
        });
    }

    render() {
        //console.log(this.props.user);

        const {blogs} = this.state;
        //comment loading to see anything
        // const {blogs, isLoading} = this.state;
        //   if (isLoading) {
        //       return <p>Loading...</p>;
        //   }


        const groupList = blogs.map(blog => {
            //if(blog.description == 'dem'){
            return <tr key={blog.id}>
                <td style={{whiteSpace: 'nowrap'}}>{blog.name}</td>
                <td>{blog.subject}</td>
                <td>{blog.description}</td>
                <td>{blog.creationDate}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/blogs/" + blog.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(blog.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/blogs/new">Add Blog</Button>
                    </div>
                    <h3>Blog list</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Subject</th>
                            <th>Description</th>
                            <th>Creation Date</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(BlogList));
