// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shallowEqual from 'shallowequal'

import styles from '../../css/component/matrix.styl'

export default class Matrix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: Array(props.cols * props.rows).fill(0),
    }
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value == null ||
        shallowEqual(value, this.props.value) ||
        shallowEqual(value, this.state.value)) {
      return
    }
    this.setState({
      value,
    })
  }

  onChange(event) {
    const { name } = event.target
    const value = +event.target.value
    if (value !== this.state.value[+name]) {
      const array = [...this.state.value]
      array[+name] = value
      this.setState({
        value: array,
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
          this.props.className, {
            [styles.element__fullWidth]: this.props.fullWidth,
          },
        ])}
        style={{
          gridTemplateColumns: Array(this.props.cols).fill('1fr').join(' '),
        }}
      >
        {this.state.value.map((element, index) => (
          <label key={index} className={styles.label}>
            <input
              className={styles.input}
              type="number"
              name={`${index}`}
              value={this.state.value[index]}
              min={this.props.min}
              max={this.props.max}
              step={this.props.step}
              disabled={this.props.disabled}
              onChange={this.onChange}
            />
            <span className={styles.name}>
              {Math.floor(index / this.props.cols) + 1},
              {index % this.props.cols + 1}
            </span>
          </label>
        ))}
      </div>
    )
  }
}

Matrix.propTypes = {
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  cols: PropTypes.number,
  rows: PropTypes.number,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Matrix.defaultProps = {
  name: null,
  value: null,
  min: null,
  max: null,
  step: null,
  cols: 3,
  rows: 3,
  fullWidth: false,
  disabled: false,
  className: null,
  onChange: null,
}
