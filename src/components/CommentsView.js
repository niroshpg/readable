import React from 'react';
import PropTypes from 'prop-types';

import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import TiCloseIcon from 'react-icons/lib/ti/times'
import TiOKIcon from 'react-icons/lib/ti/tick'
import CommentsVoteScoreView from './CommentsVoteScoreView.js';
import AddCommentView from './AddCommentView.js';

export default function CommentsView(props){
  let usercomment
  return (
    <section class="addCommentsToState-pannel">
      <ul className='posts-list'>
        {props.comments.map((comment) => (
          <li key={comment.id} className='posts-list-item'>
          {
            comment && <CommentsVoteScoreView  comment={comment}
                          onIncrementVoteScore={props.onIncrementVoteScore}
                          onDecrementVoteScore={props.onDecrementVoteScore}/>
            }
            <div className='posts-details'>
              <p>{comment.body}</p>
            </div>
          </li>

        ))
      }
      </ul>
      <AddCommentView addComments={props.addComments}/>
    </section>
  )

}
