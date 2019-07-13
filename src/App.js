import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      url: "",
      image_url: "",
      synopsis: "",
      items: []
    };
  }

  // state = {
  //   data: null,
  //   items: []
  // };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res =>
        this.setState({
          items: res.express
        })
      )
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  //Continually keeps state up to date with data entered
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Submit handlers that does POST request to backend to write to db
  submitHandler = e => {
    fetch("/inputData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        url: this.state.url,
        image_url: this.state.image_url,
        synopsis: this.state.synopsis
      })
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  };

  render() {
    const { title, url, image_url, synopsis } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={this.state.items.map(item => item["image_url"])[0]}
            className="App-logo"
            alt="logo"
          />
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
        <form onSubmit={this.submitHandler}>
          <div className="App-form">
            <table className="App-table">
              <tr>
                <td>
                  <label for="title" className="App-label">
                    Title:
                  </label>
                </td>
                <td>
                  <input
                    className="App-textbox"
                    type="text"
                    placeholder="Enter title..."
                    name="title"
                    value={title}
                    onChange={this.changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="url" className="App-label">
                    URL:
                  </label>
                </td>
                <td>
                  <input
                    className="App-textbox"
                    type="text"
                    placeholder="https://"
                    name="url"
                    value={url}
                    onChange={this.changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="image_url" className="App-label">
                    Image URL:
                  </label>
                </td>
                <td>
                  <input
                    className="App-textbox"
                    type="text"
                    placeholder="https://"
                    name="image_url"
                    value={image_url}
                    onChange={this.changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="synopsis" className="App-label">
                    Synopsis:
                  </label>
                </td>
                <td>
                  <textarea
                    className="App-textarea"
                    placeholder="Enter synopsis..."
                    name="synopsis"
                    value={synopsis}
                    onChange={this.changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Submit" />
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

export default App;