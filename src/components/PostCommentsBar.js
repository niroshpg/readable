import React from 'react'

import CommentIcon from 'react-icons/lib/fa/comments'

export default  function PostCommentsBar ({count}) {
  return (
    <div className="posttile-body-commentbar">
    <CommentIcon   size={20} >comments</CommentIcon>
    <p>{count}</p>
    </div>
  )
}
