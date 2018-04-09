// Takram Confidential
// Copyright (C) 2018-Present Takram

import PropTypes from 'prop-types'
import React from 'react'

import styles from '../../css/component/grid.styl'

export default function Grid(props) {
  return (
    <div
      className={styles.element}
      style={{
        gridTemplateColumns: Array(props.columns).fill('1fr').join(' '),
      }}
    >
      {props.children}
    </div>
  )
}

Grid.propTypes = {
  columns: PropTypes.number.isRequired,
  children: PropTypes.node,
}

Grid.defaultProps = {
  children: null,
}
