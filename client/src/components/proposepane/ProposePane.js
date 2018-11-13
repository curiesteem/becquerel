import React, { Component } from 'react';

import './ProposePane.css';
import { Form, Text, TextArea } from 'react-form';
import Auth from '../../auth';
import Recaptcha from 'react-recaptcha';
import moment from 'moment'

class ProposePane extends Component {

   headers = () => ({
    'Content-Type': 'application/json',
   // Accept: 'application/json',
    Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  });

  
    
  constructor( props ) {
      super( props );
       this.state = {
       
        "captchaverified" : false,
        "submitdisabled" : false
        
      }

     this.recaptchaInstance = null;
      this.formapi = null;
      this.verifyCallback = this.verifyCallback.bind(this);
      this.authinfo = JSON.parse(localStorage.getItem('authtoken'));
      
      
    }

    setApi = ( param ) => {
      this.formapi = param;
    };

    onloadCallback = () =>
    {
      console.log("onload done");
    }

    verifyCallback =  (response) => {
      // console.log("verify callback");
      // var resp = ({"captcharesponse" : response});
      // console.log("response = " + JSON.stringify(resp));
      // fetch('/auth/captcha', {
      //   method: 'post',
      //   headers: this.headers(),
      //   body: JSON.stringify(resp),
       

      // })
      // .then(results => {
      //   console.log("results = " + JSON.stringify(results));
      //   return results.json();
      // })
      // .then(data => {
      //  console.log(data);
       
      //  if (data.success === true)
      //  {
      //    this.setState({"captchaverified" : true});
      //  }
      //  else {
      //   this.setState({"responseClasses" : 'show'});
          
      //   this.setState({"captchaverified" : false});
      //   this.setState({"err": "Captcha Not Completed", "response" : null});
      //   setTimeout(() => {
      //     this.setState({"responseClasses" : '', "response": null, "err": null});
          
          
      // }, 4000);
      //  }

      // })
    };
    
  

  submitValues = (submittedValues) =>
  {
    // if you have a timer to hide stuff, cancel it
    
    
    this.setState({"responseClasses" : ''});
    submittedValues.submittedValues.curator = this.authinfo.user;
    // console.log("submitted values = " + JSON.stringify(submittedValues));
    //if (this.state.captchaverified){
      fetch('/posts', {

        method: 'post',

        headers: this.headers(),
        body: JSON.stringify(submittedValues) 
      })
        .then(results => {
           // console.log("results = " + JSON.stringify(results));
            return results.json();
        })
        .then(data => {
          //console.log("data = " + data);
          this.setState({"responseClasses" : 'show'});
          if (data.response)
          {
            this.setState({"response": data.response, "err" : null });
            this.formapi.resetAll();
            setTimeout(() => {
              this.setState({"responseClasses" : '', "response": null, "err": null});
              
          }, 10000);
           
          }
          else if (data.err)
          {

            this.setState({"err": data.err, "response" : null});
            setTimeout(() => {
              this.setState({"responseClasses" : '', "response": null, "err": null});
              this.setState({"submitdisabled" : false});
              
          }, 10000);
            
          this.setState({"submitdisabled" : true});
            
          }
          
         
         
      
        
         
        })
      
  }
  
  
    
    validateUrl = () =>{

      
      console.log("checking url " + JSON.stringify(this.state.url));
      console.log (JSON.stringify({"url" : this.state.url}))
      this.setState({"responseClasses" : ''});
      fetch('/posts/validatesubmitted', {

        method: 'post',

        headers: this.headers(),
        body: JSON.stringify({"url" : this.state.url})
      })
        .then(results => {
           // console.log("results = " + JSON.stringify(results));
            return results.json();
        })
        .then(data => {
          this.setState({"responseClasses" : 'show'});
          console.log(data);
          if (data.response)
          {
            this.setState({"response": data.response, "err" : null });
            setTimeout(() => {
              this.setState({"responseClasses" : '', "response": null, "err": null});
              
          }, 10000);
           
          }
          else if (data.err)
            {
              this.setState({"err": data.err, "response" : null});
            setTimeout(() => {
              this.setState({"responseClasses" : '', "response": null, "err": null});
              
              
          }, 10000);
            }
        })
      
      
    }

    handleURLChange = (e) => {
      console.log(e);
     this.setState({url: e});
   }
  
   
 

  render() {

    

      return (
      <div className="proposepane">
        <div className={this.state.response ? ['responseProp', this.state.responseClasses].join(' ') : ['responseErrProp', this.state.responseClasses].join(' ') }>
          {this.state.response ? this.state.response : this.state.err}.
        </div>
          
          <Form onSubmit={submittedValues => this.submitValues( { submittedValues } )}
          getApi={this.setApi}>
        { formApi => (
          <form onSubmit={formApi.submitForm} id="form1" >
          <div className="flexDiv">
           <div className="urldiv">
            <label htmlFor="url" className="urlLabel">URL</label>
            <Text field="url" id="url" value={this.state.url} onChange={this.handleURLChange} className="urlBar"/>
            
            <a className="btn btn-small btn-info urlButton" href="#" onClick={this.validateUrl}>
              <i className="fa fa-question-circle"></i></a>

              </div>
              </div>
              
            
            <div className="flexDiv">
            <label htmlFor="comments">Comments</label>
              <TextArea field="comments" id="comments" />
              </div>
              <div className="flexDiv">
              {/* <div className="recaptcha">
              <Recaptcha 
                ref={e => this.recaptchaInstance = e}
                sitekey="6LddmUUUAAAAAHGqH8NWVzipatirfyENOE1VXBsL"
                render="explicit"
                verifyCallback={this.verifyCallback}
                onloadCallback={this.onLoadCallback}
               
              />
              </div> */}
              
            
              {this.state.submitdisabled ?
                <button type="submit" disabled={this.state.submitdisabled}>Please Wait...</button>
                :
                <button type="submit" disabled={this.state.submitdisabled}>Submit</button>
              }
            </div>
            
          </form>
        )}
        </Form>

        </div>
        
     
      );
    
    
    
  }

  
}

export default ProposePane;