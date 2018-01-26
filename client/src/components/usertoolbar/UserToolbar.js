import React, { Component } from 'react';

import './UserToolbar.css';
import { Navbar, NavItem } from 'react-bootstrap';

class UserToolbar extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      
      this.login = this.login.bind(this);
    }


    login =  () => {
        console.log("authorising");
        fetch('/auth', { method: 'POST', redirect: 'follow'})
        .then(response => {
            // HTTP 301 response
            console.log(response);
            
            window.location.href = response.url;
        })
        .catch(function(err) {
            console.info(err);
        });
        
      };

   
  
 

  render() {

   

      return (
      <div className="usertoolbar">
          <ul className="nav justify-content-end">
            <li className="nav-item" >
            <a className="nav-link" onClick={this.login} href="#">Login</a>
                </li>
            </ul>

        </div>
        
     
      );
    
    
    
  }

  
}

export default UserToolbar;