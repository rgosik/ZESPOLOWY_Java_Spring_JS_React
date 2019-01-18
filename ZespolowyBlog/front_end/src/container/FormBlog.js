import React, { Component } from 'react';
//import Main from "./Main";

class FormBlog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 'Please insert description.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your data was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {

        const currentDate =  new Date();
        const datetime = currentDate.getDate() + "-" + (currentDate.getMonth()+1)+ "-" + currentDate.getFullYear();

        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Enter your name</label>
                <input id="name" name="name" type="text" />

                <label htmlFor="subject">Enter a subject</label>
                <input id="subject" name="subject" type="text" />

                <label>
                    Description:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>

                <input type="submit" value="Submit" />

                <p>Creation Date: {datetime}</p>
            </form>
        );
    }
}

export default FormBlog;