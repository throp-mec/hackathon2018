import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import People from './People';
import AddPerson from './AddPerson';
import Search from './Search';
import fire, { auth, provider } from './fire.js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  constructor() {
    super();
    this.state = {
      personName: '',
      tshirtSize: '',
      jacketSize: '',
      pantLeg: '',
      pantWaist: '',
      shoeSize: '',
      notes: '',
      products: '',
      items: [],
      user: null
    }
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });

    const itemsRef = fire.database().ref('people');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];      
      for (let item in items) {
        newState.push({
          id: item,
          person: items[item].person,
          tshirtSize: items[item].tshirtSize,
          jacketSize: items[item].jacketSize,
          pantLeg: items[item].pantLeg,
          pantWaist: items[item].pantWaist,
          shoeSize: items[item].shoeSize,
          notes: items[item].notes,
          products: items[item].products,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  render() {
    
    return (
      <div className='app'>
      <div className="app-container">
      
      
        <Header user={this.state.user}/>
        

        {this.state.user ?
          <div className="content-wrapper">
            <Router>
            <div>
              <ul className="menu-ul">
                <li className="menu-li">
                  <Link to="/">Crew <i className="fas fa-users"></i></Link>
                </li>
                <li className="menu-li">
                  <Link to="/new">Add <i className="fas fa-user-plus"></i></Link>
                </li>
                <li className="menu-li">
                  <Link to="/search">Search <i className="fas fa-search"></i></Link>
                </li>
              </ul>
              <Route
                exact path='/'
                render={(props) => <People {...props} people={this.state.items} user={this.state.user} />}
              />
              <Route
                exact path='/new'
                render={(props) => <AddPerson {...props} user={this.state.user} />}
              />
              <Route
                exact path='/search'
                render={(props) => <Search {...props} user={this.state.user} people={this.state.items} />}
              />
            </div>
          </Router>
          </div>
          :
          <div className='wrapper'>
            <h4 className="login-message">Hey, we need to get to know you a little better. Please login...</h4>
          </div>
        }
        
          {this.state.user &&
            <div>
              <div className='user-profile'>          
                <img alt="" src={this.state.user.photoURL} />  
              </div> 
                <h4 className="logged-in-as">Logged in as {this.state.user.displayName || this.state.user.email}</h4>
              
            </div>
          }
          {this.state.user ?
            <button className="btn-loginout" onClick={this.logout}>Logout</button>               
            :
            <button className="btn-loginout" onClick={this.login}>Login</button>              
          }
      </div>
      </div>
    );
  }
}
export default App;