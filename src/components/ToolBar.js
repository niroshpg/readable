import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from 'react-icons-kit'
import {ic_home} from 'react-icons-kit/md/ic_home'

import '../App.css';

import * as ReadableAPI from '../utils/ReadableAPI';
import {addPost,addCategory} from '../actions';

class ToolBar extends Component {

  componentDidMount() {
    ReadableAPI.getAllPosts().then(
      (posts) => {
          Object.keys(posts).map(key => posts[key]).filter(Boolean).map((aPost)=>{
              return this.props.addPostToState(aPost)
          })
      }
    ).finally((err)=>{
        if(err)
           console.log("ERROR: " + err);
         }
      )

    ReadableAPI.getAllCategories()
    .then((data) => {
      Object.keys(data.categories)
      .map(key => data.categories[key])
      .filter(Boolean).map((aCategory)=>{
        return this.props.addCategoryToState(aCategory)
      });
    }).finally((err)=>{
    if(err){
       console.log("ERROR: " + err)
     }
    })
  }//componentDidMount

    render(){
      const {categories} = this.props;
      let cat = Object.keys(categories).map(key => categories[key].name).filter(Boolean);
      return (
        <div>
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
          <nav className='nav-bar'>
            <ul >
                <li>
                    <Link to={`/`}>
                      <Icon icon={ic_home} size={20} />
                    </Link>
                </li>
                {
                      cat.map((category)=>{
                        return  <li key={category}>
                              <Link to={`/${category}`}>{category}</Link>
                        </li>
                      }
                     )
                }
            </ul>
          </nav>
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

function mapStateToProps ({ posts,categories}) {
  return {

    posts: isEmpty(posts) ? {}: Object.keys(posts).map(key => posts[key]).filter(Boolean) ,
    categories: Object.keys(categories).map(key => categories[key]).filter(Boolean)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPostToState: (data) => dispatch(addPost(data)),
    addCategoryToState: (data) => dispatch(addCategory(data)),
    // removePostFromState: (data) => dispatch(removePost(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar)
