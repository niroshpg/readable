import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid';

import {createPostAndUpdate} from '../actions';

import '../App.css';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      category: 'react',
      timestamp: Date.now(),
      body:'',
      voteScore:0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPost = this.handleAddPost.bind(this);
  }
  handleSubmit = (event) => {
      event.preventDefault();
  }

  handleAddPost = (event) => {
      event.preventDefault();

      console.log('handleAddPost: '+JSON.stringify(this.state));
      //{id, timestamp,title,body,author,category,voteScore,deleted}
      this.props.createPostFromData({id:v4(), timestamp: Date.now(),...this.state});
        console.log('handleAddPost: done');
      this.props.history.goBack();

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="list-pannel">
          <h3>Create Post</h3>

          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input
                name="title"
                type="context"
                value={this.state.title}
                onChange={this.handleInputChange} />
            </label>
            <label>
              Category:
                <select name="category" onChange={this.handleInputChange}
                value={this.state.category}>{
                  this.props.categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)
                }
                </select>
            </label>
            <br />
            <label>
              Author:
              <input
                name="author"
                type="text"
                value={this.state.author}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              body:
              <input
                name="body"
                type="textarea"
                value={this.state.body}
                onChange={this.handleInputChange} />
            </label>
            <br />



            <button   onClick={this.handleAddPost}
                      style={{"padding": "10px", "backgroundColor":"blue", "color":"white"}}
                      value={this.state}
            >
            Add Post
            </button>

          </form>
      </div>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    createPostFromData: (data) => dispatch(createPostAndUpdate(data)),
  }
}

function mapStateToProps ({ categories}) {
  return {
    categories: Object.keys(categories).map(key => categories[key]).filter(Boolean)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)
