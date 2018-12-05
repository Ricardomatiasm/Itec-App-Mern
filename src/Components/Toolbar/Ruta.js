import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Inicio from './Inicio';
import Proyectos from './Proyectos';
import Perfil from './Perfil';
import Mensajes from './Mensajes';
import Informacion from './Informacion';


class Ruta extends Component {
render() {
  return(
    <Switch>
      <Route exact path="/" component={Inicio} />
      <Route path="/Proyectos" component={Proyectos} />
      <Route path="/Perfil" component={Perfil} />
      <Route path="/Mensajes" component={Mensajes} />
      <Route path="/Informacion" component={Informacion} />
    </Switch>

  );
}

}

export default Ruta;