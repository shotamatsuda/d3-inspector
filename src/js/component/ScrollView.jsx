// Takram Confidential
// Copyright (C) 2018-Present Takram

import React from 'react'

import styles from '../../css/component/scroll-view.styl'

export default function ScrollView(props) {
  return (
    <div className={styles.element}>
      {props.children}
    </div>
  )
}
