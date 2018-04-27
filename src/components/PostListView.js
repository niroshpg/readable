import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaCloseIcon from 'react-icons/lib/fa/close'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'

class PostListView extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  state = {
    category: ''
  }

  updateCategory = (new_category) => {
    this.setState({ category: new_category })
  }

  clearCategory = () => {
    this.setState({ category: '' })
  }

  render() {
    const { posts ,onRemovePost,onPostSelected,onPostEdit} = this.props
    const { category } = this.state

    let showingPosts;
    showingPosts = posts;

    return (
      <div className='list-posts'>

        <ul className='posts-list'>
          {showingPosts.map((post) => (
            <li key={post.id} className='posts-list-item'>
            <button onClick={() => onRemovePost(post)} >
                <FaCaretUp size={20}/>
            </button>
            <p>1</p>
            <button onClick={() => onRemovePost(post)} >

                <FaCaretDown size={20}/>
            </button>
              <div className='posts-details'>
                <p>{JSON.stringify(post.title)}</p>
              </div>
              <button onClick={() => onPostEdit(post)} >
                  <FaEdit size={20}/>
              </button>
              <button onClick={() => onPostSelected(post)} >
                  <FaInfoCircle size={20}/>
              </button>
              <button onClick={() => onRemovePost(post)} >
                  <FaCloseIcon size={20}/>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PostListView
