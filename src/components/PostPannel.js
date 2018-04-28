import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal'

import FaCloseIcon from 'react-icons/lib/fa/close'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'
import FaPlusIcon from 'react-icons/lib/fa/plus'

import PostListView from './PostListView.js'
import PostDetailView from './PostDetailView.js'
import AddPost from './AddPost.js'

class PostPannel extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  state = {
    posts: '',
    selectedPost: null,
    addPostModalOpen:false
  }

  openAddPostModal = () => {
    this.setState(() => ({
      addPostModalOpen: true,
    }))
  }
  closeAddPostModal = () => {
    this.setState(() => ({
      addPostModalOpen: false
    }))
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

  onPostAdded = (post) => {
    {
      console.log("post added: " + JSON.stringify(post))
      this.closeAddPostModal()
    }
  }

  onIncrementVoteScore = (post) => {
    {
      this.setState({

      })
    }
  }

  onDecrementVoteScore = (post) => {
    {
      this.setState({

      })
    }
  }





  render() {
    const {posts,onRemovePost} = this.props
    const { selectedPost,addPostModalOpen} = this.state
    return (
      <section className='post-pannel'>
      {
        ((selectedPost === null) ?
        <PostListView posts={posts}
                      onPostSelected={this.onPostSelected}
                      onRemovePost={onRemovePost}
                      onIncrementVoteScore={this.onIncrementVoteScore}
                      onDecrementVoteScore={this.onDecrementVoteScore}
                      /> :
        <PostDetailView post={selectedPost}
                        clearPostSelected={this.clearPostSelected}/>
        )
      }

      <button className='post-pannel-addpost' onClick={() => this.openAddPostModal()} >
          <FaPlusIcon size={30}/>
      </button>

      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={addPostModalOpen}
        onRequestClose={this.closeAddPostModal}
        contentLabel='Modal'
      >
        {addPostModalOpen && <AddPost onPostAdded={this.onPostAdded}/>}
      </Modal>

      </section>
    )
  }
}

export default PostPannel
