import React, { Component } from 'react';
import axios from 'axios';
//import Main from "./Main";

class Blog extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subject: '',
            description: 'Please insert description.',
            creationDate:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();
        const currentDate =  new Date();
        const datetime = currentDate.getFullYear() + "-0" + (currentDate.getMonth()+1)+ "-" + currentDate.getDate();
console.log(datetime);


        axios.post(`http://localhost:8080/blogs`, {
            'name':this.state.name,
            'subject': this.state.subject,
            'description': this.state.description,
            'creationDate': datetime
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            }, err => {
                console.log(err);
            });




        alert('Your data was submitted: ' +'\n'+ 'Name: '+ this.state.name + '\n'+ 'Subject: '+this.state.subject +'\n'+ 'Description: '+this.state.description);
    }

    render() {

        const currentDate =  new Date();
        const datetime = currentDate.getFullYear()  + "-0" + (currentDate.getMonth()+1)+ "-" + currentDate.getDate();


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