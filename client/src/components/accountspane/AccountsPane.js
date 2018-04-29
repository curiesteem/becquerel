import React, { Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import './AccountsPane.css';

class AccountsPane extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
          start : null,
          end : null
        
      }
      
    }
  
    submit(event) {
      console.log("generating report between " + this.state.start.format() + " and " + this.state.end.format());
      event.preventDefault();
      
    }
 
    startChanged = (time) => {
      this.state.start = moment(time);
      console.log("start changed " + moment(time).format());
    }

    endChanged = (time) => {
      this.state.end = moment(time);
      console.log("end changed " + moment(time).format());
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
            <Datetime utc="true" onChange={this.startChanged}/>
          </div>
         
          <div className="calwrapper">
          To:
            <Datetime utc="true" onChange={this.endChanged}/>
            </div>
            
            <a className="btn btn-success" onClick={(e) => this.submit(e)} href="#"><i className="fa fa-thumbs-o-up"></i> Submit</a>
        </div>
        </div>
        
     
      );
    
    
    
  }

  
}

export default AccountsPane;