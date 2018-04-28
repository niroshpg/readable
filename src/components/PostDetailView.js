import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FaCloseIcon from 'react-icons/lib/fa/close'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'
import TiArrowBack from 'react-icons/lib/ti/arrow-back'
import Moment from 'react-moment';

import VoteScoreView from './VoteScoreView.js';
import {incrementVote,decrementVote} from '../actions';

class PostDetailView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  constructor(props, context) {
      super(props, context);

      this.state = {
        category: '',
        post:props.post
      };

      this.onIncrementVoteScore.bind(this);
      this.onDecrementVoteScore.bind(this);
  }

  onIncrementVoteScore = (post) => {
    this.props.dispatch(incrementVote(post))
  }

  onDecrementVoteScore = (post) => {
    this.props.dispatch(decrementVote(post))
  }

  updateCategory = (new_category) => {
    this.setState({ category: new_category })
  }

  clearCategory = () => {
    this.setState({ category: '' })
  }

  render() {
    const { post,clearSelectedPost,editPost,deletePost} = this.props
    const { category } = this.state

    return (
      <div className='posts-details-container'>
      {
        post && !post.deleted &&
        <section className='posts-details-view'>
        <section className='posts-details-view-toolbar'>
            <button className='posts-details-view-toolbar-back' onClick={() => clearSelectedPost()} >
                <TiArrowBack size={30}/>
            </button>
        </section>

          <section className='posts-details-view-header'>

          <VoteScoreView  post={post}
                          onIncrementVoteScore={this.onIncrementVoteScore}
                          onDecrementVoteScore={this.onDecrementVoteScore}/>
          <h2 style={{ marginTop: '30px'}}>{post.title}</h2>
          <button className='posts-details-view-toolbar-edit' onClick={() => editPost(post)} >
              <FaEdit size={30}/>
          </button>

          <button className='posts-details-view-toolbar-close' onClick={() => deletePost(post)} >
              <FaCloseIcon size={30}/>
          </button>
          </section>
          <section className='posts-details-view-body'>
            <h4>posted  by {post.author} at <span>  <Moment format="YYYY/MM/DD HH:MM">{post.timestamp}</Moment> </span> </h4>
            <p>{post.body}</p>

          </section>


        </section>
      }
      </div>
    )
  }
}

export default connect()(PostDetailView)
