import React, { Component } from 'react';
  import HomePane from "../homepane/HomePane";
  import ProposePane from "../proposepane/ProposePane";
  import ApprovePane from "../approvepane/ApprovePane";
  import AccountsPane from "../accountspane/AccountsPane";
  import AdminPane from "../adminpane/AdminPane";


import { Tabs, Tab } from "react-bootstrap";
  
import './NavPanel.css';

class NavPanel extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }

      this.handleSelect = this.handleSelect.bind(this);
  }
      
  handleSelect = () => {
    console.log("tab selected");
}
  
    

 

  render() {

   

      return (
        
      <div className="navpanel">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Home">
              <HomePane/>
          </Tab>
          <Tab eventKey={2} title="Propose">
              <ProposePane/>
          </Tab>
          <Tab eventKey={3} title="Approve" >
             <ApprovePane/>
          </Tab>
          <Tab eventKey={4} title="Accounts" >
             <AccountsPane/>
          </Tab>
          <Tab eventKey={5} title="Admin" >
              <AdminPane/>
          </Tab>
        </Tabs>

        </div>
      
        
     
      );
    
    
    
  }

  
}

export default NavPanel;