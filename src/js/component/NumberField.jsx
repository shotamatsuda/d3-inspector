// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import styles from '../../css/component/number-field.styl'

export default class NumberField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const value = +event.target.value
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
        <input
          className={styles.input}
          type="number"
          name={this.props.name}
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

NumberField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

NumberField.defaultProps = {
  name: null,
  value: 0,
  min: null,
  max: null,
  step: null,
  className: null,
  onChange: null,
}
