import * as d3 from 'd3'
import { createEffect, createSignal, onMount } from 'solid-js'

import { useAppContext } from '../AppContext'

const api = 'https://geojson.cn/api/data/{level}.json'

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

function resize (container, svg, g) {
  const width = container.clientWidth
  const height = container.clientHeight
  svg.attr('width', width).attr('height', height)
  // translate the map to center
  g.attr('transform', `translate(${width / 2}, ${height / 2})`)
}

async function initMap (container, featuresPromise) {
  const projection = d3.geoMercator().center([155, 15]).scale(530)
  // .translate([width / 2, height / 2])
  const path = d3.geoPath().projection(projection)
  const svg = d3.select(container).append('svg')
  const g = svg.append('g') // map group
  g.selectAll('path')
    .data(await featuresPromise)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('style', 'cursor: pointer;')
    .on('mouseover', function () {
      d3.select(this).transition().duration(150).attr('opacity', 1)
    })
    .on('mouseout', function () {
      d3.select(this).transition().duration(150).attr('opacity', 0.8)
    })

  return { svg, g, path, projection }
}

export default (props) => {
  let container
  // Disable eslint because defaultLevel is not reactive
  // eslint-disable-next-line solid/reactivity
  const { defaultLevel } = props

  const [currentLevel, setCurrentLevel] = createSignal(defaultLevel)
  const { dark } = useAppContext()

  // Preparation: loading data
  const featuresPromise = getGeoJson(defaultLevel)

  let projection, path, svg, g
  onMount(async () => {
    // initMap(container, featuresPromise)
    ;({ projection, path, svg, g } = await initMap(container, featuresPromise))
    resize(container, svg, g)
    new ResizeObserver(() => resize(container, svg, g)).observe(container)
    coloring(g, dark())
  })
  createEffect(() => coloring(g, dark()))

  return (
    <div
      claas="w-full max-w-full overflow-hidden"
      style={{ height: '100%' }}
      ref={container}
    />
  )
}
