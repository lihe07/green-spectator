import { For } from 'solid-js'
import map from '../.map'
import { Link } from '@solidjs/router'

export default () => {
  return (
    <div class="pt-20 color-white">
      <h1>Articles List</h1>

      {JSON.stringify(map)}
      <For each={map}>
        {(item) => (
          <div>
            <h2>{item.meta.title}</h2>
            <Link href={item.name}>GOTO</Link>
          </div>
        )}
      </For>
    </div>
  )
}
