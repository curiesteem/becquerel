import React, { Component } from 'react';
import './ApprovedPost.css';
import { Overlay, OverlayTrigger, Panel, Popover } from 'react-bootstrap';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'



var Markdown = require('react-showdown');
var Converter = require('react-showdown').Converter;
const removeMd = require('remove-markdown');



class ApprovedPost extends Component {


    
    constructor( props ) {
        super( props );
         this.state = {
          panelClass : '',
          
        }

        this.handleView = e => {
			this.setState({ target: e.target, show: !this.state.show });
        };
        
        this.handleSubCommentChange = e => {
            this.setState({
                subcomment: e.target.value
              });
        }

        this.handleRevCommentChange = e => {
            this.setState({
                revcomment: e.target.value
              });
        }
        
      }
    

      submit = (type,id, e) => {
         
        confirmAlert({
          title: 'Confirm to ' + type + ' this submission',                        // Title dialog
          message: 'Are you sure you want to ' + type + ' this submission.',               // Message dialog
          
          confirmLabel: 'Confirm',                           // Text button confirm
          cancelLabel: 'Cancel',                             // Text button cancel
          onConfirm: () => this.doSubmit(type,id,e),    // Action after Confirm
         // onCancel: () => alert('Action after Cancel'),      // Action after Cancel - nothing
        })
      };
   


    doSubmit = (type, id, comment, e) => {
        // callback to the top level to do the DB stuff
        if (type === "approve")
        {
           
           
            this.props.approveHandler(id);
        }
        if (type === "reject")
        {
          
            this.props.rejectHandler(id);
        }
        if (type === "close")
        {
           
            this.props.closeHandler(id);
        }
        if (type === "review")
        {
           
            //this.props.closeHandler(id);
        }
        this.setState({"panelClass" : 'panel fadeOut'});
        setTimeout(() => {
            if (this.props.reload)
                this.props.reload();
        }, 2000);
       
        
    }
  
    render() {


        
        // calculate proposal time
        var proposalTime = moment(this.props.detail.submittedtime).utc();
        var sinceProposal = moment.utc().diff(proposalTime, 'minute');
        var propDays = Math.floor(sinceProposal / (60*24));
        var propMins = sinceProposal - (propDays * (60*24))
        var propHours =  Math.floor(propMins / 60);
        var propMins = propMins - propHours*60;
       
       
       

        var postTime = moment(this.props.detail.posttime).utc();
        var sincePost = moment.utc().diff(postTime, 'minute');
        var postDays = Math.floor(sincePost / (60*24));
        var postMins = sincePost - (postDays * (60*24))
        var postHours =  Math.floor(postMins / 60);
        var postMins = postMins - postHours*60;
       
        var converter = new Converter({ 'parseImgDimensions': true});
        //converter.completeHTMLDocument = true;
       
        var thebody = converter.convert(this.props.detail.body);
      
        var noMd =  removeMd(this.props.detail.body).substring(0,200)  + "...";
       
        const popoverHoverFocus = (
            <Popover id="popover-trigger-click-root-close" viewport="navpanel" title={this.props.detail.posttitle} >
                {thebody}
            </Popover>
        );
        

        return (

           <div className="postWrapper">
           <div className="toprow">
               {this.props.detail.posttitle} (by @{this.props.detail.postuser}). Posted {postDays > 0 ? `${postDays} days,` : null} {postHours > 0 ? `${postHours} hours and ` : null} {postMins} minutes ago.
            </div>
            <div className="bottomrow">
                Proposed by @{this.props.detail.curator} {propDays > 0 ? `${propDays} days,` : null} {propHours > 0 ? `${propHours} hours and ` : null} {propMins} minutes ago.
            </div>
            </div>
            
            );
    }
}

export default ApprovedPost;