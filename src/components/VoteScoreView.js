import React from 'react';
import PropTypes from 'prop-types';

import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import TiCloseIcon from 'react-icons/lib/ti/times'
import TiOKIcon from 'react-icons/lib/ti/tick'

export default function VoteScoreView({post,onIncrementVoteScore,onDecrementVoteScore}){
  return (
    <section class="vote-pannel">
      <button onClick={() => onIncrementVoteScore(post)} >
          <FaCaretUp size={30} className='vote-score-button'/>
      </button>
      <p className='vote-score-text' >{post.voteScore}</p>
      <button onClick={() => onDecrementVoteScore(post)} >
          <FaCaretDown size={30} className='vote-score-button'/>
      </button>
    </section>
  )

}
