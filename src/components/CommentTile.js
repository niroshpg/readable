import React, { Component }  from 'react'

import { connect } from 'react-redux'
import Moment from 'react-moment';
import '../App.css';

import CommentsToolBar from './CommentsToolBar'
import CommentScore from './CommentScore'
import {editCommentAndUpdate,removeCommentAndUpdate} from '../actions';

import { withRouter } from "react-router-dom";

class CommentTile extends Component {
  constructor(props){
  	super(props);
    this.state = {
      commentid:props.commentid,
    	isEditable: false,
      comment: this.props.comments4tiles.filter(p=>p.id===props.commentid)[0]
		}
    this.onCommentBodyChanged = this.onCommentBodyChanged.bind(this)
    this.onCommentEditCompleted = this.onCommentEditCompleted.bind(this)
  }

  onCommentEdit = (comment) => {
    console.log("edit comment")
    this.setState({
      isEditable: true
    })
  }

  onCommentEditCompleted = () => {
      this.setState({
        isEditable: false
      });
    this.props.editCommentsInState(this.state.comment);
  }

  onCommentBodyChanged(e){
    console.log("editing " + e.target.name)
  	this.setState({
    	comment:{
        ...this.state.comment,
        [e.target.name] : e.target.value
      }
    })
  }

  onRemoveComment = (removed) => {
    console.log("remove comment")
    this.props.removeCommentFromState(removed)
  }

  render(){
    const {comment} = this.state;

    return (
          <div className="commentile-container">
            <section className="commentile-header">

                <CommentScore comment={comment} />

                <CommentsToolBar  comment={comment}
                              onCommentEdit={this.onCommentEdit}
                              onRemoveComment={this.onRemoveComment} />
            </section>

            <section className="commentile-body">

                <div>
                  {this.state.isEditable
                    && <div>
                          <input name="body" type="text" value={comment.body} onChange={this.onCommentBodyChanged}/>
                          <br/>
                          <button onClick={this.onCommentEditCompleted}>Done
                          </button>
                      </div>
                  }
                  {
                    !this.state.isEditable &&
                    <div>
                      <h4>{comment.body}</h4>
                      <h5>
                      <em>by {comment.author}</em>
                      @<span><Moment format="YYYY/MM/DD HH:MM">{comment.timestamp}</Moment></span></h5>
                    </div>

                  }
                </div>
            </section>
          </div>
    )

  }
}
/*

<EditCommentBody
  comment={comment}
  onCommentChange={this.onEdit}
/>
class CommentTile extends Component {

  constructor(props,context){
    super(props, context);
    this.state = {
        commentid:props.commentid
    };
  }
  onCommentEdit = (comment) => {
    console.log("edit comment")

  }

  onRemoveComment = (removed) => {
    console.log("remove comment")
    this.props.removeCommentFromState(removed)
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
              <h4>{thecomment.body}</h4>

            </section>

          </div>
    )
  }
}
*/

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
