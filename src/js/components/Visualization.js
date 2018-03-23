export default class Visualization {
  constructor(parent, config) {
    this.config = config
    this.svg = d3.select(parent).append('svg')
    this.scale = 1

    this.axisGroupX = this.svg.append('g')
      .classed('axis ruler x', true)
      .style('pointer-events', 'none')
      .call(this.axisX)
    this.axisGroupY = this.svg.append('g')
      .classed('axis ruler y', true)
      .style('pointer-events', 'none')
      .call(this.axisY)

    this.zoom = d3.zoom()
      .scaleExtent([
        config.zoom && config.zoom[0] || 1/2,
        config.zoom && config.zoom[1] || 10
      ])
      .on('zoom', this.zoomed.bind(this))

    this.zoomRect = this.svg.append('rect')
      .classed('zoom', true)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('width', this.width)
      .attr('height', this.height)
      .call(this.zoom)

    this.background = this.svg.append('g')
      .classed('background', true)
      .attr('width', this.width)
      .attr('height', this.height)
    this.content = this.svg.append('g')
      .classed('content', true)
      .attr('width', this.width)
      .attr('height', this.height)
    this.overlay = this.svg.append('g')
      .classed('overlay', true)
      .attr('width', this.width)
      .attr('height', this.height)

    $(window).resize(this.resized.bind(this))
  }

  load() {}

  draw() {}

  resized() {
    this.axisGroupX.call(this.axisX)
    this.axisGroupY.call(this.axisY)
    this.zoomRect
      .attr('width', this.width)
      .attr('height', this.height)
  }

  zoomed() {
    this.content.attr('transform', d3.event.transform)
    this.axisGroupX.call(this.axisX
      .scale(d3.event.transform
        .rescaleX(this.scaleX)))
    this.axisGroupY.call(this.axisY
      .scale(d3.event.transform
        .rescaleY(this.scaleY)))
    this.scale = d3.event.transform.k
  }

  transform(...args) {
    this.zoom.transform(this.svg, ...args)
  }

  translateBy(...args) {
    this.zoom.translateBy(this.svg, ...args)
  }

  scaleBy(...args) {
    this.zoom.scaleBy(this.svg, ...args)
  }

  scaleTo(...args) {
    const selection = this.svg.transition().duration(500)
    this.zoom.scaleTo(selection, ...args)
  }

  get scaleX() {
    return (this._scaleX = this._scaleX || (
      d3.scaleLinear()
    )).domain([0, this.width])
      .range([0, this.width])
  }

  get scaleY() {
    return (this._scaleY = this._scaleY || (
      d3.scaleLinear()
    )).domain([0, this.height])
      .range([0, this.height])
  }

  get axisX() {
    return (this._axisX = this._axisX || (
      d3.axisTop()
        .tickPadding(-5)
        .tickFormat(d3.format('d'))
    )).scale(this.scaleX)
      .ticks(this.width / 100)
      .tickSize(-this.height)
  }

  get axisY() {
    return (this._axisY = this._axisY || (
      d3.axisLeft()
        .tickPadding(-5)
        .tickFormat(d3.format('d'))
    )).scale(this.scaleY)
      .ticks(this.height / 100)
      .tickSize(-this.width)
  }

  get width() {
    return parseInt(this.svg.style('width'))
  }

  get height() {
    return parseInt(this.svg.style('height'))
  }
}
