import React from 'react';
import PropTypes from 'prop-types';

import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import TiCloseIcon from 'react-icons/lib/ti/times'
import TiOKIcon from 'react-icons/lib/ti/tick'

export default function CommentsVoteScoreView({comment,onIncrementVoteScore,onDecrementVoteScore}){
  return (
    <section class="vote-pannel">
      <button onClick={() => onIncrementVoteScore(comment)} >
          <FaCaretUp size={30} className='vote-score-button'/>
      </button>
      <p className='vote-score-text' >{comment.voteScore}</p>
      <button onClick={() => onDecrementVoteScore(comment)} >
          <FaCaretDown size={30} className='vote-score-button'/>
      </button>
    </section>
  )
}
