import React, { Component } from 'react';
//import Main from "./Main";

class Blog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            description: 'Please insert description.',
            name: '',
            subject: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        alert('Your data was submitted: ' +'\n'+ 'Name: '+ this.state.name + '\n'+ 'Subject: '+this.state.subject +'\n'+ 'Description: '+this.state.description);
        event.preventDefault();
    }

    render() {

        const currentDate =  new Date();
        const datetime = currentDate.getDate() + "-" + (currentDate.getMonth()+1)+ "-" + currentDate.getFullYear();

        return (
            <div>
            <h2 className="title">Create a blog</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Enter your name </label>
                    <input id="name" name="name" type="text" onChange={this.handleChange}/>

                    <label htmlFor="subject"> Enter a subject </label>
                    <input id="subject" name="subject" type="text" onChange={this.handleChange}/>

                    <label>
                        <span> Description </span>
                        <textarea name="description" onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="Submit" />

                    <p className="date">Creation Date: {datetime}</p>
                </form>
            </div>
        );
    }
}

export default Blog;