// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import styles from '../../css/component/text-field.styl'

export default class TextField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { value } = event.target
    if (value !== this.state.value) {
      this.setState({
        value,
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.props.name, this.state.value)
        }
      })
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
        <input
          className={styles.input}
          type="text"
          name={this.props.name}
          value={this.state.value}
          autoComplete="off"
          spellCheck={false}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

TextField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

TextField.defaultProps = {
  name: null,
  value: '',
  className: null,
  onChange: null,
}
