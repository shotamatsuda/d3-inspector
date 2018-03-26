// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

import * as d3 from 'd3'
import * as d3ScaleChromatic from 'd3-scale-chromatic'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import styles from '../../css/component/visualization.styl'

export default class Visualization extends Component {
  constructor(props) {
    super(props)
    this.resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries
      const {
        width,
        height,
      } = entry.contentRect
      this.width = width
      this.height = height
      this.onResize()
    })
    this.onZoom = this.onZoom.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  async componentDidMount() {
    this.init()
    this.resizeObserver.observe(this.element)
    this.listData = (await fetch('/data/list/list_for_homemaker.tsv')
      .then(response => {
        return response.text()
      }).then(response => {
        return d3.tsvParse(response)
      })).map(data => {
        return {
          cluster: +data.cluster_id,
          vector: data.vector.split('|').map(value => +value),
        }
      })
    this.onZoom()
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  onZoom() {
    // this.transform = d3.event.transform
    // this.xGrid.call(
    //   this.xGridAxis.scale(
    //     d3.event.transform.rescaleX(this.xGridScale),
    //   ),
    // )
    // this.yGrid.call(
    //   this.yGridAxis.scale(
    //     d3.event.transform.rescaleY(this.yGridScale),
    //   ),
    // )
    // this.content.attr('transform', d3.event.transform)

    const color = d3.scaleOrdinal(d3ScaleChromatic.schemeCategory10)
    const dots = this.content.selectAll('.dot')
      .data(this.listData)

    dots.enter()
      .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => this.xGridScale(d.vector[2] * 100))
        .attr('cy', d => this.yGridScale(d.vector[3] * 100))
        .style('fill', d => color(d.cluster))
        .style('mix-blend-mode', 'multiply')
      .merge(dots)
        .attr('r', 1.5 / this.transform.k)
  }

  onResize() {
    this.xGridScale
      .range([0, this.width])
      .domain([-this.width / 2, this.width / 2])
    this.yGridScale
      .range([0, this.height])
      .domain([-this.height / 2, this.height / 2])

    this.xGridAxis
      .ticks(this.width / 100)
      .tickSize(-this.height)
    this.yGridAxis
      .ticks(this.height / 100)
      .tickSize(-this.width)

    this.xGrid.call(
      this.xGridAxis.scale(
        this.transform.rescaleX(this.xGridScale),
      ),
    )
    this.yGrid.call(
      this.yGridAxis.scale(
        this.transform.rescaleY(this.yGridScale),
      ),
    )
  }

  init() {
    this.transform = d3.zoomIdentity

    this.zoom = d3.zoom()
      .scaleExtent([
        this.props.minScale,
        this.props.maxScale,
      ])
      .on('zoom', this.onZoom)

    this.svg.call(this.zoom)

    this.xGridScale = d3.scaleLinear()
    this.yGridScale = d3.scaleLinear()

    this.xGridAxis = d3.axisTop()
      .tickPadding(-5)
      .tickFormat(d3.format('d'))
    this.yGridAxis = d3.axisLeft()
      .tickPadding(-5)
      .tickFormat(d3.format('d'))

    this.xGrid = this.svg.append('g').classed(styles.xGrid, true)
    this.yGrid = this.svg.append('g').classed(styles.yGrid, true)

    this.content = this.svg.append('g')
  }

  update() {
  }

  transform(transform) {
    this.zoom.transform(this.svg, transform)
  }

  translateBy(x, y) {
    const { k } = this.transform
    this.zoom.translateBy(this.svg, x / k, y / k)
  }

  translateTo(x, y) {
    const { k } = this.transform
    this.zoom.translateTo(this.svg, x / k, y / k)
  }

  scaleBy(value) {
    this.zoom.scaleBy(this.svg, value)
  }

  scaleTo(value) {
    this.zoom.scaleTo(this.svg, value)
  }

  zoomToFit() {
    this.scaleTo(1)
  }

  zoomIn() {
    let { k } = this.transform
    let proposed = this.props.minScale
    for (let i = 0; ; ++i) {
      if (proposed >= 1) {
        proposed /= (i % 2 !== 0) ? 3 / 4 : 2 / 3
      } else {
        proposed /= (i % 2 !== 0) ? 2 / 3 : 3 / 4
      }
      if (this.transform.k < proposed) {
        if (k <= this.transform.k && this.transform.k < proposed) {
          k = proposed
          break
        }
        k = proposed
      }
    }
    this.scaleTo(k)
  }

  zoomOut() {
    let { k } = this.transform
    let proposed = this.props.maxScale
    for (let i = 0; ; ++i) {
      if (proposed <= 1) {
        proposed *= (i % 2 !== 0) ? 3 / 4 : 2 / 3
      } else {
        proposed *= (i % 2 !== 0) ? 2 / 3 : 3 / 4
      }
      if (this.transform.k > proposed) {
        if (k >= this.transform.k && this.transform.k > proposed) {
          k = proposed
          break
        }
        k = proposed
      }
    }
    this.scaleTo(k)
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
      </div>
    )
  }
}

Visualization.propTypes = {
  alignment: PropTypes.arrayOf(PropTypes.number),
  minScale: PropTypes.number,
  maxScale: PropTypes.number,
}

Visualization.defaultProps = {
  alignment: [0.5, 0.5],
  minScale: 0.03125,
  maxScale: 64,
}
