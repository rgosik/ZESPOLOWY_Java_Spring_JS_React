import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Select from "react-select";
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';





class BlogPostCommentEdit extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };



    emptyItem = {
        content: '',
        creationDate:''
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            fetchedblogs: [],
            item: this.emptyItem,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        let initialFetchedblogs = [];
        fetch('http://localhost:8080/blogPosts')
            .then(response => {
                return response.json();
                console.log(response)
            }).then(data => {
            console.log(data._embedded.blogPostList);
            initialFetchedblogs = data._embedded.blogPostList.map((fetchedblog) => {
                return fetchedblog
                console.log(fetchedblog);
            });
            console.log(initialFetchedblogs);
            this.setState({
                fetchedblogs: initialFetchedblogs,
            });
        });

        if (this.props.match.params.id !== 'new') {
            try {
                const blog = await (await fetch(`http://localhost:8080/blogPostComments/${this.props.match.params.id}`, {credentials: 'include'})).json();
                this.setState({item: blog});
            } catch (error) {
                this.props.history.push('/blogPostComments');
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(this.state.value);

        let item = {...this.state.item};
        item.blog = this.state.value;
        item[name] = value;
        if(item.creationDate === '') {
            const currentDate =  new Date();
            const datetime = currentDate.getFullYear() + "-0" + (currentDate.getMonth()+1)+ "-" + currentDate.getDate();
            item.creationDate = datetime;
            //item.blog = this.state.blog;
        }
        this.setState({item});
        //console.log(this.state.blog);
    }

    async handleSubmit(event) {

        event.preventDefault();
        const {item, csrfToken} = this.state;
        item.blog = this.state.value;
        if (this.props.match.params.id !== 'new') {
            await fetch(`http://localhost:8080/blogPostComments/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include',

            });
            this.props.history.push('/blogPostComments');
        } else {
            await fetch(`http://localhost:8080/blogPostComments`, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include',

            });
            this.props.history.push('/blogPostComments');
        }
    }

    // handleBlogs(event) {
    //     this.setState({selectValue:event.target.value});
    // }

    render() {

        let fetchedblogs = this.state.fetchedblogs;
        let optionItems = fetchedblogs.map((fetchedblog) =>
            <option key={fetchedblog.id}>{fetchedblog.title}</option>
        );

        const {item} = this.state;
        const titles = <h2>{item.id ? 'Edit BlogPostComment' : 'Add BlogPostComment'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {titles}
                <Form onSubmit={this.handleSubmit}>
                    <select onChange={(e) => this.setState({ value: e.target.value })}>
                        {optionItems}
                    </select>

                    <FormGroup>
                        <Label for="content">content</Label>
                        <Input type="text" name="content" id="content" value={item.content || ''}
                               onChange={this.handleChange} autoComplete="content"/>
                    </FormGroup>


                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/blogPostComments">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withCookies(withRouter(BlogPostCommentEdit));