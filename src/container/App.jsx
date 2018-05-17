// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'

import * as actions from '../actions'
import Button from '../component/Button'
import Checkbox from '../component/Checkbox'
import Coordinates from '../component/Coordinates'
import Grid from '../component/Grid'
import Inspector, { InspectorItem, InspectorGroup } from '../component/Inspector'
import Label from '../component/Label'
import Matrix from '../component/Matrix'
import NumberField from '../component/NumberField'
import Radio, { RadioGroup } from '../component/Radio'
import Range from '../component/Range'
import Select, { SelectItem } from '../component/Select'
import TextField from '../component/TextField'

class App extends PureComponent {
  constructor (props) {
    super(props)
  }

  renderInspector (props = {}) {
    return (
      <Inspector
        floating
        onChange={(name, value) => {
          this.props.setData({
            [name]: value
          })
        }}
        {...props}
      >
        <InspectorGroup title='Inspector Group'>
          <InspectorItem title='Label'>
            <Label
              title='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='Text'>
            <TextField
              name='text'
              value={this.props.data.text}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='Number'>
            <NumberField
              name='number'
              value={this.props.data.number}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='Select'>
            <Select
              name='select'
              value={this.props.data.select}
              {...props}
            >
              <SelectItem value='0' title='Item 1' />
              <SelectItem value='1' title='Item 2' />
              <SelectItem value='2' title='Item 3' />
            </Select>
          </InspectorItem>
          <InspectorItem title='Checkbox'>
            <Checkbox
              title='Item 1'
              name='checkbox1'
              checked={this.props.data.checkbox1}
              {...props}
            />
            <Checkbox
              title='Item 2'
              name='checkbox2'
              checked={this.props.data.checkbox2}
              {...props}
            />
            <Checkbox
              title='Item 3'
              name='checkbox3'
              checked={this.props.data.checkbox3}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='Radio'>
            <RadioGroup
              name='radio'
              value={this.props.data.radio}
              {...props}
            >
              <Radio value='0' title='Item 1' />
              <Radio value='1' title='Item 2' />
              <Radio value='2' title='Item 3' />
            </RadioGroup>
          </InspectorItem>
          <InspectorItem title='Range'>
            <Range
              name='range'
              value={this.props.data.range}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='2 Coordinates'>
            <Coordinates
              name='coordinates2'
              value={this.props.data.coordinates2}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='3 Coordinates'>
            <Coordinates
              dimensions={3}
              name='coordinates3'
              value={this.props.data.coordinates3}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='4 Coordinates'>
            <Coordinates
              dimensions={4}
              name='coordinates4'
              value={this.props.data.coordinates4}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='Matrix'>
            <Matrix
              cols={3}
              rows={3}
              name='matrix'
              value={this.props.data.matrix}
              {...props}
            />
          </InspectorItem>
          <InspectorItem title='Button'>
            <Button
              title='Button'
              {...props}
            />
            <Button
              title='Button'
              {...props}
            />
          </InspectorItem>
        </InspectorGroup>
      </Inspector>
    )
  }

  renderInline (props = {}) {
    return (
      <div>
        <Label
          title='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
        <TextField
          name='text'
          value={this.props.data.text}
          {...props}
        />
        <NumberField
          name='number'
          value={this.props.data.number}
          {...props}
        />
        <Select
          name='select'
          value={this.props.data.select}
          {...props}
        >
          <SelectItem value='0' title='Item 1' />
          <SelectItem value='1' title='Item 2' />
          <SelectItem value='2' title='Item 3' />
        </Select>
        <Checkbox
          title='Item 1'
          name='checkbox1'
          checked={this.props.data.checkbox1}
          {...props}
        />
        <Checkbox
          title='Item 2'
          name='checkbox2'
          checked={this.props.data.checkbox2}
          {...props}
        />
        <Checkbox
          title='Item 3'
          name='checkbox3'
          checked={this.props.data.checkbox3}
          {...props}
        />
        <RadioGroup
          name='radio'
          value={this.props.data.radio}
          {...props}
        >
          <Radio value='0' title='Item 1' />
          <Radio value='1' title='Item 2' />
          <Radio value='2' title='Item 3' />
        </RadioGroup>
        <Range
          name='range'
          value={this.props.data.range}
          {...props}
        />
        <Coordinates
          name='coordinates2'
          value={this.props.data.coordinates2}
          {...props}
        />
        <Coordinates
          dimensions={3}
          name='coordinates3'
          value={this.props.data.coordinates3}
          {...props}
        />
        <Coordinates
          dimensions={4}
          name='coordinates4'
          value={this.props.data.coordinates4}
          {...props}
        />
        <Matrix
          cols={3}
          rows={3}
          name='matrix'
          value={this.props.data.matrix}
          {...props}
        />
        <Button
          title='Button'
          {...props}
        />
        <Button
          title='Button'
          {...props}
        />
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        {this.renderInspector({ color: 'black' })}
        {this.renderInspector({ color: 'black', position: 'topRight', disabled: true })}
      </Fragment>
    )
  }
}

App.propTypes = {}

App.defaultProps = {}

function mapStateToProps (state) {
  return {
    data: state.get('data').toJS()
  }
}

export default connect(mapStateToProps, actions)(App)
