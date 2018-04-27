import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import CategoryPanel from './CategoryPanel.js';
import PostPannel from './PostPannel.js';

import * as ReadableAPI from '../utils/ReadableAPI';

import {addPost,removePost,addCategory} from '../actions';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      showDetailPost: false,
      selectedCategory: ''
    }
    this.onCategoryChanged = this.onCategoryChanged.bind(this)
  }

  /**
    @description lifecylce method called after when this component included into the DOM
    Here we invoke the backend API to load the all the posts
  */
  componentDidMount() {
      ReadableAPI.getAllPosts().then((posts) => {
          Object.keys(posts).map(key => posts[key]).filter(Boolean).map((aPost)=>{
             console.log(posts);
              this.props.addPostToState(aPost)
          })
      }).finally((err)=>{
        if(err)
           console.log("ERROR: " + err);
         }
      )

/*let cats= [{
            "name":"React",
            "path":"React"
          },{
            "name":"Redux",
            "path":"Redux"
          }
        ]*/
      ReadableAPI.getAllCategories().then((data) => {
          Object.keys(data.categories).map(key => data.categories[key]).filter(Boolean).map((aCategory)=>{

 console.log(data.categories);
              this.props.addCategoryToState(aCategory)
          })
      }).finally((err)=>{
        if(err){
             console.log("ERROR: " + err)
        }
    })
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
    const {selectedCategory} = this.state

    let toggledSelectedCategory = ((prevCat,newCat)=>{
      if(prevCat=='') return newCat
      else if (prevCat==newCat) return ''
      else return newCat
    })(selectedCategory,theCategory)

    this.setState({ selectedCategory: toggledSelectedCategory })

  }

  render() {
    const { posts,showPostList,showPostItem,categories} = this.props

      const { selectedCategory} = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

        <CategoryPanel  categories={Object.keys(categories).map(key => categories[key].name).filter(Boolean)}
                        onCategoryChanged={this.onCategoryChanged} icategory={selectedCategory}/>

        <PostPannel posts={
                    selectedCategory ? posts.filter((k)=>(k.category == selectedCategory)) : posts}
                    onRemovePost={this.removePost} />

      </div>
    );
  }
}
/*
*/
function mapStateToProps ({ posts,categories}) {
  return {
    posts: Object.keys(posts).map(key => posts[key]).filter(Boolean),
    categories: Object.keys(categories).map(key => categories[key]).filter(Boolean)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPostToState: (data) => dispatch(addPost(data)),
    addCategoryToState: (data) => dispatch(addCategory(data)),
    removePostFromState: (data) => dispatch(removePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
