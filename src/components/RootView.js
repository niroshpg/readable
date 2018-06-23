import React, { Component }  from 'react'

import { connect } from 'react-redux'
import '../App.css';

import Posts from './Posts'

class RootView extends Component {
  render(){
    const { categories} = this.props
    return (
      <div>
          <Posts selection={[...categories]}/>
      </div>
    )
  }
}

function mapStateToProps ({ categories}) {
  return {
    categories: Object.keys(categories).map(key => categories[key].name).filter(Boolean)
  }
}

export default connect(
  mapStateToProps,
  null
)(RootView)
