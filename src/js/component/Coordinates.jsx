// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import shallowEqual from 'shallowequal'

import styles from '../../css/component/coordinates.styl'

export default class Coordinates extends PureComponent {
  constructor(props) {
    super(props)
    const {
      x,
      y,
      z,
      w,
    } = props.value || {}
    const value = {
      x: +x || 0,
      y: +y || 0,
    }
    if (props.dimensions > 2) {
      value.z = +z || 0
    }
    if (props.dimensions > 3) {
      value.w = +w || 0
    }
    this.state = {
      value,
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
    if (value !== this.state.value[name]) {
      this.setState({
        value: {
          ...this.state.value,
          [name]: value,
        },
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
      >
        <label className={styles.label}>
          <input
            className={styles.input}
            type="number"
            name="x"
            value={this.state.value.x}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            disabled={this.props.disabled}
            onChange={this.onChange}
          />
          <span className={styles.name}>X</span>
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            type="number"
            name="y"
            value={this.state.value.y}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            disabled={this.props.disabled}
            onChange={this.onChange}
          />
          <span className={styles.name}>Y</span>
        </label>
        {this.props.dimensions > 2 ? (
          <label className={styles.label}>
            <input
              className={styles.input}
              type="number"
              name="z"
              value={this.state.value.z}
              min={this.props.min}
              max={this.props.max}
              step={this.props.step}
              disabled={this.props.disabled}
              onChange={this.onChange}
            />
            <span className={styles.name}>Z</span>
          </label>
        ) : null}
        {this.props.dimensions > 3 ? (
          <label className={styles.label}>
            <input
              className={styles.input}
              type="number"
              name="w"
              value={this.state.value.w}
              min={this.props.min}
              max={this.props.max}
              step={this.props.step}
              disabled={this.props.disabled}
              onChange={this.onChange}
            />
            <span className={styles.name}>W</span>
          </label>
        ) : null}
      </div>
    )
  }
}

Coordinates.propTypes = {
  name: PropTypes.string,
  value: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    w: PropTypes.number,
  }),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  dimensions: PropTypes.number,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Coordinates.defaultProps = {
  name: null,
  value: null,
  min: null,
  max: null,
  step: null,
  dimensions: 2,
  fullWidth: false,
  disabled: false,
  className: null,
  onChange: null,
}
