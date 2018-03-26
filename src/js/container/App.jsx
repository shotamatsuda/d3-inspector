// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import Checkbox from '../component/Checkbox'
import Coordinates from '../component/Coordinates'
import Inspector, { InspectorItem } from '../component/Inspector'
import NumberField from '../component/NumberField'
import Range from '../component/Range'
import Select, { SelectItem, SelectGroup } from '../component/Select'
import TextField from '../component/TextField'

function App(props) {
  return (
    <div>
      <Inspector>
        <InspectorItem title="Text">
          <TextField />
        </InspectorItem>
        <InspectorItem title="Number">
          <NumberField />
        </InspectorItem>
        <InspectorItem title="Select">
          <Select>
            <SelectItem value="0" title="Item 1" />
            <SelectItem value="1" title="Item 2" />
            <SelectItem value="2" title="Item 3" />
          </Select>
        </InspectorItem>
        <InspectorItem title="Checkbox">
          <Checkbox title="Item 1" onChange={event => console.log(event)} />
          <Checkbox title="Item 2" />
          <Checkbox title="Item 3" />
        </InspectorItem>
        <InspectorItem title="Range">
          <Range />
        </InspectorItem>
        <InspectorItem title="Coordinates">
          <Coordinates />
        </InspectorItem>
        <InspectorItem title="Coordinates">
          <Coordinates dimensions={3} />
        </InspectorItem>
        <InspectorItem title="Coordinates">
          <Coordinates dimensions={4} />
        </InspectorItem>
      </Inspector>
    </div>
  )
}

App.propTypes = {
  message: PropTypes.string,
}

App.defaultProps = {
  message: 'Hello World',
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
