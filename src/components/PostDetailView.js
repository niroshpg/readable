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
import CommentsView from './CommentsView.js';

import {incrementVote,decrementVote,addCommnent,
  incrementCommentVote,decrementCommentVote} from '../actions';

import * as ReadableAPI from '../utils/ReadableAPI';

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
    //this.props.dispatch(incrementVote(post))
    this.props.incrementVoteInState(post)
  }

  onDecrementVoteScore = (post) => {
    //this.props.dispatch(decrementVote(post))
    this.props.decrementVoteInState(post);
  }

  onIncrementCommentVoteScore = (comment) => {
    //this.props.dispatch(incrementVote(post))
    this.props.onIncrementCommentVoteInSate(comment)
  }

  onDecrementCommentVoteScore = (comment) => {
    //this.props.dispatch(decrementVote(post))
    this.props.decrementCommentVoteInState(comment);
  }

  updateCategory = (new_category) => {
    this.setState({ category: new_category })
  }

  clearCategory = () => {
    this.setState({ category: '' })
  }

    /**
      @description lifecylce method called after when this component included into the DOM
      Here we invoke the backend API to load the all the posts
    */
    componentDidMount() {
      let aPost = this.props.post;

      ReadableAPI.getAllCommentsForPost(aPost).then((comments) => {
          Object.keys(comments).map(key => comments[key]).filter(Boolean).map((acomment)=>{
             console.log(acomment);
              this.props.addCommentsToState(acomment)
          })
      }).finally((err)=>{
        if(err)
           console.log("ERROR: " + err);
         }
      )

        //
        // ReadableAPI.getAllCommentsForPost(aPost).then((comments) => {
        //     Object.keys(comments).map(key => comments[key]).filter(Boolean).map((acomment)=>{
        //        console.log(acomment);
        //         this.props.addCommentsToState(aPost,acomment)
        //     })
        // }).finally((err)=>{
        //   if(err)
        //      console.log("ERROR: " + err);
        //    }
        // )
    }

  render() {
    const { posts,comments,clearSelectedPost,editPost,deletePost} = this.props
    const { post,category } = this.state

    let latestPost = posts.filter(p=>p.id==post.id)[0]
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
            <VoteScoreView  post={latestPost}
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
          <CommentsView comments={comments}
                        post={post}
                        onIncrementVoteScore={this.onIncrementCommentVoteScore}
                        onDecrementVoteScore={this.onDecrementCommentVoteScore}/>
        </section>

        </section>
      }
      </div>
    )
  }
}

function mapStateToProps ({ posts,comments}) {
  return {
    comments: Object.keys(comments).map(key => comments[key]).filter(Boolean),
    posts: Object.keys(posts).map(key => posts[key]).filter(Boolean)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCommentsToState: (data) => dispatch(addCommnent(data)),
    incrementVoteInState: (data) => dispatch(incrementVote(data)),
    decrementVoteInState: (data) => dispatch(decrementVote(data)),
    onIncrementCommentVoteInSate: (data) => dispatch(incrementCommentVote(data)),
    decrementCommentVoteInState: (data) => dispatch(decrementCommentVote(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailView)
