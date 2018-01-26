import React, { Component } from 'react';

import './ProposePane.css';
import { Form, Text, TextArea } from 'react-form';

class ProposePane extends Component {

 
    
  constructor( props ) {
      super( props );
       this.state = {
       
        
        
      }

      this.formapi = null;
      
      
    }

    setApi = ( param ) => {
      this.formapi = param;
    };
    
  submitValues = (submittedValues) =>
  {
    this.setState({"responseClasses" : ''});
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
        console.log("data = " + data);
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
          this.formapi.resetAll();
          
      }, 4000);
      })
  }
  
  
 

  render() {

   

      return (
      <div className="proposepane">
        <div className={this.state.response ? ['response', this.state.responseClasses].join(' ') : ['responseErr', this.state.responseClasses].join(' ') }>
          {this.state.response ? this.state.response : this.state.err}.
        </div>
          
          <Form onSubmit={submittedValues => this.submitValues( { submittedValues } )}
          getApi={this.setApi}>
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