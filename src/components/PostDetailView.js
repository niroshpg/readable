import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaCloseIcon from 'react-icons/lib/fa/close'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'

class PostDetailView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
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
    const { post,onRemovePost,clearPostSelected} = this.props
    const { category } = this.state

    //let showingPosts;
    // if (category) {
    //   showingPosts = posts.filter((post) => post.category == category)
    // } else {
    //   showingPosts = posts
    // }
    //showingPosts = posts;

    return (
      <div className='list-posts'>
      {
        post &&
        <section className='posts-list'>
            <div className='posts-list-item'>
      
              <div className='posts-details'>
              <p>Post Details</p>
                <p>{JSON.stringify(post.title)}</p>
              </div>
              <button onClick={() => onRemovePost(post)} >
                  <FaEdit size={20}/>
              </button>

              <button onClick={() => clearPostSelected(post)} >
                  <FaCloseIcon size={20}/>
              </button>
            </div>
        </section>
      }

      </div>
    )
  }
}

export default PostDetailView
