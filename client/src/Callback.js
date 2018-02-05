import React, { Component } from 'react';

class Callback extends Component {


    
  constructor( props ) {
    super(props)  
  }

  headers = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${this.props.auth.getAccessToken()}`
  });
      
componentDidMount() {
  //console.log(JSON.stringify(this.props));
  // fetch('/auth', {
  //   headers : this.headers(),
  //   method: 'post',
  // })
  // .then(results => {
  //     return results.json();
  // })
  // .then(data => {
     
  //   })
}
     
     
      
    
  
 
  render() {


return (


  <div className="container">
    <h4>Loading...</h4>
  </div>
)};
}

export default Callback;