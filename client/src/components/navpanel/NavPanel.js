import React, { Component } from 'react';
  import HomePane from "../homepane/HomePane";
  import ProposePane from "../proposepane/ProposePane";
  import ApprovePane from "../approvepane/ApprovePane";
  import AccountsPane from "../accountspane/AccountsPane";
  import AdminPane from "../adminpane/AdminPane";


import { Tabs, Tab } from "react-bootstrap";
  
import './NavPanel.css';

class NavPanel extends Component {

    headers = () => ({
        'Content-Type': 'application/json',
       // Accept: 'application/json',
       
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      });
    
  constructor( props ) {
      super( props );
       this.state = {
            "approvalQueue" : null,
        
      }

      this.handleSelect = this.handleSelect.bind(this);
      this.reload = this.reload.bind(this);
      this.checkAuthorisation = this.checkAuthorisation.bind(this);

    
     
  }

  componentDidMount()
  {
    this.loadApprovedQueue();
  }
      
    handleSelect = (key) => {
        if (key === 1){
            // approve tab selected
            
            this.loadApprovedQueue();
            
        }

        if (key === 3){
            // approve tab selected
            
            this.loadReviewerQueue();
            
        }
    }

    loadReviewerQueue = () => {
        fetch('/posts/toapprove', {
             headers: this.headers()
        })
        .then(results => {
            return results.json();
        })
        .then(posts => {
            
            this.setState({"approvalQueue" : posts});

        });
    }

    loadApprovedQueue = () => {
        fetch('/posts/approved', {
            headers: this.headers()
       })
        .then(results => {
            return results.json();
        })
        .then(posts => {
            
             this.setState({"approvedPosts" : posts});

        });
    }

    handleApprove = (_id) => {
        fetch('/posts/approve/' + _id, {

            method: 'post',
      
            headers: this.headers(),
             //body: JSON.stringify(submittedValues) 
           })
            .then(results => {
                
                return results.json();
            })
            .then(data => {
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
        this.loadReviewerQueue();
        this.loadApprovedQueue();
       
    }

    checkAuthorisation = (role) => {
       // console.log("cheking current authorisation for role");
        return this.props.auth.canView(role);
        // need to check that the current logged in user has permissions and that they havent tried to change the permission
        // in a hacky way
        // you could go to the server every time to see if the user has persmission to see the tab 

    }

 

  render() {
    const jsx = (
        <div id="navpanel" className="navpanel">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Home">
              <HomePane approvedPosts={this.state.approvedPosts}/>
          </Tab>
          { this.checkAuthorisation('curator') ?
          <Tab eventKey={2} title="Propose">
              <ProposePane {...this.props}/>
          </Tab>
          : null }
           { this.checkAuthorisation('reviewer') ?
          <Tab eventKey={3} title="Approve" >
             <ApprovePane {...this.props} approvalQueue={this.state.approvalQueue} closeHandler={this.handleClose} rejectHandler={this.handleReject} approveHandler={this.handleApprove} reload={this.reload}/>
          </Tab>
          : null} 
           { this.checkAuthorisation('accounter') ?
          <Tab eventKey={4} title="Accounts" >
             <AccountsPane/>
          </Tab>
          : null }
           { this.checkAuthorisation('administrator') ?
          <Tab eventKey={5} title="Admin" >
              <AdminPane/>
          </Tab>
          :null }
        </Tabs>

        </div>
      
      );
   
    
   

      return jsx;
    
    
    
  }

  
}

export default NavPanel;