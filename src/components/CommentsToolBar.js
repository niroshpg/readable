import React from 'react'

import FaCloseIcon from 'react-icons/lib/fa/close'
import FaEditIcon from 'react-icons/lib/fa/edit'


export default  function CommentsToolBar ({comment,onCommentEdit,onRemoveComment}) {
  return (
    <div className="commenttile-header-tools">
      <button className="posttile-button" onClick={() => onCommentEdit(comment)} >
          <FaEditIcon size={20}/>
      </button>

      <button className="posttile-button" onClick={() => onRemoveComment(comment)} >
          <FaCloseIcon size={20}/>
      </button>
    </div>
  )
}
