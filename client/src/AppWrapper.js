import React, { Component } from 'react';
import UserToolBar from './components/usertoolbar/UserToolbar';
import NavPanel from './components/navpanel/NavPanel';
import { Route } from 'react-router-dom'
import './App.css';



class AppWrapper extends Component {

  headers = () => ({
    'Content-Type': 'application/json',
   // Accept: 'application/json',
   
    Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  });

    
  constructor( props ) {
    super(props)  
    this.state = {
      "userstats" : null,
    }
   
  }

  
      
  getUserStats = () => {
    let authinfo = JSON.parse(localStorage.getItem('authtoken'));
    if (authinfo) {
      let user = authinfo.user;
      if (user) {
        this.setState({"userstats" : user});
            fetch('/users/userstats/' + user, {
                headers: this.headers()
          })
            .then(results => {
                return results.json();
            })
            .then(stats => {
                
                this.setState({"userstats" : stats});

            });
          }
        }
   
  }
     
      
    
  
 
  render() {

    const { auth } = this.props.auth;
     var location = this.props.location;
    //console.log(location);

      return (
          
          <div className="outer">
            
            {/* {location.state.accessToken}
            {location.state.username}
            {location.state.expiresin} */}
         
            <UserToolBar {...this.props} getUserStats={this.getUserStats} userstats={this.state.userstats}/>
              
            {/* <img src="/curietext.png" className="curieText"/> */}

              
            <NavPanel {...this.props}/>
        
          </div>
        
        
     
      );
    
    
    
  }

  
}

export default AppWrapper;
