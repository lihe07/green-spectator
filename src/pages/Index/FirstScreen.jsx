import { createSignal } from 'solid-js'

// import video1 from '../../assets/videos/1.webm'
// import video2 from '../../assets/videos/2.webm'
// import video3 from '../../assets/videos/3.webm'
// import video4 from '../../assets/videos/4.webm'

import logo from '../../assets/images/logo.svg'

import FirstScreenBlock from './FirstScreen/FirstScreenBlock'
import FirstScreenScroll from './FirstScreen/FirstScreenScroll'

const duration = 5 // Play for 5sec

export default () => {
  const [current, setCurrent] = createSignal(0)
  const [loading, setLoading] = createSignal(true)
  let video
  // let isFirst = true
  const [isFirst, setIsFirst] = createSignal(true)
  const currentVideo = () => {
    switch (current()) {
      case 0:
        return 'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/51055966374496eb66d1/1.mp4'
      case 1:
        return 'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/1636977637449885f94e/.mp4'
      case 2:
        return 'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/679395637449a574629/3.mp4'
      case 3:
        return 'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/3081980637449b3a122a/.mp4'
    }
  }

  return (
    <section class="w-full h-screen text-white relative">
      {/* Loading hover */}
      <div
        class="dark:bg-true-gray-9 light:bg-teal-9 w-full h-full absolute z-3 transition-opacity-300 pointer-events-none flex justify-center items-center"
        classList={{
          'op-100': loading(),
          'op-0': !loading(),
          'fixed !z-10': isFirst()
        }}
      >
        <div
          class="color-white  flex items-center justify-center transition-opacity-300 dark:bg-true-gray-8 light:bg-teal-8 p8 rounded-xl op-0"
          classList={{ '!op-100': isFirst() }}
        >
          <img class="w-20 h-20 mr-5 object-contain" src={logo} />
          <div>
            <h2 class="m-y-0 m-b-3">Green Spectator</h2>
            <p class="op-80 m-y-0">Site is loading...</p>
          </div>
        </div>
      </div>
      <video
        ref={video}
        src={currentVideo()}
        preload="auto"
        disablePictureInPicture="true"
        referrerPolicy="no-referrer"
        muted="true"
        autoPlay="true"
        volume="0"
        onCanPlay={() => {
          if (video.readyState !== 4) return
          if (isFirst()) {
            setLoading(false)
            setIsFirst(false)
          } else setTimeout(() => setLoading(false), 300)
          video.muted = true
          const promise = video.play()
          if (promise !== undefined) {
            promise.catch(() => {
              setTimeout(() => setLoading(true), (duration - 0.35) * 1000)
              setTimeout(
                () => setCurrent(current() + 1 > 3 ? 0 : current() + 1),
                duration * 1000
              )
            })
          }
        }}
        onTimeUpdate={() => {
          if (video.currentTime >= duration) {
            setCurrent(current() + 1 > 3 ? 0 : current() + 1)
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
      <FirstScreenScroll />
    </section>
  )
}
