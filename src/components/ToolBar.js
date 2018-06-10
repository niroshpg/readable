import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../App.css';

import * as ReadableAPI from '../utils/ReadableAPI';
import {addPost,removePost,addCategory} from '../actions';

class ToolBar extends Component {

  componentDidMount() {
    ReadableAPI.getAllPosts().then((posts) => {
          Object.keys(posts).map(key => posts[key]).filter(Boolean).map((aPost)=>{
              this.props.addPostToState(aPost)
          })
      }).finally((err)=>{
        if(err)
           console.log("ERROR: " + err);
         }
      )

    ReadableAPI.getAllCategories().then((data) => {
      Object.keys(data.categories)
      .map(key => data.categories[key])
      .filter(Boolean).map((aCategory)=>{

        this.props.addCategoryToState(aCategory)
      })
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
          <nav className='nav-bar'>
            <ul>
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
