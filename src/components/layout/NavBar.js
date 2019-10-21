import React, { Component } from "react";


import styled from 'styled-components';

const NavBarMenu = styled.div`
overflow: hidden;
background-color: #333;
position: fixed;
top: 0;
width: 100%;
font-family: 'Press Start 2P', cursive;

`;

const NavHeading = styled.h1`
padding: 10px 50px;
float: left;
display: block;
color: #f2f2f2;
text-align: center;
text-decoration: none;
font-size: 17px;
`;

const NavBarTab = styled.div`
float: left;
display: block;
color: white;
text-align: center;
padding: 10px 50px;
text-decoration: none;
font-size: 17px;
cursor: pointer;
background-color: #333;
margin-top:1em;
`;

// Header for the app, renders input for seraching pokemon by name
class NavBar extends Component {

  render() {
    return (
      <NavBarMenu>
        <NavHeading href="#/">Project Pokdex</NavHeading>
        <NavBarTab>
          <form>
        <label>
          Name:
          <input onChange={this.props.handleInput}  value={this.props.search} type="text" autoFocus/>
        </label>
      </form></NavBarTab>
      </NavBarMenu>
    );
  }
}

export default NavBar;
