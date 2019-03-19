import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    console.log(data);

    fetch('http://localhost:8000', {
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
      <form onSubmit={this.handleSubmit}>
        <input 
          type="file"
          ref = {ref => {
            this.uploadInput = ref;
          }}
          onSubmit={this.handleSubmit}
        />
        <button>Upload</button>
      </form>
    );
  }
}

export default App;
