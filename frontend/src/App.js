import React, { Component } from 'react';
import "./bootstrap/css/bootstrap.css";
import PredictionsView from "./components/PredictionsView.js";
import ImageView from "./components/ImageView.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgFile: null,
      spinner: false,
      disabled: true,
      names: [],
      probs: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    if (event.target.files.length === 0) {
      return;
    }
    this.setState({
      imgFile: URL.createObjectURL(event.target.files[0]),
      disabled: false,
      spinner: false
    });
    this.uploadInput = event.target.files[0];
  }

  onSubmit() {
    var data = new FormData();
    data.append('file', this.uploadInput);

    this.setState({
      spinner: true,
      disabled: true
    });
    fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data
          }).then(response => {
              response.json().then(body => {
                this.setState({
									names: body.names,
                  probs: body.probs,
                  spinner: false,
                  disabled: true
								});
              }
            )
          });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row mx-auto">
            <div className="col-1" />
            <div className="col-4">
              <PredictionsView 
                names={this.state.names} 
                probs={this.state.probs} 
                disabled={this.state.disabled}
                onSubmit={this.onSubmit}
                spinner={this.state.spinner}
              />
            </div>
            <div className="col-6">
                <ImageView imgFile={this.state.imgFile} onChange={this.onChange} disabled={this.state.spinner}/>
            </div>
          </div>
        </div>
	<Footer />
      </div>
    );
  }
}

export default App;
