import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import CategoryPanel from './CategoryPanel.js';
import PostPannel from './PostPannel.js';

import * as ReadableAPI from '../utils/ReadableAPI';

import {addPost,removePost} from '../actions';

class App extends Component {

  state = {
    showDetailPost: false
  }

  /**
    @description lifecylce method called after when this component included into the DOM
    Here we invoke the backend API to load the all the posts
  */
  componentDidMount() {
     console.log("mount");
      ReadableAPI.getAllPosts().then((posts) => {
          console.log(posts);

          Object.keys(posts).map(key => posts[key]).filter(Boolean).map((aPost)=>{
              this.props.addPostToState(aPost,aPost)
          })
      }).finally((err)=>{
        if(err)
           console.log("done : " + err);}
      )
  }

  removePost = (post) => {
     console.log("Removing post " + post.id)
    this.props.removePostFromState(post,post)
    ReadableAPI.removePost(post)
  }

  setShowDetailPost = (enable) => {
    this.setState({ showDetailPost: enable })
  }

  onCategoryChanged = (theCategory) => {
     console.log("Category changed to : " + theCategory)
  }

  render() {
    const { posts,showPostList,showPostItem} = this.props
    let aPost = posts[1]
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

        <CategoryPanel categories={['React','Other']} onCategoryChanged={this.onCategoryChanged} category=''/>
        <PostPannel posts={posts} onRemovePost={this.removePost} />


      </div>
    );
  }
}
/*
*/
function mapStateToProps ({ posts}) {
  return {
    posts: Object.keys(posts).map(key => posts[key]).filter(Boolean)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPostToState: (data) => dispatch(addPost(data)),
    removePostFromState: (data) => dispatch(removePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
