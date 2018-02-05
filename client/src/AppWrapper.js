import React, { Component } from 'react';
import UserToolBar from './components/usertoolbar/UserToolbar';
import NavPanel from './components/navpanel/NavPanel';
import { Route } from 'react-router-dom'



class AppWrapper extends Component {


    
  constructor( props ) {
    super(props)  
  }

  
      
     
     
      
    
  
 
  render() {

    const { auth } = this.props.auth;
    console.log("render props auth= " + this.props.auth);
    var location = this.props.location;
    console.log(location);

      return (
          
          <div className="outer">
            
            {/* {location.state.accessToken}
            {location.state.username}
            {location.state.expiresin} */}
         
            <UserToolBar {...this.props}/>
              
            <img src="/curieText.png" className="curieText"/>

              
            <NavPanel {...this.props}/>
        
          </div>
        
        
     
      );
    
    
    
  }

  
}

export default AppWrapper;
