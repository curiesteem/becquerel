import React, { Component } from 'react';

import './ApprovePane.css';
import BlogPost from './blogpost/Blogpost'
import { PanelGroup, Panel } from 'react-bootstrap'

class ApprovePane extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      
    }
  
 

  render() {

    var rowslist = null;
    if (this.props && this.props.approvalQueue){
      rowslist = this.props.approvalQueue.map(function(row) 
      {
        if (!row.approved){
          return (
            
              <BlogPost key={row._id} detail={row} closeHandler={this.props.closeHandler} rejectHandler={this.props.rejectHandler} approveHandler={this.props.approveHandler}/>
            

                   
              )  
            }else return null;                

      }, this);

    }
    
      return (
      <div className="approvepane">
          <PanelGroup accordion id="accordion">
          {rowslist}
        </PanelGroup>
        </div>
        
     
      );
    
    
    
  }

  
}

export default ApprovePane;