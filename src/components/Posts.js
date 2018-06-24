import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Icon } from 'react-icons-kit'
import {ic_add} from 'react-icons-kit/md/ic_add'


import PostTile from './PostTile'
import '../App.css';

import {addPost,removePost} from '../actions';

class Posts extends Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
        category: '',
        sortMethod: 'byVoteScore'
      };

      this.onSortChanged.bind(this);
  }

  onSortChanged = (e) => {
    this.setState({
      sortMethod: e.target.value
    });
  }

  render(){
      const { selection,posts} = this.props
      let filteredPosts;
      let showingPosts;

      filteredPosts = posts.filter( (p)=>{
             return selection.includes(p.category)
      })

      showingPosts = filteredPosts.sort((a,b)=>{
        if(this.state.sortMethod === 'byVoteScoreA'){
          return a.voteScore > b.voteScore
        }
        else if(this.state.sortMethod === 'byVoteScoreD'){
        return   a.voteScore < b.voteScore

        }
        else if(this.state.sortMethod === 'byTimestamp'){
          return  a.timestamp < b.timestamp
        }
        else
        return a < b
      });

      return (
        <div className='posts-container'>
          <section className="sort-pannel">
             <p>Sort by: </p>
             <select
               value={this.state.sortMethod}
               onChange={this.onSortChanged}
               className="sort-pannel-select"
             >
               <option value="byVoteScoreD">decending</option>
                <option value="byVoteScoreA">accending</option>
               <option value="byTimestamp">latest</option>
             </select>
             <p>Add Post: </p>
             <Link to={`/create`}>
                 <Icon icon={ic_add} size={40} style={{"color":"green"}} />
             </Link>

          </section>
          <section className="list-pannel">
              <ul >
                {
                    showingPosts.map((post) => (
                      <li key={post.id} >
                        <PostTile postid={post.id}/>
                      </li>
                    ))
                }
              </ul>
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

function mapStateToProps ({ posts}) {
  return {
    posts: isEmpty(posts) ? []: Object.keys(posts).map(key => posts[key]).filter(Boolean) ,
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
)(Posts)
