import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = { searchresults: {}, displayspinner: false };
    this.searchinputref = React.createRef();
  }

  searchperson(persontosearch) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.setState({ searchresults: JSON.parse(xhttp.responseText) });
        this.setState({ displayspinner: false });
      }
    }.bind(this);
    xhttp.open("GET", `https://swapi.dev/api/people/?search=${persontosearch}`);
    xhttp.send();
  }




  render() {
    return (
      <div className="app">
        <div className="header">
          <div className="title">Welcome to Emakina recruitment task!</div>
          <div className="intro">We wrote this project in the way we would never write it in real project, which translates to - this project is mess</div>
        </div>

        <div className="search">
          <input type="text" ref={this.searchinputref} />
          <button onClick={() => {
            this.searchperson(this.searchinputref.current.value);
            this.setState({ searchresults: {} })
            this.setState({ displayspinner: true });
          }}
          >
            Search
          </button>
        </div>

        <div className="search-results">
          {this.state.displayspinner && <div className="lds-dual-ring"></div>}

          {this.state.searchresults.results && this.state.searchresults.results.map(result => {
            console.log(result);

            return (
              <div className="searched-person">
                <img src={`https://starwars-visualguide.com/assets/img/characters/${result.url.match(/\/(\d+)\//)[1]}.jpg`} />
                <div className="name"><b>Name:</b> {result.name}</div>
                <div className="dob"><b>Date of birth:</b> {result.birth_year}</div>
                <div className="height"><b>Height:</b> {result.height}</div>
                <div className="mass"><b>Mass:</b> {result.mass}</div>
                <div className="skin-color"><b>Skin color:</b> {result.skin_color}</div>
                <div className="hair-color"><b>Hair color:</b> {result.hair_color}</div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
