// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

/* eslint-disable indent */

import * as d3 from 'd3'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import NumberField from './NumberField'

import styles from '../../css/component/scatter-plot.styl'

export default class ScatterPlot extends Component {
  constructor(props) {
    super(props)
    this.x = props.x
    this.y = props.y
    this.items = null
    this.clusters = null
    this.selectedCluster = null
    this.resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries
      const {
        width,
        height,
      } = entry.contentRect
      this.width = width
      this.height = height
      this.update()
    })
  }

  async componentDidMount() {
    this.resizeObserver.observe(this.element)
    this.init()
  }

  componentWillReceiveProps(nextProps) {
    let needsUpdate = false
    if (nextProps.items !== this.props.items) {
      this.items = nextProps.items
      needsUpdate = true
    }
    if (nextProps.clusters !== this.props.clusters) {
      this.clusters = nextProps.clusters
      needsUpdate = true
    }
    if (needsUpdate) {
      this.update()
    }
  }

  shouldComponentUpdate() {
    return false // We're managing DOM by d3
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  init() {
    this.xScale = d3.scaleLinear()
    this.yScale = d3.scaleLinear()
    this.colorScale = d3.scaleOrdinal(d3ScaleChromatic.schemeCategory10)
    this.xAxis = d3.axisTop().ticks(5)
    this.yAxis = d3.axisLeft().ticks(5)
    this.xAxisGroup = this.svg.append('g')
      .classed(styles.xAxis, true)
    this.yAxisGroup = this.svg.append('g')
      .classed(styles.yAxis, true)
  }

  update() {
    if (!this.items || !this.clusters) {
      return
    }
    this.xScale
      .range([
        this.props.padding,
        this.width - this.props.padding * 2,
      ])
      .domain([
        d3.min(this.items, d => d.vector[this.x]),
        d3.max(this.items, d => d.vector[this.x]),
      ])
    this.yScale
      .range([
        this.props.padding,
        this.height - this.props.padding * 2,
      ])
      .domain([
        d3.min(this.items, d => d.vector[this.y]),
        d3.max(this.items, d => d.vector[this.y]),
      ])

    this.xAxis
      .scale(this.xScale)
    this.yAxis
      .scale(this.yScale)

    this.xAxisGroup
      .attr('transform', `translate(0, ${this.yScale(0)})`)
      .call(this.xAxis)
    this.yAxisGroup
        .attr('transform', `translate(${this.xScale(0)}, 0)`)
      .call(this.yAxis)

    const items = this.svg
      .selectAll(`.${styles.item}`)
      .data(this.items)

    items.enter()
      .append('circle')
        .classed(styles.item, true)
        .style('mix-blend-mode', 'multiply')
      .merge(items)
        .attr('r', d => (d.cluster === this.selectedCluster ? 3 : 1))
        .attr('cx', d => this.xScale(d.vector[this.x]))
        .attr('cy', d => this.yScale(d.vector[this.y]))
        .style('fill', d => this.colorScale(d.cluster))

    items.exit().remove()

    const clusters = this.svg
      .selectAll(`.${styles.cluster}`)
      .data(this.clusters)

    clusters.enter()
      .append('circle')
        .classed(styles.cluster, true)
        .attr('r', 10)
        .style('stroke-opacity', 0.5)
        .on('mouseover', d => {
          this.selectedCluster = d.id
          this.update()
        })
        .on('mouseout', d => {
          this.selectedCluster = null
          this.update()
        })
      .merge(clusters)
        .attr('cx', d => this.xScale(d.vector[this.x]))
        .attr('cy', d => this.yScale(d.vector[this.y]))
        .style('fill', d => this.colorScale(d.id))
        .style('fill-opacity', d => (d.id === this.selectedCluster ? 0.5 : 0))
        .style('stroke', d => this.colorScale(d.id))

    clusters.exit().remove()
  }

  render() {
    return (
      <div
        className={styles.element}
        ref={element => { this.element = element }}
      >
        <svg
          className={styles.svg}
          ref={element => { this.svg = d3.select(element) }}
        />
        <div className={styles.legend}>
          x:
          <NumberField
            value={this.x}
            min={0}
            max={15}
            onChange={(name, value) => {
              this.x = value
              this.update()
            }}
          />
          y:
          <NumberField
            value={this.y}
            min={0}
            max={15}
            onChange={(name, value) => {
              this.y = value
              this.update()
            }}
          />
        </div>
      </div>
    )
  }
}

ScatterPlot.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    cluster: PropTypes.number.isRequired,
    vector: PropTypes.arrayOf(PropTypes.number).isRequired,
  })),
  clusters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    vector: PropTypes.arrayOf(PropTypes.number).isRequired,
  })),
  padding: PropTypes.number,
}

ScatterPlot.defaultProps = {
  items: null,
  clusters: null,
  padding: 20,
}
