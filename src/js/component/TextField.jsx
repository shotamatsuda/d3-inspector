// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import styles from '../../css/component/text-field.styl'

export default class TextField extends PureComponent {
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
          this.props.className, {
            [styles.element__fullWidth]: this.props.fullWidth,
          },
        ])}
      >
        <input
          className={classNames([
            styles.input, {
              [styles.input__fullWidth]: this.props.fullWidth,
            },
          ])}
          type="text"
          name={this.props.name}
          value={this.state.value}
          disabled={this.props.disabled}
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
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

TextField.defaultProps = {
  name: null,
  value: '',
  fullWidth: false,
  disabled: false,
  className: null,
  onChange: null,
}
