import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

class BlogPostEdit extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    emptyItem = {
        title: '',
        content: '',
        creationDate:''
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            item: this.emptyItem,
            csrfToken: cookies.get('XSRF-TOKEN')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            try {
                const blog = await (await fetch(`http://localhost:8080/blogPosts/${this.props.match.params.id}`, {credentials: 'include'})).json();
                this.setState({item: blog});
            } catch (error) {
                this.props.history.push('/blogPosts');
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        if(item.creationDate === '') {
            const currentDate =  new Date();
            const datetime = currentDate.getFullYear() + "-0" + (currentDate.getMonth()+1)+ "-" + currentDate.getDate();
            item.creationDate = datetime;
        }
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item, csrfToken} = this.state;
        if (this.props.match.params.id !== 'new') {
            await fetch(`http://localhost:8080/blogPosts/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include'
            });
            this.props.history.push('/blogPosts');
        } else {
            await fetch(`http://localhost:8080/blogPosts`, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include',

            });
            this.props.history.push('/blogPosts');
        }
    }

    render() {
        const {item} = this.state;
        const titles = <h2>{item.id ? 'Edit BlogPost' : 'Add BlogPost'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {titles}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">content</Label>
                        <Input type="text" name="content" id="content" value={item.content || ''}
                               onChange={this.handleChange} autoComplete="content"/>
                    </FormGroup>


                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/blogPosts">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withCookies(withRouter(BlogPostEdit));