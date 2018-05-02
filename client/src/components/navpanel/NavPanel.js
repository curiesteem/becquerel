import React, { Component } from 'react';
  import HomePane from "../homepane/HomePane";
  import ProposePane from "../proposepane/ProposePane";
  import ApprovePane from "../approvepane/ApprovePane";
  import AccountsPane from "../accountspane/AccountsPane";
  import AdminPane from "../adminpane/AdminPane";
  import moment from 'moment'


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
            "approvedPage" : 1
        
      }

      this.handleSelect = this.handleSelect.bind(this);
      this.reload = this.reload.bind(this);
      this.checkAuthorisation = this.checkAuthorisation.bind(this);
      this.handlePageUpdate = this.handlePageUpdate.bind(this);

    
     
  }

  componentDidMount()
  {
    this.loadApprovedQueue();
    this.loadGlobals();
  }

  loadGlobals = () => {
    fetch('/users/levels', {
        headers: this.headers()
    })
    .then(results => {
        return results.json();
    })
    .then(levels => {
        
        this.setState({"levels" : levels});

    });
  }

  handlePageUpdate = (page) => {

    
      this.setState( { "approvedPage" : page }, () => {
            this.loadApprovedQueue();
        }
        );
      
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

        if (key === 5){
            // admin tab selected
            
            this.loadUserDetails();
            
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
        let page = 1;
        fetch('/posts/approved/' + this.state.approvedPage, {
            headers: this.headers()
       })
        .then(results => {
            return results.json();
        })
        .then(posts => {
            
             this.setState({"approvedPosts" : posts});

        });
    }

    loadUserDetails = () => {
        fetch('/users/allusers', {
            headers: this.headers()
       })
        .then(results => {
            return results.json();
        })
        .then(users => {
            
             this.setState({"allusers" : users});

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
        fetch('/posts/reject/' + _id, {

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

    handleClose = (_id) => {
        console.log("handling close for " + _id);
        fetch('/posts/close/' + _id, {

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
    
    reload = () =>
    {
        this.loadReviewerQueue();
        this.loadApprovedQueue();
       
    }

    checkAuthorisation = (role) => {
       // console.log("cheking current authorisation for role");
        return this.props.auth.canView(role) && this.props.auth.isAuthenticated();
        // need to check that the current logged in user has permissions and that they havent tried to change the permission
        // in a hacky way
        // you could go to the server every time to see if the user has persmission to see the tab 

    }

    generateCuratorReport = (startTime, endTime) =>
    {
        console.log(startTime +" - " + endTime);
        if (startTime && endTime) {
        fetch('/accounts/curator/' + startTime + "/" + endTime, {

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
    }
   
 

  render() {
    const jsx = (
        <div id="navpanel" className="navpanel">
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" onSelect={this.handleSelect}>
          <Tab eventKey={1} title="Home">
              <HomePane approvedPosts={this.state.approvedPosts} pageUpdate={this.handlePageUpdate}/>
          </Tab>
          { this.checkAuthorisation('curator') ?
          <Tab eventKey={2} title="Propose">
              <ProposePane {...this.props}/>
          </Tab>
          : null }
           { this.checkAuthorisation('reviewer') ?
          <Tab eventKey={3} title="Review" >
             <ApprovePane {...this.props} approvalQueue={this.state.approvalQueue} closeHandler={this.handleClose} rejectHandler={this.handleReject} approveHandler={this.handleApprove} reload={this.reload}/>
          </Tab>
          : null} 
           { this.checkAuthorisation('accounter') ?
          <Tab eventKey={4} title="Accounts" >
             <AccountsPane generateCuratorReport={this.generateCuratorReport}/>
          </Tab>
          : null }
           { this.checkAuthorisation('administrator') ?
          <Tab eventKey={5} title="Admin"  >
              <AdminPane allusers={this.state.allusers} saveUserHandler={this.saveUser} loadUserDetails={this.loadUserDetails} auth={this.props.auth} levels={this.state.levels}/>
          </Tab>
          :null }
        </Tabs>

        </div>
      
      );
   
    
   

      return jsx;
    
    
    
  }

  
}

export default NavPanel;