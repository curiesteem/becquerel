import React, { Component } from 'react';

import './ProposePane.css';
import { Form, Text, TextArea } from 'react-form';

class ProposePane extends Component {


    
  constructor( props ) {
      super( props );
       this.state = {
        
        
      }
      
    }

    
  submitValues = (submittedValues) =>
  {
    submittedValues.submittedValues.curator = "markangeltrueman";
    console.log("submitted values = " + JSON.stringify(submittedValues));
    fetch('/posts', {

      method: 'post',

      headers: {'Content-Type':'application/json'},
       body: JSON.stringify(submittedValues) 
     })
      .then(results => {
          
          return results.json();
      })
      .then(data => {
        //console.log(data);
         this.setState({"response": data.response});
      })
  }
  
 

  render() {

   

      return (
      <div className="proposepane">
        <div className="response">
          {this.state.response}
        </div>
          
          <Form onSubmit={submittedValues => this.submitValues( { submittedValues } )}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form1" >
           <div className="flexDiv">
            <label htmlFor="url">URL</label>
            <Text field="url" id="url" />
            </div>
            <div className="flexDiv">
            <label htmlFor="comments">Comments</label>
              <TextArea field="comments" id="comments" />
              </div>
              <div className="flexDiv">
            <button type="submit">Submit</button>
            </div>
            
          </form>
        )}
        </Form>

        </div>
        
     
      );
    
    
    
  }

  
}

export default ProposePane;