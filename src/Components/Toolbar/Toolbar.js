import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavItem, Button } from 'react-materialize';
import './Toolbar.css';


class Toolbar extends Component {
  render() {
    return(
      <Navbar className="toolbar_item black" brand='logo' right>
        <NavItem>
            <Link to="/" >Inicio</Link></NavItem>
          <NavItem>
            <Link to="/Proyectos" >Proyectos</Link></NavItem>
          <NavItem>
            <Link to="/Perfil" >Perfil</Link>
            </NavItem>
         <NavItem>
            <Link to="/Mensajes" >Mensajes</Link>
            </NavItem>
         <NavItem>
            <Link to="/Informacion" >Informacion</Link>
            </NavItem>
        </Navbar>
    );
  }

}

export default Toolbar;