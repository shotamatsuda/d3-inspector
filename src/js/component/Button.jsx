// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from '../../css/component/button.styl'

export default function Button(props) {
  return (
    <div
      className={classNames([
        styles.element,
        props.className, {
          [styles.element__fullWidth]: props.fullWidth,
        },
      ])}
    >
      <button
        className={classNames([
          styles.input, {
            [styles.input__fullWidth]: props.fullWidth,
          },
        ])}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.node,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  title: null,
  fullWidth: false,
  disabled: false,
  className: null,
  onClick: null,
}
