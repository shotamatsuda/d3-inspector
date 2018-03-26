// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import NumberField from './NumberField'

import styles from '../../css/component/coordinates.styl'

export default class Coordinates extends PureComponent {
  constructor(props) {
    super(props)
    const { x, y, z, w } = props.value || {}
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
          this.props.className,
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
  value: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  dimensions: PropTypes.number,
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
  className: null,
  onChange: null,
}
