import React, { Component } from "react";

import styled from "styled-components";
import PokemonList from "../pokemon/PokemonList";
import NavBar from "./NavBar";
import backpaper from "../layout/darkbackground.jpg";

const DashContainer = styled.div`
-webkit-user-select: none; 
-moz-user-select: none; 
-ms-user-select: none; 
user-select: none; 
user-drag: none; 
-webkit-user-drag: none;
background-repeat: round;
background-position: center;
background-attachment: fixed;

`;

// Index page
class Dashboard extends Component {

  render() {
    return (
        <React.Fragment>
            <NavBar style={{background: `url(${backpaper})`}} handleInput={this.props.handleInput} search={this.props.search}/>
            <DashContainer style={{background: `url(${backpaper})`}}>
                <PokemonList pokemon={this.props.pokemon}/>
            </DashContainer>
        </React.Fragment>
    );
  }
}

export default Dashboard;
