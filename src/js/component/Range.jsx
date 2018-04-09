// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import styles from '../../css/component/range.styl'

export default class Range extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value == null ||
        value === this.props.value ||
        value === this.state.value) {
      return
    }
    this.setState({
      value,
    })
  }

  onChange(event) {
    const value = +event.target.value
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
          this.props.className, {
            [styles.element__fullWidth]: this.props.fullWidth,
          },
        ])}
      >
        <input
          className={styles.range}
          type="range"
          name={this.props.name}
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          disabled={this.props.disabled}
          onChange={this.onChange}
        />
        <input
          className={styles.number}
          type="number"
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          disabled={this.props.disabled}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

Range.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Range.defaultProps = {
  name: null,
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  fullWidth: false,
  disabled: false,
  className: null,
  onChange: null,
}
