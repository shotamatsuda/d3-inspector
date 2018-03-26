// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import Checkbox from '../component/Checkbox'
import Coordinates from '../component/Coordinates'
import Inspector, { InspectorItem, InspectorGroup } from '../component/Inspector'
import NumberField from '../component/NumberField'
import Range from '../component/Range'
import Select, { SelectItem, SelectGroup } from '../component/Select'
import TextField from '../component/TextField'

function App(props) {
  return (
    <div>
      <Inspector>
        <InspectorGroup title="Inspector Group">
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
            <Checkbox title="Item 1" />
            <Checkbox title="Item 2" />
            <Checkbox title="Item 3" />
          </InspectorItem>
          <InspectorItem title="Range">
            <Range />
          </InspectorItem>
          <InspectorItem title="2 Coordinates">
            <Coordinates />
          </InspectorItem>
          <InspectorItem title="3 Coordinates">
            <Coordinates dimensions={3} />
          </InspectorItem>
          <InspectorItem title="4 Coordinates">
            <Coordinates dimensions={4} />
          </InspectorItem>
        </InspectorGroup>
        <InspectorGroup title="Inspector Group">
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
            <Checkbox title="Item 1" />
            <Checkbox title="Item 2" />
            <Checkbox title="Item 3" />
          </InspectorItem>
          <InspectorItem title="Range">
            <Range />
          </InspectorItem>
          <InspectorItem title="2 Coordinates">
            <Coordinates />
          </InspectorItem>
          <InspectorItem title="3 Coordinates">
            <Coordinates dimensions={3} />
          </InspectorItem>
          <InspectorItem title="4 Coordinates">
            <Coordinates dimensions={4} />
          </InspectorItem>
        </InspectorGroup>
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
