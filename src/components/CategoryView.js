import React, { Component }  from 'react'

import { connect } from 'react-redux'
import '../App.css';

import Posts from './Posts'

class CategoryView extends Component {

  render(){
    let cat = this.props.match.params.category;
    return (
      <div>
          <p>Home content: {cat}</p>
          <Posts selection={[cat]}/>
      </div>
    )
  }
}

function mapStateToProps ({ categories}) {
  return {
    categories: Object.keys(categories).map(key => categories[key]).filter(Boolean)
  }
}


export default connect(
  mapStateToProps,
  null,null,{
  pure: true
}
)(CategoryView)
