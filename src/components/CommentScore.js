import React, {Component} from 'react';
import { connect } from 'react-redux';

import {incrementCommentVoteAndUpdate,deccrementCommentVoteAndUpdate} from '../actions';

import { Icon } from 'react-icons-kit'
import {ic_add} from 'react-icons-kit/md/ic_add'
import {ic_remove} from 'react-icons-kit/md/ic_remove'

class CommentScore extends Component{

  render(){
    const {increment,decrement,comments4vscore} = this.props;

    let thecomment= comments4vscore.filter(c=>c.id===this.props.comment.id)[0];

    return (
        <div>
          <div className="posttile-header-score">
            <button className='posttile-button'  onClick={() => decrement(thecomment)}>
                <Icon icon={ic_remove} size={20}  />
            </button>
           <p className='vote-score-text' >{thecomment.voteScore}</p>
            <button className='posttile-button' onClick={() => increment(thecomment)} >
                <Icon icon={ic_add } size={20}/>
            </button>
          </div>
        </div>

    )
  }
}

function mapStateToProps ({ comments}) {
  return {
    comments4vscore: Object.keys(comments).map(key => comments[key]).filter(Boolean),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    increment: (comment) => incrementCommentVoteAndUpdate(comment)(dispatch),
    decrement: (comment) => deccrementCommentVoteAndUpdate(comment)(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentScore)
