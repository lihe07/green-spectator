import * as d3 from 'd3'

import { createEffect, createSignal, onMount } from 'solid-js'

import { useAppContext } from '../AppContext'

// const api = 'https://geojson.cn/api/data/{level}.json'
import mapUrl from '../assets/china.json?url'
import { svg } from 'd3'
const api = mapUrl

async function getGeoJson (level) {
  const res = await fetch(api.replace('{level}', level))
  const data = await res.json()
  return data.features
}

function coloring (g, dark) {
  if (!g) return
  g.selectAll('path')
    .attr('fill', dark ? '#525252' : '#0d9488')
    .attr('stroke', dark ? '#262626' : '#115e59')
    .attr('stroke-width', 0.5)
    .attr('opacity', 0.8)
}

function resize (container, svg, g, transform) {
  const width = container.clientWidth
  const height = container.clientHeight
  svg.attr('width', width).attr('height', height)
  svg.selectAll('rect').attr('width', width).attr('height', height)
  // translate the map to center

  if (!transform) {
    g.attr('transform', `translate(${width / 2}, ${height / 2})`)
  } else {
    const deltaX = (container.clientWidth - transform.clientWidth) / 2
    const deltaY = (container.clientHeight - transform.clientHeight) / 2
    g.attr(
      'transform',
      `translate(${transform.x + deltaX}, ${transform.y + deltaY}) scale(${
        transform.k
      })`
    )
  }
}

async function initMap (container, featuresPromise, onClick) {
  const projection = d3.geoMercator().center([155, 15]).scale(530)
  // .translate([width / 2, height / 2])
  const path = d3.geoPath().projection(projection)
  const svg = d3.select(container).append('svg')

  svg.attr('style', 'cursor: pointer;')

  svg
    .append('rect')
    .attr('opacity', 0)
    .on('click', function () {
      onClick()
    })

  const g = svg.append('g') // map group
  g.selectAll('path')
    .data(await featuresPromise)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('id', function (d) {
      return d.properties.code
    })
    .on('mouseover', function () {
      d3.select(this).transition().duration(150).attr('opacity', 1)
    })
    .on('mouseout', function () {
      if (!this.classList.contains('active')) {
        d3.select(this).transition().duration(150).attr('opacity', 0.8)
      }
    })
    .on('click', function () {
      onClick(this)
    })

  return { svg, g, path, projection }
}

function getCentroid (ele) {
  if (!ele) return [0, 0]
  const bbox = ele.getBBox()
  return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2]
}

const MARGIN = 20
function getScale (ele, container) {
  if (!ele) return 1
  const bbox = ele.getBBox()
  const widthScale = (container.clientWidth - MARGIN) / bbox.width
  const heightScale = (container.clientHeight - MARGIN) / bbox.height
  return Math.min(widthScale, heightScale)
}

export default (props) => {
  let container
  // Disable eslint because defaultLevel is not reactive
  // eslint-disable-next-line solid/reactivity
  const { defaultLevel } = props

  // const [currentLevel, setCurrentLevel] = createSignal(defaultLevel)
  let currentLevel = defaultLevel
  const { dark } = useAppContext()

  // Preparation: loading data
  const featuresPromise = getGeoJson(defaultLevel)

  let map
  let transform
  onMount(async () => {
    // initMap(container, featuresPromise)
    map = await initMap(container, featuresPromise, onClick)

    resize(container, map.svg, map.g)
    new ResizeObserver(() =>
      resize(container, map.svg, map.g, transform)
    ).observe(container)
    coloring(map.g, dark())
  })
  createEffect(() => coloring(map?.g, dark())) // Theme

  function onClick (ele) {
    const containerX = container.clientWidth / 2
    const containerY = container.clientHeight / 2

    transform = {
      clientWidth: container.clientWidth,
      clientHeight: container.clientHeight
    }

    if (currentLevel === ele?.id) {
      // Double Click, Back to default
      ele = null
    }
    if (!ele?.id) {
      // Only elements that have id can be clicked
      ele = null
    }

    currentLevel = ele?.id || defaultLevel

    props.onChangeLevel(currentLevel)

    const centroid = getCentroid(ele)
    const scale = getScale(ele, container)
    transform.x = containerX - centroid[0] * scale
    transform.y = containerY - centroid[1] * scale
    transform.k = ele ? scale : 1

    map.g.selectAll('path').classed(
      'active',
      ele &&
        function () {
          return this.id === ele.id
        }
    )

    map.g
      .selectAll('path')
      .transition()
      .duration(300)
      .attr('opacity', function () {
        return this.id === ele?.id ? '1' : '0.8'
      })

    map.g
      .transition()
      .duration(700)
      .attr(
        'transform',
        `translate(${transform.x}, ${transform.y}) scale(${transform.k})`
      )
  }

  return (
    <div
      claas="w-full max-w-full overflow-hidden"
      style={{ height: '100%' }}
      ref={container}
    />
  )
}
