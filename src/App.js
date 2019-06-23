import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: null,
    items: []
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
        .then(res => this.setState({
          items: res.express
        }))
        .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={this.state.items.map( item => (item["image_url"]))[0]} className="App-logo" alt="logo" />
            <h1 className="App-title">The best anime ever</h1>
              <div>
              <ul className="w3-ul">
                  {this.state.items.map(item => (
                      <li key={item["title"]}>{item["title"]}</li>
                  ))}
                  {this.state.items.map(item => (
                    <li key={item["synopsis"]}>{item["synopsis"]}</li>
                  ))}
                  {this.state.items.map(item => (
                    <li key={item["url"]}>{item["url"]}</li>
                  ))}
              </ul>
              </div>
          </header>
        </div>
    );
  }
}

export default App;