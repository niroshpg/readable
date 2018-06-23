import React from 'react'
import { connect } from 'react-redux';

import {incrementVoteAndUpdate,deccrementVoteAndUpdate} from '../actions';

import { Icon } from 'react-icons-kit'
import {ic_add} from 'react-icons-kit/md/ic_add'
import {ic_remove} from 'react-icons-kit/md/ic_remove'

const PostScore = (props) => (

  // <div className="posttile-header-score">
  //
  //     <button onClick={() => this.props.increment(post)} >
  //         <FaCaretUp size={10} className='vote-score-button'/>
  //     </button>
  //     <p className='vote-score-text' >{post.voteScore}</p>
  //     <button onClick={() => this.props.decrement(post)} >
  //         <FaCaretDown size={10} className='vote-score-button'/>
  //     </button>
  // </div>
  <div className="posttile-header-score">
    <button className='posttile-button'  onClick={() => props.decrement(props.post)}>
        <Icon icon={ic_remove} size={20}  />
    </button>
   <p className='vote-score-text' >{props.post.voteScore}</p>
    <button className='posttile-button' onClick={() => props.increment(props.post)} >
        <Icon icon={ic_add } size={20}/>
    </button>
  </div>
)


const mapStateToProps = state => ({
  count: state.count,
})

const mapDispatchToProps = dispatch => ({
  increment: (post) => dispatch(incrementVoteAndUpdate(post)),
  decrement: (post) => dispatch(deccrementVoteAndUpdate(post)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostScore)
