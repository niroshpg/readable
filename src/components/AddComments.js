import React, { Component } from 'react';
import { connect } from 'react-redux'
import { v4 } from 'uuid';

import {createCommentAndUpdate} from '../actions';

class AddComments extends Component {

  constructor(props, context) {
      super(props, context);
      this.state = {
        comment:'',
        postid: this.props.postid
      };
      this.onCommentChange.bind(this);
      this.onCommentSubmit.bind(this);
  }

  onCommentChange = (changedComment) => {
    this.setState({ comment: changedComment })
  }

  onCommentSubmit = (comment) => {
    this.props.addCommentsToState({id: v4(), body: comment, voteScore: 0, timestamp: Date.now(), parentid: this.state.postid});
    this.setState({ comment: '' })
  }


  render() {
    const { comment} = this.state
    return (
      <div className='posts-a-comment-item'>
        <input
          type='text'
          className='posts-a-comment-item-input'
          placeholder='add a comment ...'
          value={comment}
          ref='commentInput'
          onChange={(event) => {
              this.onCommentChange(event.target.value)
            }
          }
          onKeyPress={event => {
            if (event.key === 'Enter') {
              this.onCommentSubmit(event.target.value)
            }
          }}
        />
      </div>
    )
  }
}

function mapStateToProps ({comments}) {
  return {
    comments: Object.keys(comments).map(key => comments[key]).filter(Boolean)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCommentsToState: (data) => dispatch(createCommentAndUpdate(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComments)
