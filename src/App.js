import React, { Component } from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './index.css'
import Dashboard from "./components/layout/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list of all pokemon
      pokemon: null,
      // user search value
      searchPokemon: ''
    };
  }

  handleInput = (e) => {
    this.setState({searchPokemon: e.target.value})
  }

  async componentDidMount() {
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=42069")
      .then(response => response.json())
      .then(data => this.setState({ pokemon: data.results }));

    
  }

  render() {
    
    // filters based on user input
    let filteredPokemon;
    if(this.state.pokemon != null){
       filteredPokemon = this.state.pokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(this.state.searchPokemon.toLocaleLowerCase())
      })
    }else{
        filteredPokemon = this.state.pokemon;
      }  

    return (
      <Router>
        <div>
        <Switch>
          <Route exact path="/" component={(props) => <Dashboard {...props} pokemon={filteredPokemon} handleInput={this.handleInput} search={this.state.searchPokemon} />} />
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
        </Switch>
    </div>
    </Router>
    );
  }
}

export default App;
