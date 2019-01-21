 import React, { Component } from 'react';
 import { Link, withRouter } from 'react-router-dom';
 import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
 import AppNavbar from './AppNavbar';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

class BlogEdit extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    emptyItem = {
        name: '',
        subject: '',
        description: '',
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
                const blog = await (await fetch(`http://localhost:8080/api/blogs/${this.props.match.params.id}`, {credentials: 'include'})).json();
                this.setState({item: blog});
            } catch (error) {
                this.props.history.push('/');
            }
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        if(item.creationDate == '') {
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
            await fetch(`http://localhost:8080/api/blogs/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include'
            });
            this.props.history.push('/blogs');
        } else {
            await fetch(`http://localhost:8080/api/blogs/`, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
                credentials: 'include',

            });
            this.props.history.push('/blogs');
        }
    }

    render() {
        const {item} = this.state;
        const titles = <h2>{item.id ? 'Edit Blog' : 'Add Blog'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {titles}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" name="subject" id="subject" value={item.subject || ''}
                               onChange={this.handleChange} autoComplete="title"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete="description"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/blogs">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withCookies(withRouter(BlogEdit));