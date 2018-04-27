import React, { Component } from 'react';
import  { ListGroup, ListGroupItem, FormGroup , Checkbox, FormControl, Button, ControlLabel, InputGroup} from 'react-bootstrap';


import './AdminPane.css';

class AdminPane extends Component {
  
  headers = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
   
    Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  });

    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }

      this.userClicked = this.userClicked.bind(this);
      this.checkChanged = this.checkChanged.bind(this);
      this.newUser = this.newUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
      
    }

    userClicked= (user) => {
      console.log("UserClicked" + JSON.stringify(user));
      this.setState({"selecteduser" : user});
    }

    checkChanged = (event) =>
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

    handleuserchange = (event) =>
    {
      const username = event.target.value;
      const foo = Object.assign({}, this.state.selecteduser);
      foo['user'] = username;
      this.setState({"selecteduser" : foo});

    }
  
    getValidationState = () =>{
      const length = this.state.selecteduser.user.length;
      if (length == 0) return 'error';
      var found = false;
      if (this.props.allusers)
      {
          for (var i = 0; i < this.props.allusers.length; i++)
          {
            if (this.state.selecteduser.user === this.props.allusers[i].user)
            {
              found = true;
            }
          }
      }
      if (found) return 'error';
      return 'success';
  
    }
 
    newUser = () => {
      // call the newUserhandler
      const foo = {};
      foo.user = "newUserName";
      foo.newuser = true;
      foo.curator = true; 
      this.setState({"selecteduser" : foo});

    }

    saveUser = () => {
      fetch('/users/update/', {
          method: 'post',
          headers: this.headers(),
          body: JSON.stringify(this.state.selecteduser)
     })
      .then(results => {
          return results.json();
      })
      .then(data => {
         
          this.setState({"responseClasses" : 'show'});
          if (data.response)
          {
           
            this.setState({"response": data.response, "err" : null });
          
          }
          else if (data.err)
          {
            this.setState({"err": data.err, "response" : null});
          }
          setTimeout(() => {
            this.setState({"responseClasses" : '', "response": null, "err": null});
            
            
        }, 4000);
          
     

      });
     
  }

  deleteUser = () => {
    console.log("delete user " + JSON.stringify(this.state.selecteduser));
      fetch('/users/delete/', {
          method: 'post',
          headers: this.headers(),
          body: JSON.stringify(this.state.selecteduser)
     })
      .then(results => {
          return results.json();
      })
      .then(users => {
          
           this.setState({"allusers" : users});

      });
     
  }

  render() {
    var rowslist = null;
    if (this.props && this.props.allusers && this.props.allusers.length > 0){
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
        {/* <div className="userheader">
          @{this.state.selecteduser ? this.state.selecteduser.user : null}
        </div> */}
      
      <form>
        <FormGroup  
            controlId="formBasicText"
            validationState={this.getValidationState()}>
            <div className="usernamewrapper">
            <ControlLabel>Steem username</ControlLabel>
            <InputGroup>
               <InputGroup.Addon>@</InputGroup.Addon>
            <FormControl
              type="text"
              value={this.state.selecteduser.user}
              placeholder="Enter text"
              onChange={this.handleuserchange}
            />
             <FormControl.Feedback />
            </InputGroup>
             
            </div>
            </FormGroup>
            <FormGroup>
            <Checkbox inline name="curator" onChange={this.checkChanged} checked={this.state.selecteduser.curator }>Curator</Checkbox>{' '}
            <Checkbox inline name="reviewer" onChange={this.checkChanged} checked={this.state.selecteduser.reviewer }>Reviewer</Checkbox>{' '}
            <Checkbox inline name="accounter" onChange={this.checkChanged} checked={this.state.selecteduser.accounter}>Accounter</Checkbox>{' '}
            <Checkbox inline name="administrator" onChange={this.checkChanged} checked={ this.state.selecteduser.administrator}>Administrator</Checkbox>

            <div className="buttonwrapper">

            <a className="btn btn-success" onClick={() => this.saveUser()} href="#"><i className="fa fa-save"></i> Save User</a>
            </div>

          </FormGroup>
        </form>
        </div>)
    }

      return (
      <div className="adminpaneouter">
       
        
        <div className={this.state.response ? ['response', this.state.responseClasses].join(' ') : ['responseErr', this.state.responseClasses].join(' ') }>
          {this.state.response ? this.state.response : this.state.err}.
        </div>
       <div className="adminpane">
        <div className="leftpane">
          <div className="userselectorouter">
          
            <ListGroup className="listgroup">
              {rowslist}
            </ListGroup>
         
          </div>

          <div className="buttonsouter">
          <div>
            <a className="btn btn-success" onClick={() => this.newUser()} href="#"><i className="fa fa-user-plus"></i> Create User</a>
            </div>
            <div>
            <a className="btn btn-danger" onClick={(e) => this.deleteUser(e)} href="#"><i className="fa fa-user-times"></i> Delete User</a>
            </div>
            </div>
           
       
          </div>
          
          
          <div className="userdetailsouter">
          

            {form}

          </div>
          </div>
        </div>
        
     
      );
    
    return null;
    
  }

  
}

export default AdminPane;