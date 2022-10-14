import { createSignal } from 'solid-js'
import video1 from '../../assets/videos/1.mp4'
import video2 from '../../assets/videos/2.mp4'
import video3 from '../../assets/videos/3.mp4'
import FirstScreenBlock from './FirstScreenBlock'

const duration = 10 // Play for 5sec

export default () => {
  const [current, setCurrent] = createSignal(0)
  const [loading, setLoading] = createSignal(true)
  let video
  let isFirst = true
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

  return (
    <section class="w-full h-screen text-white relative">
      {/* Loading hover */}
      <div
        class="bg-true-gray-9 w-full h-full absolute z-3 transition-opacity-300 pointer-events-none"
        classList={{ 'op-100': loading(), 'op-0': !loading() }}
      />
      <video
        ref={video}
        src={currentVideo()}
        onCanPlay={() => {
          if (isFirst) {
            setLoading(false)
            isFirst = false
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
      <div class="absolute bottom-5 left-50% translate-x--50%">Scroll</div>
    </section>
  )
}
