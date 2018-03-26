// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import { connect } from 'react-redux'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'

import Checkbox from '../component/Checkbox'
import Coordinates from '../component/Coordinates'
import Inspector, { InspectorItem, InspectorGroup } from '../component/Inspector'
import NumberField from '../component/NumberField'
import Radio, { RadioGroup } from '../component/Radio'
import Range from '../component/Range'
import Select, { SelectItem } from '../component/Select'
import TextField from '../component/TextField'
import ScatterPlot from '../component/ScatterPlot'
import Grid from '../component/Grid'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: null,
      clusters: null,
    }
  }

  componentDidMount() {
    this.loadData('highschool')
  }

  async loadData(value) {
    const items = await fetch(`/data/list/list_for_${value}.tsv`)
      .then(response => {
        return response.text()
      }).then(response => {
        return d3.tsvParse(response)
      }).then(items => {
        return items.map(item => {
          return {
            cluster: +item.cluster_id,
            vector: item.vector.split('|').map(value => +value),
          }
        })
      })

    const clusters = await fetch(`/data/cluster/cluster_for_${value}.tsv`)
      .then(response => {
        return response.text()
      }).then(response => {
        return d3.tsvParse(response)
      }).then(clusters => {
        return clusters.map(item => {
          return {
            id: +item.center_id,
            vector: item.center_vectors.split('|').map(value => +value),
          }
        })
      })

    this.setState({
      items,
      clusters,
    })
  }

  render() {
    return (
      <Fragment>
        <div
          style={{
            position: 'absolute',
            padding: '0.5rem 1rem',
          }}
        >
          Data Source:
          <Select
            onChange={(name, value) => {
              this.loadData(value)
            }}
          >
            <SelectItem value="highschool" title="Highschool" />
            <SelectItem value="univ" title="University" />
            <SelectItem value="parttimeworker" title="Parttime Worker" />
            <SelectItem value="homemaker" title="Homemaker" />
            <SelectItem value="elder" title="Elder" />
          </Select>
        </div>
        <Grid columns={4}>
          <ScatterPlot
            x={0}
            y={1}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={2}
            y={3}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={4}
            y={5}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={6}
            y={7}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={8}
            y={9}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={10}
            y={11}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={12}
            y={13}
            items={this.state.items}
            clusters={this.state.clusters}
          />
          <ScatterPlot
            x={14}
            y={15}
            items={this.state.items}
            clusters={this.state.clusters}
          />
        </Grid>
      </Fragment>
    )
  }
}
// <Inspector
//   onChange={(name, value) => {
//     this.loadData(value)
//   }}
// >
//   <InspectorItem title="Data Source">
//     <Select>
//       <SelectItem value="highschool" title="Highschool" />
//       <SelectItem value="univ" title="University" />
//       <SelectItem value="parttimeworker" title="Parttime Worker" />
//       <SelectItem value="homemaker" title="Homemaker" />
//       <SelectItem value="elder" title="Elder" />
//     </Select>
//   </InspectorItem>
// </Inspector>

App.propTypes = {}

App.defaultProps = {}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
