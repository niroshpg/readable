import React, { Component }  from 'react'
import { connect } from 'react-redux'

import '../App.css';
import {addCommnent,removeComment} from '../actions';
import CommentTile from './CommentTile'
import AddComments from './AddComments.js';

class Comments extends Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
        postid: this.props.postid,
        comments: this.props.comments4post.filter(c=>c.parentid===this.props.postid)
      };
  }

  render(){
     const {comments} = this.state;
      return (
        <div className='comments-container'>
        <section className="list-pannel">
        <ul >
        {
          comments.map((comment) => (
            <li key={comment.id} >
              <CommentTile commentid={comment.id}/>
            </li>
          ))
        }
        </ul>
        </section>
        <AddComments postid={this.state.postid}/>
        </div>
      )
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function mapStateToProps ({ comments}) {
  return {
    comments4post: isEmpty(comments) ? []: Object.keys(comments).map(key => comments[key]).filter(Boolean) ,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCommentToState: (data) => dispatch(addCommnent(data)),
    removeCommentFromState: (data) => dispatch(removeComment(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
