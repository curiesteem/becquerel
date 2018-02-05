import React, { Component } from 'react';
import ApprovedPost from './approvedpost/ApprovedPost'
import { PanelGroup, Panel } from 'react-bootstrap'

import './HomePane.css';

class HomePane extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      
    }
  
 

  render() {

   
    var rowslist = null;
    if (this.props && this.props.approvedPosts){
      rowslist = this.props.approvedPosts.map(function(row) 
      {
        
          return (
            
              <div key={row._id}>
                 <ApprovedPost key={row._id} detail={row}/>
              </div>
                   
              )  
                    

      }, this);

    }
    
      return (
        <div className="homepane">
         
          {rowslist}
       
        </div>
     
      );
    
  }

  
}

export default HomePane;