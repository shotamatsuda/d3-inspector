// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import childrenOf from '../validator/childrenOf'

import styles from './Inspector.scss'

export function InspectorItem (props) {
  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>
        {props.title}
      </div>
      <div className={styles.itemContent}>
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            fullWidth: true,
            onChange: props.onChange
          })
        })}
      </div>
    </div>
  )
}

InspectorItem.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  onChange: PropTypes.func
}

InspectorItem.defaultProps = {
  title: null,
  children: null,
  onChange: null
}

export function InspectorGroup (props) {
  return (
    <div className={styles.group}>
      {props.title ? (
        <div className={styles.groupTitle}>
          {props.title}
        </div>
      ) : null}
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          onChange: props.onChange
        })
      })}
    </div>
  )
}

InspectorGroup.propTypes = {
  title: PropTypes.node,
  children: childrenOf(InspectorItem),
  onChange: PropTypes.func
}

InspectorGroup.defaultProps = {
  title: '',
  children: null,
  onChange: null
}

export default function Inspector (props) {
  return (
    <div
      className={classNames([
        styles.element,
        styles[`element__${props.position}`],
        props.className, {
          [styles.element__floating]: props.floating
        }
      ])}
    >
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          onChange: props.onChange
        })
      })}
    </div>
  )
}

Inspector.propTypes = {
  floating: PropTypes.bool,
  position: PropTypes.oneOf([
    'topLeft',
    'topRight',
    'bottomRight',
    'bottomLeft'
  ]),
  className: PropTypes.string,
  children: childrenOf(InspectorItem, InspectorGroup),
  onChange: PropTypes.func
}

Inspector.defaultProps = {
  floating: false,
  position: 'topLeft',
  className: null,
  children: null,
  onChange: null
}
