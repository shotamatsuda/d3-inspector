// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import React, { Component } from 'react'
import shallowEqual from 'shallowequal'

export default class InputComponent extends Component {
  componentWillReceiveProps (nextProps) {
    const { value } = nextProps
    if (value === null || shallowEqual(value, this.props.value)) {
      return
    }
    if (shallowEqual(value, this.state.value)) {
      return
    }
    this.setState({
      value: nextProps.value
    })
  }
}
