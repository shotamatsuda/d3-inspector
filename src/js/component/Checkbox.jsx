// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import styles from '../../css/component/checkbox.styl'

export default class Checkbox extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { checked } = event.target
    if (checked !== this.state.checked) {
      this.setState({
        checked,
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(this.props.name, this.state.checked)
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
            type="checkbox"
            name={this.props.name}
            checked={this.state.checked}
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
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Checkbox.defaultProps = {
  name: null,
  checked: false,
  title: null,
  className: null,
  onChange: null,
}
