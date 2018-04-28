import React, { Component } from 'react';
import PropTypes from 'prop-types';


import TiCloseIcon from 'react-icons/lib/ti/times'
import TiOKIcon from 'react-icons/lib/ti/tick'


class AddPost extends Component {

  render() {
    const {post,onPostAdded} = this.props
    return (
      <div className='add-post'>
        <h1>Add post ...</h1>
        <button onClick={() => onPostAdded(post)} >
            <TiOKIcon size={50}/>
        </button>
        <button onClick={() => onPostAdded(post)} >
            <TiCloseIcon size={40}/>
        </button>
      </div>
    )
  }
}

export default AddPost
