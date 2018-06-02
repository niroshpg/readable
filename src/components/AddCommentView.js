import React, { Component } from 'react';


class PostACommentView extends Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
        comment:''
      };
      this.onCommentChange.bind(this);
      this.onCommentSubmit.bind(this);
  }

  onCommentChange = (changedComment) => {
    this.setState({ comment: changedComment })
  }

  onCommentSubmit = (comment) => {
    this.props.addComments(comment)
    this.setState({ comment: '' })
  }

  render() {
    const { addComments} = this.props
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

export default PostACommentView;
