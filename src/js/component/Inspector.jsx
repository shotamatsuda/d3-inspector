// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import childrenOf from '../validator/childrenOf'

import styles from '../../css/component/inspector.styl'

export function InspectorItem(props) {
  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>
        {props.title}
      </div>
      <div className={styles.itemContent}>
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            onChange: props.onChange,
          })
        })}
      </div>
    </div>
  )
}

InspectorItem.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
}

InspectorItem.defaultProps = {
  title: null,
  children: null,
}

export default function Inspector(props) {
  return (
    <div
      className={classNames([
        styles.element,
        props.className,
      ])}
    >
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          onChange: props.onChange,
        })
      })}
    </div>
  )
}

Inspector.propTypes = {
  className: PropTypes.string,
  children: childrenOf(InspectorItem),
}

Inspector.defaultProps = {
  className: null,
  children: null,
}
