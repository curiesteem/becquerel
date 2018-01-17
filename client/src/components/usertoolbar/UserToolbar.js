import React, { Component } from 'react';

import './UserToolbar.css';
import { Navbar, NavItem } from 'react-bootstrap';

class UserToolbar extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      
    }
  
 

  render() {

   

      return (
      <div className="usertoolbar">
          <ul className="nav justify-content-end">
            <li className="nav-item" >
            <a className="nav-link" href="#">Login</a>
                </li>
            </ul>

        </div>
        
     
      );
    
    
    
  }

  
}

export default UserToolbar;