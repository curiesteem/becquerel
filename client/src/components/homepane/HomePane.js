import React, { Component } from 'react';
import ApprovedPost from './approvedpost/ApprovedPost'
import { PanelGroup, Panel } from 'react-bootstrap'

import './HomePane.css';

class HomePane extends Component {

 
    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      this.currentPage = 1;
      
      this.incrementPage = this.incrementPage.bind(this);
      
    }
  
    incrementPage = (e) => {
      e.preventDefault();
      console.log("incrementing page")
      if (this.props && this.props.approvedPosts && this.props.approvedPosts.length == 10) {
        console.log("have 10");
       this.currentPage= this.currentPage +1;
       
        
      }
      if (this.props.pageUpdate)
      {
        console.log("page update " + this.currentPage);
        this.props.pageUpdate(this.currentPage);
      }
    }

    decrementPage = (e) => {
      e.preventDefault();
      console.log("incrementing page")
      if (this.currentPage > 1) {
        
        this.currentPage= this.currentPage -1;
       
        
      }
      if (this.props.pageUpdate)
      {
        console.log("page update " + this.currentPage);
        this.props.pageUpdate(this.currentPage);
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
        <div>
          {rowslist}
          </div>
          <div>
            <div className="buttonWrapper" >


            <a className="btn btn-info navbutton" onClick={this.decrementPage} href="#"><i className="fa fa-step-backward"></i> Previous Page</a>

            <a className="btn btn-info navbutton" onClick={this.incrementPage} href="#"><i className="fa fa-step-forward"></i> Next Page</a>
          
            
         </div>
          </div>
        </div>
        
     
      );
    
  }

  
}

export default HomePane;