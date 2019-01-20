import React, { Component } from "react";
import '../css/Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <h2 className="title"></h2>
                  <div className="col-lg-10 col-md-10 col-xs-12 offset-lg-1 offset-md-1">
                    <div id="discover">
                      <h1>Discover the passions of other people !</h1>
                    </div>
                    <div id="share">
                      <h1>Share your experiences !</h1>
                    </div>
                    <div id="meet">
                      <h1>Meet new people !</h1>
                    </div>
                    <div id="comment">
                      <h1>Express your opinions !</h1>
                    </div>
                  </div>
            </div>
        );
    }
}

export default Home;
