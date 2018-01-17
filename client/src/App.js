import React, { Component } from 'react';
import './App.css';
import UserToolBar from './components/usertoolbar/UserToolbar';
import NavPanel from './components/navpanel/NavPanel';



class App extends Component {


    
  constructor( props ) {
    super(props)  
  }
      
     
     
      
    
  
 

  render() {

   

      return (
      <div className="outer">
        <UserToolBar/>
          
          <img src="/curieText.png" className="curieText"/>

          
       <NavPanel/>

        </div>
        
     
      );
    
    
    
  }

  
}

export default App;
