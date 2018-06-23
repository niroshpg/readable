import React, { Component }  from 'react'
import { connect } from 'react-redux'

import '../App.css';
import {addCommnent,removeComment} from '../actions';
import CommentTile from './CommentTile'

class Comments extends Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
        postid: this.props.postid,
      };
  }

  render(){
      let thecomments = this.props.comments4post.filter(c=>c.parentid===this.state.postid);
      return (
        <div className='comments-container'>
        <section className="list-pannel">
        <ul >
          {
              thecomments.map((comment) => (
                <li key={comment.id} >
                  <CommentTile commentid={comment.id}/>
                </li>
              ))
          }
        </ul>
        </section>
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
