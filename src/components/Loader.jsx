import { createEffect, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useIsRouting } from '@solidjs/router'
import { Motion } from '@motionone/solid'

export default () => {
  return (
    <Portal>
      <Motion.div
        class="fixed top-0 h-2 z-10 left-0 bg-sky-5 op-60 w-0"
        animate={{
          width: '100%'
        }}
        transition={{
          duration: 0.3
        }}
      />
    </Portal>
  )
}
