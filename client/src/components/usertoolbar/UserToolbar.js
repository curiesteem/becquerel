import React, { Component } from 'react';

import './UserToolbar.css';
import { Navbar, NavItem } from 'react-bootstrap';
import Auth from '../../auth'

class UserToolbar extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      this.auth = new Auth;
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.authinfo = JSON.parse(localStorage.getItem('authtoken'));
    }

    
    

    login =  () => {
        // call the class that calls steemconnect
        this.auth.login();
    };

    logout =  () => {
        // call the class that calls steemconnect
        this.auth.logout();
    };

   
  
 

  render() {

   

      return (
      <div className="usertoolbar">
          <ul className="nav justify-content-end">
            <li className="nav-item" >
            { this.props.auth.isAuthenticated() ?
            <a className="nav-link" onClick={this.logout} href="#">Logout @{this.authinfo.user}</a> :
            <a className="nav-link" onClick={this.login} href="#">Login</a>
            
            }
                </li>
            </ul>

        </div>
        
     
      );
    
    
    
  }

  
}

export default UserToolbar;