// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

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
        props.className,
      ])}
    >
      <label className={styles.label}>
        <input
          className={styles.input}
          type="radio"
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={props.onChange}
        />
        {props.title}
      </label>
    </div>
  )
}

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

Radio.defaultProps = {
  name: null,
  value: null,
  checked: false,
  title: null,
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
            name: this.props.name,
            checked: child.props.value === this.state.value,
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
  children: childrenOf(Radio),
  onChange: PropTypes.func,
}

RadioGroup.defaultProps = {
  name: null,
  value: null,
  children: null,
  onChange: null,
}
