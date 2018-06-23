import React from 'react'
import { connect } from 'react-redux';

import {incrementCommentVoteAndUpdate,deccrementCommentVoteAndUpdate} from '../actions';

import { Icon } from 'react-icons-kit'
import {ic_add} from 'react-icons-kit/md/ic_add'
import {ic_remove} from 'react-icons-kit/md/ic_remove'

const CommentScore = (props) => (

  <div className="posttile-header-score">
    <button className='posttile-button'  onClick={() => props.decrement(props.comment)}>
        <Icon icon={ic_remove} size={20}  />
    </button>
   <p className='vote-score-text' >{props.comment.voteScore}</p>
    <button className='posttile-button' onClick={() => props.increment(props.comment)} >
        <Icon icon={ic_add } size={20}/>
    </button>
  </div>
)


const mapStateToProps = state => ({
  count: state.count,
})

const mapDispatchToProps = dispatch => ({
  increment: (comment) => incrementCommentVoteAndUpdate(comment)(dispatch),
  decrement: (comment) => deccrementCommentVoteAndUpdate(comment)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentScore)
