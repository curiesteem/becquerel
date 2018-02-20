import React, { Component } from 'react';
import Datetime from 'react-datetime';

import './AccountsPane.css';

class AccountsPane extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      
    }
  
 

  render() {

   

      return (

        <div className="accountsmain">
        <div className="titletext">
          Generate curator report :
          </div>
      <div className="accountspane">
     
          <div className="calwrapper">
          From:
            <Datetime/>
          </div>
         
          <div className="calwrapper">
          To:
            <Datetime/>
            </div>

        </div>
        </div>
        
     
      );
    
    
    
  }

  
}

export default AccountsPane;