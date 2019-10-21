import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import spinner from "../pokemon/spinner.gif";

const PokemonCardWrapper = styled.div`
  background: #fff;
  margin: 0 0 20px;
  padding: 20px;
  height: 17em;
  border-radius: 2px;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: 0.3s ease;
  

  &:hover {
    box-shadow: 10px 6px 2px rgba(0, 0, 0, 0.12);

    transform: scale(1.13);
  }

  &:active {
    box-shadow: none;
    transform-origin: center;
    transform: scale(0.98);
  }
`;

const RoutingLink = styled(Link)`
text-decoration: none;
color: black;
a:focus,
a:link,
a:visited,
a:hover,
a:after,
a:active {
  text-decoration: none;
}
`;

const PokemonCardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;
const PokemonCardID = styled.p`
  font-size: 13px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
`;
const PokemonSprite = styled.img`
  width: 10em;
  height: 10em;
  margin-left: auto;
  margin-right: auto;
`;

// organizes cards for display on the index page. provides default and loading assets if resources can't be reached yet
class PokemonCard extends Component {
  state = {
    name: "",
    iamgeURL: "",
    pokemonIndex: "",
    imageLoading: true
  };

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
    const defaultImage =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      defaultImage
    });
  }

  render() {
    return (
        <RoutingLink to={`pokemon/${this.state.pokemonIndex}`}>
      <PokemonCardWrapper>
        <PokemonCardHeading>
          {this.state.name
            .split(" ")
            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
            .join(" ")}
        </PokemonCardHeading>
        <hr/>
        {this.state.imageLoading ? <PokemonSprite src={spinner} /> : null}
        <PokemonSprite
          draggable="false"
          style={
            this.state.imageLoading ? { display: "none" } : { display: "block" }
          }
          src={this.state.imageUrl}
          ref={img => (this.img = img)}
          onError={() =>
            (this.img.src =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png")
          }
          onLoad={() => this.setState({ imageLoading: false })}
        />

        <PokemonCardID>#{this.state.pokemonIndex}</PokemonCardID>
      </PokemonCardWrapper>
      </RoutingLink>
    );
  }
}

export default PokemonCard;
