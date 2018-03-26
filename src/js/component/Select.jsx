// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import childrenOf from '../validator/childrenOf'

import styles from '../../css/component/select.styl'

export function SelectItem(props) {
  return (
    <option
      value={props.value}
      disabled={props.disabled}
    >
      {props.title || props.children}
    </option>
  )
}

SelectItem.propTypes = {
  title: PropTypes.node,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
}

SelectItem.defaultProps = {
  title: null,
  value: '',
  disabled: false,
  children: null,
}

export function SelectGroup(props) {
  return (
    <optgroup
      label={props.label}
      disabled={props.disabled}
    >
      {props.children}
    </optgroup>
  )
}

SelectGroup.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  children: childrenOf(SelectItem),
}

SelectGroup.defaultProps = {
  label: '',
  disabled: false,
  children: null,
}

export default class Select extends PureComponent {
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
        <select
          className={styles.input}
          name={this.props.name}
          value={this.state.value}
          onChange={this.onChange}
        >
          {this.props.children}
        </select>
      </div>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  children: childrenOf(SelectItem, SelectGroup),
  onChange: PropTypes.func,
}

Select.defaultProps = {
  name: null,
  value: '',
  className: null,
  children: null,
  onChange: null,
}
