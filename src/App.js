import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import Toolbar from './Components/Toolbar/Toolbar';
import { Button } from 'react-materialize';
import Carrousel from './Carrousel';
import Ruta from './Components/Toolbar/Ruta';




class App extends Component {

  constructor(){
    super(); 
    this.state = {
      user: null,
      pictures: []
    }
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} Has iniciado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogOut(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} Has cerrado sesion`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
            uploadValue: percentage
        })
    }, error => { 
        console.log(error.message) 
    }, () =>  storageRef.getDownloadURL().then(url =>  {
        const record = {
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName,
          image: url
        };
        const dbRef = firebase.database().ref('pictures');
        const newPicture = dbRef.push();
        newPicture.set(record);
    }));
  }



  renderLoginButton(){
    //Si el usuario esta loguado 
    if(this.state.user){
      return(
       
        <div> 
          
          <div>
    <Toolbar />
    <Ruta />
    </div>
         
          <Button className="btn-logout black" waves='orange' onClick={this.handleLogOut}>Salir</Button>
          

          
          
          

          {
            this.state.pictures.map(picture => (
              <div className="App-card">
                <figure className="App-card-image">
                  <img width="320" src={picture.image} />
                  <figCaption className="App-card-footer">
                    <img className="App-card-avatar" src={picture.photoURL} alt={picture.displayName} />
                    <span className="App-card-name">{picture.displayName}</span>
                  </figCaption>
                </figure>
              </div>//falta un input para poner una descripcion a la foto subida
            )).reverse()
          }

        </div>
      );
    }else{
    //Si no lo esta
    return(
      <div className="todo">
      <Carrousel />
      <Button className="btn-login black" waves='orange' onClick={this.handleAuth}>Entrar</Button>
      </div>
    );
  
    }
  }

  render() {
    return (
      <div className="App">
        { this.renderLoginButton() }
        
         </div>

    );
  }
}

export default App;