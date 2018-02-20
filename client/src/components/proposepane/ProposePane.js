import React, { Component } from 'react';

import './ProposePane.css';
import { Form, Text, TextArea } from 'react-form';
import Auth from '../../auth';
import Recaptcha from 'react-recaptcha';


class ProposePane extends Component {

   headers = () => ({
    'Content-Type': 'application/json',
   // Accept: 'application/json',
    Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  });

  
    
  constructor( props ) {
      super( props );
       this.state = {
       
        "captchaverified" : false
        
      }

     this.recaptchaInstance = null;
      this.formapi = null;
      this.verifyCallback = this.verifyCallback.bind(this);
      
      
    }

    setApi = ( param ) => {
      this.formapi = param;
    };

    verifyCallback =  (response) => {
      console.log("verify callback");
      var resp = ({"captcharesponse" : response});
      console.log("response = " + JSON.stringify(resp));
      fetch('/auth/captcha', {
        method: 'post',
        headers: this.headers(),
        body: JSON.stringify(resp),
       

      })
      .then(results => {
        console.log("results = " + JSON.stringify(results));
        return results.json();
      })
      .then(data => {
       console.log(data);
       
       if (data.success === true)
       {
         this.setState({"captchaverified" : true});
       }
       else {
        this.setState({"responseClasses" : 'show'});
          
        this.setState({"captchaverified" : false});
        this.setState({"err": "Captcha Not Completed", "response" : null});
        setTimeout(() => {
          this.setState({"responseClasses" : '', "response": null, "err": null});
          
          
      }, 4000);
       }

      })
    };
    
  submitValues = (submittedValues) =>
  {
    this.setState({"responseClasses" : ''});
    submittedValues.submittedValues.curator = "markangeltrueman";
    console.log("submitted values = " + JSON.stringify(submittedValues));
    if (this.state.captchaverified){
      fetch('/posts', {

        method: 'post',

        headers: this.headers(),
        body: JSON.stringify(submittedValues) 
      })
        .then(results => {
            console.log("results = " + JSON.stringify(results));
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
      else {
        this.setState({"responseClasses" : 'show'});
        console.log("captcha not completed");
        this.setState({"err" : "Captcha Not Completed", "response": null});
        setTimeout(() => {
          this.setState({"responseClasses" : '', "response": null, "err": null});
        
          
      }, 4000);
      }
      this.recaptchaInstance.reset();
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
              <div className="recaptcha">
              <Recaptcha 
                ref={e => this.recaptchaInstance = e}
                sitekey="6LddmUUUAAAAAHGqH8NWVzipatirfyENOE1VXBsL"
                render="explicit"
                verifyCallback={this.verifyCallback}
               
              />
              </div>
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