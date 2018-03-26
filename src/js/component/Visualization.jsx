// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import styles from '../../css/component/visualization.styl'

export default class Visualization extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className={styles.element}
        ref={element => this.element = element }
      >
        <svg
          className={styles.svg}
          ref={element => { this.svg = d3.select(element) }}
        />
      </div>
    )
  }
}

Visualization.propTypes = {
}

Visualization.defaultProps = {
}
