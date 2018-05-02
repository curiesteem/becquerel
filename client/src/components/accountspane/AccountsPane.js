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
  
    generateCuratorReport = (event)  => {
      //console.log("generating report between " + this.state.start.format() + " and " + this.state.end.format());
      event.preventDefault();
      this.props.generateCuratorReport(this.state.start,this.state.end)
      
    }
 
    startChanged = (time) => {
      this.setState({start : moment(time)});
      console.log("start changed " + moment(time).format());
    }

    endChanged = (time) => {
      this.setState({end : moment(time)});
      console.log("end changed " + moment(time).format());
    }

  render() {

    console.log(this.state.start)

      return (

        <div className="accountsmain">
        <div className="titletext">
          Generate curator report :
          </div>
      <div className="accountspane">
        
          <div className="calwrapper">
          From:
            <Datetime utc={true} onChange={this.startChanged}/>
          </div>
         
          <div className="calwrapper">
          To:
            <Datetime utc={true} onChange={this.endChanged}/>
          </div>

          <div className="buttonwrap">
              <a className="btn btn-success" onClick={this.generateCuratorReport} href="#" disabled={this.state.start == null || this.state.end==null}><i className="fa fa-cogs"></i> Generate</a>
            </div>
            
        </div>
        
        </div>
        
     
      );
    
    
    
  }

  
}

export default AccountsPane;