import React, { Component } from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import './AccountsPane.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
      this.props.generateCuratorReport(this.state.start,this.state.end, this.state.selecteduser)
      
    }

    generateDetailedCuratorReport = (event)  => {
      //console.log("generating report between " + this.state.start.format() + " and " + this.state.end.format());
      event.preventDefault();
      this.props.generateDetailedCuratorReport(this.state.start,this.state.end,this.state.selecteduser)
      
    }

    generateReviewerReport = (event)  => {
      //console.log("generating report between " + this.state.start.format() + " and " + this.state.end.format());
      event.preventDefault();
      this.props.generateReviewerReport(this.state.start,this.state.end,)
      
    }
 
    startChanged = (time) => {
      this.setState({start : moment(time)});
      console.log("start changed " + moment(time).format());
    }

    endChanged = (time) => {
      this.setState({end : moment(time)});
      console.log("end changed " + moment(time).format());
    }

    handleUserChange = (selectedOption) => {
      console.log(selectedOption)
     
      this.setState({"selecteduser" : selectedOption ? selectedOption.value : null});
      
    }

  render() {

    var userlist = []; //  this needs to be a json list - ie  { value: 'one', label: 'One' }, { value: 'one', label: 'One' },
    if (this.props && this.props.allusers && this.props.allusers.length > 0){
      for (var i = 0 ; i < this.props.allusers.length; i++)
      {
        var user = {};
        user.value = this.props.allusers[i].user;
        user.label = this.props.allusers[i].user;
        userlist.push(user)
      }
    } 

    console.log(this.state.start)

      return (

        <div className="accountsmain">
        <div>
          <div className="titletext">
            Generate  report :
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
            <div className="dropdownwrapper">
              User:
              <Select
              name="curator"
              clearable={true}
              value={this.state.selecteduser ? this.state.selecteduser : null}
              onChange={this.handleUserChange}
              options={userlist}
              placeholder="All Users" />
            </div>



      </div>
        <div className="buttonswrapper">
            <div className="buttonwrap">
              <a className="btn btn-success" onClick={this.generateCuratorReport} href="#" disabled={this.state.start == null || this.state.end==null}><i className="fa fa-cogs"></i> Generate Basic<br/>Report</a>
            </div>

            <div className="buttonwrap">
              <a className="btn btn-success" onClick={this.generateDetailedCuratorReport} href="#" disabled={this.state.start == null || this.state.end==null}><i className="fa fa-cogs"></i> Generate Detailed<br/>Report</a>
            </div>

            <div className="buttonwrap">
              <a className="btn btn-success" onClick={this.generateReviewerReport} href="#" disabled={this.state.start == null || this.state.end==null}><i className="fa fa-cogs"></i> Generate Reviewer<br/>Report</a>
            </div>
          </div>
        </div>
        
        </div>
        
     
      );
    
    
    
  }

  
}

export default AccountsPane;