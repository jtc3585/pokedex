import React, { Component } from "react";

import styled from "styled-components";
import PokemonCard from "./PokemonCard";


const DexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 7em;
  
  
`;
const DexColumn = styled.div`
  flex-basis: 25%;
  width: 25%;
  padding: 0 10px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    & {
      flex-basis: 50%;
      width: 50%;
    }
  }
  
  @media (max-width: 600px) {
    & {
      flex-basis: 100%;
      width: 100%;
    }
  }
}
`;


// Sorts the filtered list of pokemon alphabetically then renders them with card components

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null
    };
  }


  componentDidMount() {
    this.setState({pokemon: this.props.pokemon})
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <DexContainer>
            {this.state.pokemon
              .sort(function(a, b) {
                var nameA = a.name.toLowerCase(),
                  nameB = b.name.toLowerCase();
                if (nameA < nameB)
                  //sort string ascending
                  return -1;
                if (nameA > nameB) return 1;
                return 0; //default return value (no sorting)
              })
              .map(pokemon => (
                <DexColumn>
                  <PokemonCard
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                </DexColumn>
                
              ))}
          </DexContainer>
        ) : (
          <h1>Loading Pokemon...</h1>
        )}
      </React.Fragment>
    );
  }
}

export default PokemonList;
