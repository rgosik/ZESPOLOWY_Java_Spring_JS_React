import React, { Component } from 'react';
//import './App.css';
import './css/Home.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }


    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/user', {credentials: 'include'});
        const body = await response.text();
        if (body === '') {
            this.setState(({isAuthenticated: false}))
        } else {
            this.setState({isAuthenticated: true, user: JSON.parse(body)})
        }
    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        fetch('http://localhost:8080/api/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    render() {
        console.log(this.state.user);
        const message = this.state.user ?
            <h2 className="welcome-info">Welcome, {this.state.user.name}</h2> :
            <p>Please log in to manage your blogs.</p>;

        const button = this.state.isAuthenticated ?
            <div className="button-container">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <Button className="button-properties" color="warning"><Link to="/blogs">Manage your Blogs</Link></Button>
                    <br/>
                    <Button className="button-properties" color="warning"><Link to="/blogPosts">Manage your BlogPosts</Link></Button>
                    <br/>
                    <Button className="button-properties" color="primary" onClick={this.logout}>Logout</Button>
                </div>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {message}
                    {button}
                </Container>
                <div  className="back">
                    {/*<h2 className="title"></h2>*/}
                    {/*<div className="col-lg-10 col-md-10 col-xs-12 offset-lg-1 offset-md-1">*/}
                        {/*<div id="discover">*/}
                            {/*<h2>Discover the passions of other people !</h2>*/}
                        {/*</div>*/}
                        {/*<div id="share">*/}
                            {/*<h2>Share your experiences !</h2>*/}
                        {/*</div>*/}
                        {/*<div id="meet">*/}
                            {/*<h2>Meet new people !</h2>*/}
                        {/*</div>*/}
                        {/*<div id="comment">*/}
                            {/*<h2>Express your opinions !</h2>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

export default withCookies(Home);