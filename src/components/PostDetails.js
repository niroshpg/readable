import React, { Component }  from 'react'
import Moment from 'react-moment';
import { connect } from 'react-redux'

import PostToolBar from './PostToolBar'
import PostScore from './PostScore'
import Comments from './Comments'

import {addPost,removePost} from '../actions';

import '../App.css';

class PostDetails extends Component {
  constructor(props,context){
    super(props, context);
    this.state = {
      postid: props.match.params.post,
      category:props.match.params.category
    };

  }

  onPostEdit = (post) => {
      console.log("edit post")
    }

  onPostSelected = (selected) => {
      console.log("edit post")
  }

  onRemovePost = (removed) => {
      console.log("edit post")
  }


  render(){
    const { posts} = this.props;
    let detailedPost = posts.filter(p=>p.id===this.state.postid)[0];
    /*let detailedPostComments = comments4posts.filter(c=>c.parentId===detailedPost.id);*/

    return (
      <div className="posttile-container">
        <section className="posttile-header">

            <PostScore post={detailedPost} />

            <PostToolBar  post={detailedPost}
                          showInfo={false}
                          onPostEdit={this.onPostEdit}
                          onPostSelected={this.onPostSelected}
                          onRemovePost={this.onRemovePost} />
        </section>

        <section className="posttile-body">
          <h1>{detailedPost.title}</h1>
          <h4><em>by {detailedPost.author} @ <span><Moment format="YYYY/MM/DD HH:MM">{detailedPost.timestamp}</Moment> </span></em></h4>

          <p>{ detailedPost.body}</p>
          <Comments postid={detailedPost.id}/>

        </section>

      </div>
    )
  }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function mapStateToProps ({ posts,comments}) {
  return {
    posts: isEmpty(posts) ? []: Object.keys(posts).map(key => posts[key]).filter(Boolean) ,
    comments4posts: Object.keys(comments).map(key => comments[key]).filter(Boolean),
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
)(PostDetails)
