import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import {debounce} from 'throttle-debounce';


import '../App.css';
import * as ReadableAPI from '../utils/ReadableAPI';
import {editCommentAndUpdate,removeCommentAndUpdate} from '../actions';

import CommentsToolBar from './CommentsToolBar'
import CommentScore from './CommentScore'


class CommentTile extends Component {

  constructor(props,context){
    super(props, context);
    this.state = {
        commentid:props.commentid,
        isEditable: false,
        commentBody:'',
        comment: this.props.comments4tiles.filter(p=>p.id===props.commentid)[0]
    };

    //this.onCommentChange = debounce(500, this.onCommentChange);
    this.onCommentChange.bind(this);
    this.onCommentEdit.bind(this);
  }

  onCommentEdit = (comment) => {
    console.log("edit comment")
    this.setState({
      isEditable: true
    })
    /*this.props.editCommentsInState(comment)
    */
  }

  onRemoveComment = (removed) => {
    console.log("remove comment")
    this.props.removeCommentFromState(removed)
  }

  onCommentChange = (event) => {
    console.log("onCommentChange value: " + event.target.value)
    this.setState({
      [event.target.name] : event.target.value
    });
   }

  render(){
    let thecomment = this.props.comments4tiles.filter(p=>p.id===this.state.commentid)[0];

    return (
          <div className="commentile-container">
            <section className="commentile-header">
                <CommentScore comment={thecomment} />

                <CommentsToolBar  comment={thecomment}
                              onCommentEdit={this.onCommentEdit}
                              onRemoveComment={this.onRemoveComment} />
            </section>

            <section className="commentile-body">
               {
                 this.state.isEditable &&
                 <div>
                    <input name="comment.body" type="text" value={thecomment.body}
                    onChange={event=>{
                        this.onCommentChange.bind(this);
                        this.onCommentChange(event);
                      }
                    }
                    />
                    <br/>
                    <button onClick={
                          (event)=>{

                                this.setState({

                                  isEditable: false
                                })
                          }
                        }>
                      Done
                    </button>
                 </div>
               }
               {
                 !this.state.isEditable &&
                 <h4>{this.state.comment.body}</h4>
               }

            </section>
          </div>
    )
  }
}

function mapStateToProps ({ posts,comments}) {
  return {
    posts4tiles: Object.keys(posts).map(key => posts[key]).filter(Boolean),
    comments4tiles: Object.keys(comments).map(key => comments[key]).filter(Boolean),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editCommentsInState: (data) => dispatch(editCommentAndUpdate(data)),
    removeCommentFromState: (data) => dispatch(removeCommentAndUpdate(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentTile))
