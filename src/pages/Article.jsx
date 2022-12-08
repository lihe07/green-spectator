import { useParams, useRouteData } from '@solidjs/router'
import { createResource, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export default () => {
  const params = useParams()
  const data = useRouteData()
  return (
    <div class="pt-20 color-white">
      <h1>Single article - {params.name}</h1>
      <p>{JSON.stringify(data)}</p>
      <article>{data.markdown()}</article>
    </div>
  )
}
