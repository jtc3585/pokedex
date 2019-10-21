import React, { Component } from "react";

import styled from "styled-components";
import backpaper from "../layout/lightbackground.jpg";

const NavBarMenu = styled.div`
overflow: hidden;
background-color: #333;
position: fixed;
top: 0;
width: 100%;
font-family: 'Press Start 2P', cursive;
`;

const NavHeading = styled.a`
padding: 10px 50px;
float: left;
display: block;
color: #f2f2f2;
text-align: center;
font-size: 17px;
padding-top:2em;

&:hover {
    background-color:#444;
    cursor: pointer;
  }

  &:active {
    box-shadow: none;
    transform-origin: center;
    transform: scale(0.98);
  }

`;

const PokemonBioWrapper = styled.div`
  background: #fff;
  margin: 0 0 20px;
  padding: 20px;
  padding-bottom:5em;
  height: 40em;
  width: 60%;
  border-radius: 2px;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.12);
  transition: 0.3s ease;
  margin: 0 auto;
  margin-top: 7em;

  @media (max-width: 1400px) {
    & {
      height:50em;
    }
  }
  
  @media (max-width: 600px) {
    & {
      height:55em;
    }
  }

`;

const PokemonProfileLabel = styled.div`
    display: block;
    text-align:center;
    width:70%
    margin:0 auto;
    font-family: 'Press Start 2P', cursive;
`

const PokemonProfile = styled.div`
    display: inline-block;
    width: 60%
`
const PokemonStats = styled.div`
    display: inline;
    width: 50%;
    
`

const PokemonSprite = styled.img`
  width: 15em;
  height: 15em;
`;

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "990e2e",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

// Landing page for user clicks on a pokemoncard
class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    abilities: "",
    themeColor: "#ef5350"
  };

    // calls api twice for different information based on the index of the pokemon that was clicked. maps it to the state
  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;
    var pokemonRes;
    var speciesRes;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;

    await fetch(pokemonUrl)
      .then(response => response.json())
      .then(data => (pokemonRes = data));

    const name = pokemonRes.name;
    this.setState({ name });

    const imageUrl = pokemonRes.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonRes.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
            hp = 696969;
            break
      }
    });

    // API serves height in decimeters. Converted to inches on declaration
    const height =
      Math.round((pokemonRes.height * 0.328084 + 0.00001) * 100) / 100;

    // API serves weight in hectograms. Converted to pounds on declaration
    const weight =
      Math.round((pokemonRes.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.types.map(type => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    await fetch(pokemonRes.species.url)
      .then(response => response.json())
      .then(data => (speciesRes = data));

    let description = "";
    speciesRes.flavor_text_entries.some(flavor => {
      if (flavor.language.name === "en") {
        description = flavor.flavor_text;
        return;
      }
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      description,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      themeColor,
      height,
      weight,
      abilities,
    });
  }

  render() {
    return (
    <div style={{background: `url(${backpaper})`}}>
        <NavBarMenu>
         <NavHeading href="#/">Project Pokdex</NavHeading>   
        </NavBarMenu>
        
        <PokemonBioWrapper>
            <PokemonProfileLabel>
            <h5>#{this.state.pokemonIndex}</h5>
            {this.state.types.map(type => (
                    <span
                      key={type}
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white'
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}
                    </span>
                  ))}
            <h4>
                  {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                </h4>
            <hr/>
                <PokemonSprite
                  src={this.state.imageUrl}
                />

            <PokemonProfile>
          <div>
            <h5>{this.state.description}</h5>
            <div>
                  <div>
                    <h6 >Height: {this.state.height} ft.</h6>
                  </div>
                  <div >
                    <h6 >Weight: {this.state.weight} lbs</h6>
              </div>
              <div >
                <h6 >Abilities: {this.state.abilities}</h6>
              </div>
            </div>
          </div>
          </PokemonProfile>
          <PokemonStats>
                <div>
                  <div>
                    HP: {this.state.stats.hp}
                  </div>
                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.hp/ 1.5}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                          color: `#${this.state.themeColor}`
                        }}
                      >
                          <small>{this.state.stats.hp}</small>
                      </div>
                </div>
                <div>
                  <div>
                    Attack: {this.state.stats.attack}
                  </div>

                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.attack/ 1.5}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                          color: `#${this.state.themeColor}`
                        }}

                      >
                          <small>{this.state.stats.attack}</small>
                      </div>
                </div>
                <div>
                  <div>
                    Defense: {this.state.stats.defense}
                  </div>

                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.defense/ 1.5}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                          color: `#${this.state.themeColor}`
                        }}

                      >
                          <small>{this.state.stats.defense}</small>
                      </div>
                </div>
                <div>
                  <div >
                    Speed: {this.state.stats.speed}
                  </div>
                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.speed/ 1.5}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                          color: `#${this.state.themeColor}`
                        }}

                      >
                          <small>{this.state.stats.speed}</small>
                      </div>
                </div>
                <div >
                  <div>
                    Sp Atk: {this.state.stats.specialAttack}
                  </div>
                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialAttack/ 1.5}%`,
                          backgroundColor: `#${this.state.themeColor}`,
                          color: `#${this.state.themeColor}`
                        }}

                      >
                          <small>{this.state.stats.specialAttack}</small>
                      </div>
                </div>
                <div>
                  <div>
                    Sp Def: {this.state.stats.specialDefense}
                  </div>
                      <div
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialDefense / 1.5}% `,
                          backgroundColor: `#${this.state.themeColor}`,
                          color: `#${this.state.themeColor}`
                        }}

                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                </div>
                </PokemonStats>
            </PokemonProfileLabel>
      </PokemonBioWrapper>
    </div>
    );
  }
}

export default Pokemon;
