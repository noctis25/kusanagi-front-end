import React, { Component } from "react";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
     
     this.state = {
      data: null,
      items: []
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const response = fetch("/anime_input", {
      method: 'POST',
          headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
          user: {
              id: data.get('id'),
              image_url: data.get('image_url'),
              title: data.get('title'),
              synopsis: data.get('synopsis')
          }
      })
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => console.log(obj))
    .then(document.getElementById('anime-input').reset());

    if (response.status === 200){
      document.getElementById("anime-input").reset();
    } 
  }

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={this.state.items.map(item => item["image_url"])[0]}
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title"> The best anime ever </h1>
          <div>
            <ul className="w3-ul">  
              {this.state.items.map(item => (
                <li key={item["title"]}> {item["title"]} </li>
              ))}
              {this.state.items.map(item => (
                <li key={item["synopsis"]}> {item["synopsis"]} </li>
              ))}
              {this.state.items.map(item => (
                <li key={item["url"]}> {item["url"]} </li>
              ))}
            </ul>
          </div>
        </header>
        <form id="anime-input" onSubmit={this.handleSubmit}>
        <label htmlFor="id">Enter ID</label>
          <input id="id" name="id" type="text"/>
        <br />
        <label htmlFor="image_url">Enter image url</label>
          <input id="image_url" name="image_url" type="text"/>
        <br />
        <label htmlFor="title">Enter title</label>
          <input id="title" name="title" type="text"/>
        <br />
        <label htmlFor="synopsis">Enter synopsis</label>
          <input id="synopsis" name="synopsis" type="text"/>
        <br />  
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default App;
