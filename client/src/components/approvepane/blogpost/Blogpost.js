import React, { Component } from 'react';
import './Blogpost.css';
import { Overlay, OverlayTrigger, Panel, Popover } from 'react-bootstrap';
import moment from 'moment';
var Markdown = require('react-showdown');
var Converter = require('react-showdown').Converter;
const removeMd = require('remove-markdown');

class BlogPost extends Component {


    
    constructor( props ) {
        super( props );
         this.state = {
          
          
        }

        this.handleView = e => {
			this.setState({ target: e.target, show: !this.state.show });
		};
        
      }
    
   
  
    render() {

        // calculate proposal time
        var proposalTime = moment(this.props.detail.submittedtime).utc();
        var sinceProposal = moment.utc().diff(proposalTime, 'minute');
        var propHours = Math.floor(sinceProposal/60);
        var propMins = sinceProposal % 60;
       

        var postTime = moment(this.props.detail.posttime).utc();
        var sincePost = moment.utc().diff(postTime, 'minute');
        var postHours = Math.floor(sincePost/60);
        var postMins = sincePost % 60;
       
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

            <Panel eventKey={this.props.detail._id}>
            <Panel.Heading>
                <Panel.Title toggle>
                    <div className="title-wrapper">
                        <div className="title-row">{this.props.detail.posttitle} - <div className="title-author"> by @{this.props.detail.postuser}</div> </div>
                        <div className="title-row proposed-by">Proposed by  @{this.props.detail.curator} {sinceProposal} minutes ago.</div>
                            
                    </div>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
                <div className="body-wrapper">
                    <div className="body-row postmarkdown">
                   
                   <OverlayTrigger
                        trigger="click"
                        rootClose
                        placement="right"
                        overlay={popoverHoverFocus}
		>
                   <i className="fa fa-eye" aria-hidden="true"></i>
                   </OverlayTrigger>
                   {noMd}  <a href={this.props.detail.url} target="_new" ><i className="fa fa-external-link-square" aria-hidden="true"></i></a>
                   
                    </div>
                    <div className="body-row commentsWrapper ">
                        <div className="commentsBold">Comments by proposer: </div> <div className="comments">{this.props.detail.comments} </div>
                    </div>
                    <div className="body-row postedstats ">
                        Posted on Steemit {postHours > 0 ? postHours + " hours and ": null} {postMins} minutes ago | Submitted for approval {propHours > 0 ? propHours + " hours and ": null} {propMins} minutes ago
                    </div>
                </div>
           
            </Panel.Body>
          </Panel>
            
            );
    }
}

export default BlogPost;