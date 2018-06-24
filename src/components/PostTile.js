import React, { Component }  from 'react'

import { connect } from 'react-redux'
import '../App.css';

import PostToolBar from './PostToolBar'
import PostCommentsBar from './PostCommentsBar'
import PostScore from './PostScore'

import * as ReadableAPI from '../utils/ReadableAPI';
import {addCommnent,removePost} from '../actions';

import { withRouter } from "react-router-dom";


class PostTile extends Component {

  constructor(props,context){
    super(props, context);
    this.state = {
        postid:props.postid
    };
      this.onPostSelected.bind(this);
  }

  onPostEdit = (post) => {
        /*this.props.history.push(`/${selected.category}/${selected.id}`);*/
        let latestPost = this.props.posts4tiles.filter(p=>p.id===this.state.postid)[0];
        this.props.history.push({
          pathname: '/edit',
          state: { ...latestPost }
        })
  }

  onPostSelected = (selected) => {
        this.props.history.push(`/${selected.category}/${selected.id}`);

  }

  onRemovePost = (removed) => {
      console.log("removed post")
      this.props.removePostFromState(removed,removed)
      ReadableAPI.removePost(removed)
  }

  /**
    @description lifecylce method called after when this component included into the DOM
    Here we invoke the backend API to load the all the posts
  */
  componentDidMount() {
    let theid = this.props.postid;

    ReadableAPI.getAllCommentsForPost({id:theid})
    .then(
      (comments) => {
        Object.keys(comments).map(key => comments[key]).filter(Boolean).map((acomment)=>{
            return this.props.addCommentsToState({...acomment,parentid:theid})
        })
    })
    .finally((err)=>{
      if(err)
         console.log("ERROR: " + err);
       }
    )
  }

  render(){
    const {posts4tiles,comments4tiles} = this.props;
    let latestPost = posts4tiles.filter(p=>p.id===this.state.postid)[0];
    /*let latestPostComments = comments4tiles.filter(c=>c.parentId==latestPost.id);*/
    return (
          <div className="posttile-container">
            <section className="posttile-header">

                <PostScore post={latestPost} />

                <PostToolBar  post={latestPost}
                              showInfo={true}
                              onPostEdit={this.onPostEdit}
                              onPostSelected={this.onPostSelected}
                              onRemovePost={this.onRemovePost} />
            </section>

            <section className="posttile-body">
              <h4>{latestPost.title}</h4>
              <PostCommentsBar count={comments4tiles.filter(
                (cm)=>{
                  return cm.parentid === latestPost.id
                }
              ).length}/>
            </section>
          </div>
    )
  }
}

function mapStateToProps ({ posts,comments}) {
  return {
    posts4tiles: Object.keys(posts).map(key => posts[key]).filter(Boolean),
    comments4tiles: Object.keys(comments).map(key => comments[key]).filter(Boolean),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addCommentsToState: (data) => dispatch(addCommnent(data)),
    removePostFromState: (data) => dispatch(removePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostTile))
