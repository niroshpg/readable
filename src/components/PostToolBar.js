import React from 'react'

import FaCloseIcon from 'react-icons/lib/fa/close'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'


export default  function PostToolBar ({post,showInfo,onPostEdit,onPostSelected,onRemovePost}) {
  return (
    <div className="posttile-header-tools">
      <button className="posttile-button" onClick={() => onPostEdit(post)} >
          <FaEdit size={20}/>
      </button>
      {showInfo && <button className="posttile-button" onClick={() => onPostSelected(post)} >
          <FaInfoCircle size={20}/>
      </button>
        }
      <button className="posttile-button" onClick={() => onRemovePost(post)} >
          <FaCloseIcon size={20}/>
      </button>
    </div>
  )
}
