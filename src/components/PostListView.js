import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FaCloseIcon from 'react-icons/lib/fa/close'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'
import VoteScoreView from './VoteScoreView.js';


import {incrementVote,decrementVote} from '../actions';

class PostListView extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  constructor(props, context) {
      super(props, context);

      this.state = {
        category: ''
      }

      this.onIncrementVoteScore.bind(this)
      this.onDecrementVoteScore.bind(this)
  }


  updateCategory = (new_category) => {
    this.setState({ category: new_category })
  }

  clearCategory = () => {
    this.setState({ category: '' })
  }

  onIncrementVoteScore = (post) => {
    this.props.dispatch(incrementVote(post))
  }

  onDecrementVoteScore = (post) => {
    this.props.dispatch(decrementVote(post))
  }

  render() {
    const { posts ,onRemovePost,onPostSelected,onPostEdit,
            } = this.props
    const { category } = this.state

    let showingPosts;
    showingPosts = posts;

    return (
      <div className='list-posts'>

        <ul className='posts-list'>
          {showingPosts.map((post) => (
            <li key={post.id} className='posts-list-item'>
              <VoteScoreView  post={post}
                              onIncrementVoteScore={this.onIncrementVoteScore}
                              onDecrementVoteScore={this.onDecrementVoteScore}/>
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

export default connect()(PostListView)
