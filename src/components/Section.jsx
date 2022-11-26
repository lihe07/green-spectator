import { Motion } from '@motionone/solid'
import { onMount, createSignal, splitProps } from 'solid-js'

export default (props) => {
  const [local, others] = splitProps(props, ['animOnly', 'class'])

  const [enter, setEnter] = createSignal(false)
  let section

  function onScroll () {
    // if (
    //   window.innerHeight - section.getBoundingClientRect().top >
    //   section.offsetHeight
    // ) {
    //   setEnter(true)
    // } else setEnter(false)
    if (
      window.innerHeight - section.getBoundingClientRect().top >
      window.innerHeight / 3
    ) {
      setEnter(true)
    } else {
      // Only if the section is totally out of the screen, set enter to false
      if (section.getBoundingClientRect().top >= window.innerHeight) {
        setEnter(false)
      }
    }
  }

  onMount(() => {
    const root = document.getElementById('root')
    root.addEventListener('scroll', onScroll)
    return () => root.removeEventListener('scroll', onScroll)
  })

  return (
    <Motion.section
      ref={section}
      class={props.animOnly ? local.class : 'p-10 max-w-300 ma ' + local.class}
      {...others}
      animate={{ opacity: enter() ? 1 : 0, y: enter() ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {props.children}
    </Motion.section>
  )
}
