import React, { Component } from 'react';
import  { ListGroup, ListGroupItem, FormGroup , Checkbox} from 'react-bootstrap';


import './AdminPane.css';

class AdminPane extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }

      this.userClicked = this.userClicked.bind(this);
      this.checkChanged = this.checkChanged.bind(this);
      
    }

    userClicked(user) {
      
      this.setState({"selecteduser" : user});
    }

    checkChanged(event)
    {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name =  target.name;
      console.log("name = " + name + ", value = " + value );
     
      const foo = Object.assign({}, this.state.selecteduser);
      foo[name] = value;

        console.log(foo); 

        this.setState({"selecteduser" : foo});
    }
  
    getValidationState(){
      return null;
    }
 

  render() {
    var rowslist = null;
    if (this.props && this.props.allusers){
      rowslist = this.props.allusers.map(function(row) 
      {
        
          return (
            <ListGroupItem key={row._id} onClick={this.userClicked.bind(null, row)}>{row.user}</ListGroupItem>
             
              )  
                    

      }, this);

    }

    var form = null;
    if (this.state.selecteduser)
    {
      form = ( 
        <div>
        <div className="userheader">
          @{this.state.selecteduser ? this.state.selecteduser.user : null}
        </div>
      
      <form>
        <FormGroup  
            controlId="formBasicText"
            validationState={this.getValidationState()}>
            <Checkbox inline name="curator" onChange={this.checkChanged} checked={this.state.selecteduser.curator }>Curator</Checkbox>{' '}
            <Checkbox inline name="reviewer" onChange={this.checkChanged} checked={this.state.selecteduser.reviewer }>Reviewer</Checkbox>{' '}
            <Checkbox inline name="accounter" onChange={this.checkChanged} checked={this.state.selecteduser.accounter}>Accounter</Checkbox>{' '}
            <Checkbox inline name="administrator" onChange={this.checkChanged} checked={ this.state.selecteduser.administrator}>Administrator</Checkbox>

          </FormGroup>
        </form>
        </div>)
    }

      return (
      <div className="adminpane">
          <div className="userselectorouter">
          <ListGroup className="listgroup">
            {rowslist}
          </ListGroup>
          </div>

          <div className="userdetailsouter">
          

            {form}

          </div>
        </div>
        
     
      );
    
    return null;
    
  }

  
}

export default AdminPane;