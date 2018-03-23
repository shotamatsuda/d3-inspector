import Visualization from './components/Visualization'
import config from './config'

const visualization = new Visualization('#visualization', config)

visualization.zoom.on('zoom.scale', () => {
  const transform = d3.event.transform
  $('#origin-x').val(`${-transform.x.toFixed(1)}`)
  $('#origin-y').val(`${-transform.y.toFixed(1)}`)
  $('#scale').val(`${(transform.k * 100).toFixed(1)}`)
})

$('#origin-x').change(() => {
  const transform = d3.zoomTransform(visualization.svg)
  visualization.transform(transform.translate(
    -$('#origin-x').val(),
    transform.y)
  )
})

$('#origin-y').change(() => {
  const transform = d3.zoomTransform(visualization.svg)
  visualization.transform(transform.translate(
    transform.x,
    -$('#origin-y').val())
  )
})

$('#scale-in').click(e => {
  const current = visualization.scale
  let result = current
  let proposed = config.zoom[0]
  let i = 0
  while (true) {
    if (proposed >= 1) {
      proposed /= (i % 2 !== 0) ? 3/4 : 2/3
    } else {
      proposed /= (i % 2 !== 0) ? 2/3 : 3/4
    }
    ++i
    if (current >= proposed) {
      continue
    }
    if (result <= current && current < proposed) {
      result = proposed
      break
    }
    result = proposed
  }
  visualization.scaleTo(result)
})

$('#scale-out').click(e => {
  const current = visualization.scale
  let result = current
  let proposed = config.zoom[1]
  let i = 0
  while (true) {
    if (proposed <= 1) {
      proposed *= (i % 2 !== 0) ? 3/4 : 2/3
    } else {
      proposed *= (i % 2 !== 0) ? 2/3 : 3/4
    }
    ++i
    if (current <= proposed) {
      continue
    }
    if (result >= current && current > proposed) {
      result = proposed
      break
    }
    result = proposed
  }
  visualization.scaleTo(result)
})

$('#scale-identity').click(e => {
  visualization.scaleTo(1)
})
