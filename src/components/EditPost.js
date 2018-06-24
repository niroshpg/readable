import React, { Component }  from 'react'
import { connect } from 'react-redux'



import {editPostAndUpdate} from '../actions';

import '../App.css';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      title: this.props.location.state.title,
      author: this.props.location.state.author,
      category: this.props.location.state.category,
      timestamp: this.props.location.state.timestamp,
      body:this.props.location.state.body,
      voteScore:this.props.location.state.voteScore
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPost = this.handleSaveEditPost.bind(this);
    this.handleAddPost = this.handleCancelEditPost.bind(this);
  }
  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleSaveEditPost = (event) => {
    event.preventDefault();
    this.props.editPostInState({...this.state});
    this.props.history.goBack();
  }

  handleCancelEditPost = (event) => {
    event.preventDefault();
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
          <h3>Edit Post</h3>

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



            <button   onClick={this.handleSaveEditPost}
                      style={{"padding": "10px","margin":"10px 30px 0 0", "backgroundColor":"#0188aa", "color":"white"}}
                      value={this.state}
            >
            Save
            </button>
            <button   onClick={this.handleCancelEditPost}
                      style={{"padding": "10px", "backgroundColor":"grey", "color":"white"}}
                      value={this.state}
            >
            Cancel
            </button>
          </form>
      </div>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    editPostInState: (data) => dispatch(editPostAndUpdate(data)),
  }
}

function mapStateToProps ({ posts,categories}) {
  return {
    posts4edit: Object.keys(posts).map(key => posts[key]).filter(Boolean),
    categories: Object.keys(categories).map(key => categories[key]).filter(Boolean)
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)
