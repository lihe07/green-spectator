import { createSignal, Show } from 'solid-js'
import video1 from '../../assets/videos/1.mp4'
import video2 from '../../assets/videos/2.mp4'
import video3 from '../../assets/videos/3.mp4'
import FirstScreenBlock from './FirstScreenBlock'
import { Motion } from '@motionone/solid'

const duration = 10 // Play for 5sec

export default () => {
  const [current, setCurrent] = createSignal(0)
  const [loading, setLoading] = createSignal(true)
  let video
  // let isFirst = true
  const [isFirst, setIsFirst] = createSignal(true)
  const currentVideo = () => {
    switch (current()) {
      case 0:
        return video1
      case 1:
        return video2
      case 2:
        return video3
    }
  }

  const [top, setTop] = createSignal('0%')

  return (
    <section class="w-full h-screen text-white relative">
      {/* Loading hover */}
      <div
        class="bg-true-gray-9 w-full h-full absolute z-3 transition-opacity-300 pointer-events-none flex justify-center items-center"
        classList={{ 'op-100': loading(), 'op-0': !loading() }}
      >
        <div
          class="color-white flex items-center justify-center transition-opacity-300 bg-true-gray-8 p8 rounded-xl op-0"
          classList={{ '!op-100': isFirst() }}
        >
          <div class="w-20 h-20 flex justify-center items-center mr-5">
            LOGO
          </div>
          <div>
            <h2 class="">Green Spectator</h2>
            <p class="op-80">Site is loading...</p>
          </div>
        </div>
      </div>
      <video
        ref={video}
        src={currentVideo()}
        preload="auto"
        onCanPlay={() => {
          if (video.readyState !== 4) return
          if (isFirst()) {
            setLoading(false)
            setIsFirst(false)
          } else setTimeout(() => setLoading(false), 300)
          video.muted = true
          video.play()
        }}
        onTimeUpdate={() => {
          if (video.currentTime >= duration) {
            setCurrent(current() + 1 > 2 ? 0 : current() + 1)
          }
          if (duration - video.currentTime <= 0.35) {
            // DBG
            // video.currentTime = 0
            // return
            setLoading(true)
          }
        }}
        class="w-full h-full object-cover"
      />
      <FirstScreenBlock current={current} duration={duration} />
      <Motion.div
        class="absolute bottom-5 left-50% translate-x--50% write-vertical-right text-6 font-600 tracking-wider"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1, delay: 0 }}
      >
        Scroll
        <div class="w-15 h-15 inline-block m-t-2 relative overflow-hidden cursor-pointer">
          <Motion.div
            class="absolute w-15 h-15"
            animate={{ top: top() }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              // scroll
              setTop('100%')
              setTimeout(
                () =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  }),
                500
              )

              setTimeout(() => setTop('0%'), 1000)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M11.65 4.007l.1-.007a.75.75 0 0 1 .744.648l.007.102l-.001 12.696l3.22-3.221a.75.75 0 0 1 .976-.073l.084.072a.75.75 0 0 1 .073.977l-.072.084l-4.497 4.5a.75.75 0 0 1-.976.073l-.084-.073l-4.504-4.5a.75.75 0 0 1 .976-1.133l.084.072L11 17.442V4.75a.75.75 0 0 1 .65-.743l.1-.007l-.1.007z"
                  fill="currentColor"
                  style={{ '--darkreader-inline-fill': 'currentColor' }}
                  data-darkreader-inline-fill=""
                />
              </g>
            </svg>
          </Motion.div>
        </div>
      </Motion.div>
    </section>
  )
}
