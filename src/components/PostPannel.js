import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaCloseIcon from 'react-icons/lib/fa/close'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'

import PostListView from './PostListView.js'
import PostDetailView from './PostDetailView.js'

class PostPannel extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  state = {
    posts: '',
    selectedPost: null
  }

  onPostSelected = (post) => {
    this.setState({ selectedPost: post })
  }

  clearPostSelected = () => {
    this.setState({ selectedPost: null })
  }


  onPostEdit = (post) => {
    {
      console.log("edit post")
    }
  }


  render() {
    const {posts,onRemovePost} = this.props
    const { selectedPost} = this.state
    return (
      <section className='post-pannel'>
      {
        (selectedPost === null) ?
        <PostListView posts={posts}
                      onPostSelected={this.onPostSelected}
                      onRemovePost={onRemovePost}
                      /> :
        <PostDetailView post={selectedPost}
                        clearPostSelected={this.clearPostSelected}/>

      }
      </section>
    )
  }
}

export default PostPannel
