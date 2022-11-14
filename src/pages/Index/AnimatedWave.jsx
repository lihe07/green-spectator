import { Motion } from '@motionone/solid'
import { createSignal, onMount } from 'solid-js'
import Section from '../../components/Section'

export default (props) => {
  const [left, setLeft] = createSignal(-50)
  let container
  function asScroll () {
    const rate = Math.max(
      0,
      Math.tanh(
        ((window.innerHeight -
          container.getBoundingClientRect().top -
          container.offsetHeight) /
          container.offsetHeight) *
          2
      )
    )
    setLeft(-50 * (1 - rate))
  }
  function immediate () {
    if (
      window.innerHeight - container.getBoundingClientRect().top >
      container.offsetHeight
    ) {
      setLeft(0)
    } else setLeft(-50)
  }
  onMount(() => {
    window.addEventListener(
      'scroll',
      props.type === 'asScroll' ? asScroll : immediate
    )
    return () =>
      window.removeEventListener(
        'scroll',
        props.type === 'asScroll' ? asScroll : immediate
      )
  })
  return (
    <div
      ref={container}
      class="w-full h-30vw max-h-70 relative overflow-hidden"
    >
      <Motion.div
        class="w-150% h-full absolute dark:color-true-gray-8 light:color-cyan-9"
        animate={{ left: left() + '%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          class="h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fill-opacity="1"
            d="M0,224L80,202.7C160,181,320,139,480,144C640,149,800,203,960,234.7C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </Motion.div>
    </div>
  )
}
