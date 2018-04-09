// Takram Confidential
// Copyright (C) 2018-Present Takram

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import styles from '../../css/component/label.styl'

export default function Label(props) {
  return (
    <div
      className={classNames([
        styles.element,
        props.className, {
          [styles.element__fullWidth]: props.fullWidth,
        },
      ])}
    >
      {props.title}
    </div>
  )
}

Label.propTypes = {
  title: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
}

Label.defaultProps = {
  title: null,
  fullWidth: false,
  className: null,
}
