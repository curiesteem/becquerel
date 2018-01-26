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
            "approvalQueue" : null,
        
      }

      this.handleSelect = this.handleSelect.bind(this);
      this.reload - this.reload.bind(this);
  }
      
    handleSelect = (key) => {
        if (key === 3){
            // approve tab selected
            
            this.loadPostQueue();
            
        }
    }

    loadPostQueue = () => {
        fetch('/posts')
        .then(results => {
            return results.json();
        })
        .then(posts => {
            
            console.log(posts );
            this.setState({"approvalQueue" : posts});

        });
    }

    handleApprove = (_id) => {
        fetch('/posts/approve/' + _id, {

            method: 'post',
      
            headers: {'Content-Type':'application/json'},
             //body: JSON.stringify(submittedValues) 
           })
            .then(results => {
                
                return results.json();
            })
            .then(data => {
              console.log("approve completed " + JSON.stringify(data));
               //this.setState({"response": data.response});
               
            })
    }
    
    handleReject = (_id) => {
        console.log("handling reject for " + _id);
    }

    handleClose = (_id) => {
        console.log("handling close for " + _id);
    }
    
    reload = () =>
    {
        this.loadPostQueue();
       
    }

 

  render() {

   

      return (
        
      <div id="navpanel" className="navpanel">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Home">
              <HomePane/>
          </Tab>
          <Tab eventKey={2} title="Propose">
              <ProposePane/>
          </Tab>
          <Tab eventKey={3} title="Approve" >
             <ApprovePane approvalQueue={this.state.approvalQueue} closeHandler={this.handleClose} rejectHandler={this.handleReject} approveHandler={this.handleApprove} reload={this.reload}/>
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