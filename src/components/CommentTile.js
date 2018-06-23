import React, { Component }  from 'react'

import { connect } from 'react-redux'
import '../App.css';

import PostCommentsBar from './PostCommentsBar'
import CommentScore from './CommentScore'

import {addCommnent,removePost} from '../actions';

import { withRouter } from "react-router-dom";


class CommentTile extends Component {

  constructor(props,context){
    super(props, context);
    this.state = {
        commentid:props.commentid
    };
  }

  onPostEdit = (comment) => {
    console.log("edit comment")
  }

  onRemovePost = (removed) => {
    console.log("remove comment")
  }

  componentDidMount() {
    // let thecomment = this.props.comments4tiles.filter(p=>p.id===this.state.commentid)[0];
    //   console.log("commentTile mounted c= " + thecomment.voteScore)
  }

  componentDidUpdate() {
    // let thecomment = this.props.comments4tiles.filter(p=>p.id===this.state.commentid)[0];
    //
    //   console.log("commentTile updated c= " + thecomment.voteScore)
  }

  render(){
    let thecomment = this.props.comments4tiles.filter(p=>p.id===this.state.commentid)[0];

    return (
          <div className="commentile-container">
            <section className="commentile-header">

                <CommentScore comment={thecomment} />

                <PostCommentsBar  post={thecomment}
                              showInfo={false}
                              onPostEdit={this.onPostEdit}
                              onPostSelected={this.onPostSelected}
                              onRemovePost={this.onRemovePost} />
            </section>

            <section className="commentile-body">
              <h4>{thecomment.body}</h4>

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
)(withRouter(CommentTile))
