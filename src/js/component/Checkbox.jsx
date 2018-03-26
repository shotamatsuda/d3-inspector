// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import styles from '../../css/component/checkbox.styl'

export default class Checkbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const value = event.target.checked
    if (value !== this.state.value) {
      this.setState({
        value,
      })
      if (this.props.onChange) {
        this.props.onChange(this.props.name, value)
      }
    }
  }

  render() {
    return (
      <div
        className={classNames([
          styles.element,
          this.props.className,
        ])}
      >
        <label className={styles.label}>
          <input
            className={styles.input}
            type="checkbox"
            name={this.props.name}
            checked={this.state.value}
            onChange={this.onChange}
          />
          {this.props.title}
        </label>
      </div>
    )
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  title: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  name: null,
  value: false,
  title: null,
  className: null,
  onChange: null,
}
