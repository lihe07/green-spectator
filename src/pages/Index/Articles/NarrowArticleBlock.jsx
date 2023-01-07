import { For, createSignal } from 'solid-js'

export default (props) => {
  const [hover, setHover] = createSignal(false)

  return (
    <div
      class="w-full h-70 rounded-5 bg-center bg-cover relative cursor-pointer transition-all-300"
      style={{ 'background-image': `url(${props.cover})` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        class="w-full absolute bottom-0 left-0 color-white px-10 box-border transition-all-300 rounded-5 backdrop-blur bg-black bg-op-30 overflow-hidden"
        classList={{ 'h-full py-10': hover(), 'h-33 py-6': !hover() }}
      >
        <h1 class="text-7 m0 tracking-wide">{props.title}</h1>
        <div class="flex gap-2 mt-3">
          <For each={props.tags}>
            {(tag) => (
              <div class="text-4 border-white border-solid border-1 rounded-lg px-3 py-1">
                {tag}
              </div>
            )}
          </For>
        </div>

        <p
          class="text-4 transition-300 leading-relaxed"
          classList={{
            'op-0': !hover(),
            'op-100': hover()
          }}
        >
          {props.description}
        </p>
      </div>
    </div>
  )
}
