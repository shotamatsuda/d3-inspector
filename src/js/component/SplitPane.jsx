// Takram Confidential
// Copyright (C) 2018-Present Takram

import ReactSplitPane from 'react-split-pane'
import PropTypes from 'prop-types'
import React from 'react'

import styles from '../../css/component/split-pane.styl'

export default function SplitPane(props) {
  return (
    <ReactSplitPane
      {...props}
      className={styles.element}
      paneClassName={styles.pane}
      pane1ClassName={styles.pane1}
      pane2ClassName={styles.pane2}
      resizerClassName={styles.resizer}
    >
      {props.children}
    </ReactSplitPane>
  )
}

SplitPane.propTypes = {
}

SplitPane.defaultProps = {
}
