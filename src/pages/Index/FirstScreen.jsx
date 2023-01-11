import {
  createEffect,
  createResource,
  createSignal,
  on,
  Show,
  Suspense
} from 'solid-js'

// import video1 from '../../assets/videos/1.mp4'
// import video2 from '../../assets/videos/2.mp4'
// import video3 from '../../assets/videos/3.mp4'
// import video4 from '../../assets/videos/4.mp4'

import logo from '../../assets/images/logo.svg'

import FirstScreenBlock from './FirstScreen/FirstScreenBlock'
import FirstScreenScroll from './FirstScreen/FirstScreenScroll'

const duration = 5 // Play for 5sec

// const videoList = [video1, video2, video3, video4]
const videoList = [
  'https://cdnoss.kaoshixing.com/ksx_prod/485050/file/sign/20221229/506521865.mp4',
  'https://cdnoss.kaoshixing.com/ksx_prod/485050/file/sign/20221230/-686704155.mp4',
  'https://cdnoss.kaoshixing.com/ksx_prod/485050/file/sign/20221230/-2028839248.mp4',
  'https://cdnoss.kaoshixing.com/ksx_prod/485050/file/sign/20221230/-1589088106.mp4'
]

export default () => {
  const [current, setCurrent] = createSignal(0)
  const [loading, setLoading] = createSignal(true)
  const [isPlaying, setIsPlaying] = createSignal(false)
  let video
  // let isFirst = true
  const [isFirst, setIsFirst] = createSignal(true)

  const videoCache = {}

  function next () {
    video.pause()
    setIsPlaying(false)
    setCurrent(current() + 1 > 3 ? 0 : current() + 1)
  }

  const [currentBlob, { refetch }] = createResource(async () => {
    const url = videoList[current()]
    // console.log('Current', current(), url)
    if (videoCache[url]) {
      // console.log('Cache hit')
      return videoCache[url]
    }
    // Load to blob
    const response = await fetch(url)
    const blob = await response.blob()
    const video = URL.createObjectURL(blob)
    videoCache[url] = video
    // console.log('Fetched', url, 'to', video)
    return video
  })
  createEffect(on(current, refetch, { defer: true }))

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
      <Suspense>
        <video
          ref={video}
          src={currentBlob()}
          disablePictureInPicture="true"
          muted="true"
          autoPlay="true"
          volume="0"
          onCanPlay={() => {
            video.muted = true
            const promise = video.play()
            if (isFirst()) {
              setLoading(false)
              setIsFirst(false)
            } else setTimeout(() => setLoading(false), 300)

            setIsPlaying(true)

            if (promise !== undefined) {
              promise.catch((e) => {
                console.log('Fallback to autoplay', e)
                setTimeout(() => setLoading(true), (duration - 0.35) * 1000)
                setTimeout(next, duration * 1000)
              })
            }
          }}
          onTimeUpdate={() => {
            if (video.currentTime >= duration) {
              next()
            }
            if (duration - video.currentTime <= 0.35) {
              setLoading(true)
            }
          }}
          class="w-full h-full object-cover"
        />
      </Suspense>
      <Show when={isPlaying()}>
        <FirstScreenBlock
          loading={loading}
          current={current}
          duration={duration}
        />
      </Show>

      <FirstScreenScroll />
    </section>
  )
}
