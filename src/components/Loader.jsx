import { createEffect, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Motion } from '@motionone/solid'
import { useIsRouting } from '@solidjs/router'

export default () => {
  const isRouting = useIsRouting()
  const [percent, setPercent] = createSignal(0)
  const [show, setShow] = createSignal(false)
  createEffect(() => {
    if (isRouting()) {
      setPercent(0)
      setTimeout(() => setShow(true), 200)
    } else {
      setTimeout(() => {
        setPercent(100)
        setTimeout(() => {
          setShow(false)
        }, 300)
      }, 300)
    }
  })
  return (
    <Portal>
      <div
        class="fixed top-0 h-2 z-10 left-0 bg-sky-5 op-0 transition-all-300 w-0"
        classList={{ 'op-60': show() }}
        style={{
          width: percent() + '%'
        }}
      />
    </Portal>
  )
}
