// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import styles from './Checkbox.scss'

export default class Checkbox extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      checked: props.checked
    }
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { checked } = nextProps
    if (checked == null ||
        checked === this.props.checked ||
        checked === this.state.checked) {
      return
    }
    this.setState({
      checked
    })
  }

  onChange (event) {
    const { checked } = event.target
    if (checked !== this.state.checked) {
      this.setState({
        checked
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.props.name, this.state.checked)
        }
      })
    }
  }

  render () {
    return (
      <div
        className={classNames([
          styles.element,
          this.props.className, {
            [styles.element__fullWidth]: this.props.fullWidth
          }
        ])}
      >
        <label
          className={classNames([
            styles.label, {
              [styles.label__fullWidth]: this.props.fullWidth,
              [styles.label__disabled]: this.props.disabled
            }
          ])}
        >
          <input
            className={styles.input}
            type='checkbox'
            name={this.props.name}
            checked={this.state.checked}
            disabled={this.props.disabled}
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
  checked: PropTypes.bool,
  title: PropTypes.node,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
}

Checkbox.defaultProps = {
  name: null,
  checked: false,
  title: null,
  fullWidth: false,
  disabled: false,
  className: null,
  onChange: null
}
