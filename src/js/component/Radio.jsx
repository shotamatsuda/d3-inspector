// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'

import childrenOf from '../validator/childrenOf'

import styles from '../../css/component/radio.styl'

export default function Radio(props) {
  return (
    <div
      className={classNames([
        styles.element,
        props.className, {
          [styles.element__fullWidth]: props.fullWidth,
        },
      ])}
    >
      <label
        className={classNames([
          styles.label, {
            [styles.label__fullWidth]: props.fullWidth,
            [styles.label__disabled]: props.disabled,
          },
        ])}
      >
        <input
          className={styles.input}
          type="radio"
          value={props.value}
          checked={props.checked}
          disabled={props.disabled}
          onChange={props.onChange}
        />
        {props.title}
      </label>
    </div>
  )
}

Radio.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.node,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Radio.defaultProps = {
  value: null,
  checked: false,
  title: null,
  fullWidth: false,
  disabled: false,
  className: null,
  onChange: null,
}

export class RadioGroup extends PureComponent {
  constructor(props) {
    super(props)
    if (props.value != null) {
      this.state = {
        value: props.value,
      }
    } else {
      const children = React.Children.toArray(props.children)
      const checked = children.find(child => child.props.checked)
      if (checked) {
        this.state = {
          value: checked.props.value || null,
        }
      } else {
        const [child] = React.Children.toArray(props.children)
        this.state = {
          value: (child && child.props.value) || null,
        }
      }
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
      <Fragment>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            checked: child.props.value === this.state.value,
            fullWidth: child.props.fullWidth || this.props.fullWidth,
            disabled: child.props.disabled || this.props.disabled,
            onChange: this.onChange,
          })
        })}
      </Fragment>
    )
  }
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  children: childrenOf(Radio),
  onChange: PropTypes.func,
}

RadioGroup.defaultProps = {
  name: null,
  value: null,
  fullWidth: false,
  disabled: false,
  children: null,
  onChange: null,
}
