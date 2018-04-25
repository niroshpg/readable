import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaCloseIcon from 'react-icons/lib/fa/close'
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import FaInfoCircle from 'react-icons/lib/fa/info-circle'
import FaEdit from 'react-icons/lib/fa/edit'

class CategoryPanel extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  state = {
    category: ''
  }

  updateCategory = (new_category) => {
    this.setState({ category: new_category })
  }

  clearCategory = () => {
    this.setState({ category: '' })
  }
  // <div className='categories-details'>
  // </div>
  render() {
    const { categories ,onRemovePost} = this.props
    const { category } = this.state


    return (
      <div className='list-categories'>

        <ul className='categories-list'>
          {categories.map((cat) => (
            <li key={cat} className='categories-list-item'>

                <p>{cat}</p>

            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CategoryPanel
