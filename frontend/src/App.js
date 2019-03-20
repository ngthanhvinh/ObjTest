import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgFile: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      imgFile: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:5000', {
            method: 'POST',
            body: data
          }).then(response => {
              response.json().then(body => {
                console.log(body)
              }
            )
          });
  }

  render() {
    return (
      <div>
        <img src={this.state.imgFile} />
        <form onSubmit={this.handleSubmit}>
          <input 
            type="file"
            ref={ref => {
              this.uploadInput = ref;
            }}
            onChange={this.handleChange}/>
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
