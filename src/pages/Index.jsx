import FirstScreen from './Index/FirstScreen'
import Ranking from './Index/Ranking'
import AnimatedWave from './Index/AnimatedWave'
import TakeAction from './Index/TakeAction'
import Articles from './Index/Articles'
import Footer from './Index/Footer'

import Section from '../components/Section'
// import { onMount } from 'solid-js'
import AboutUs from './Index/AboutUs'

export default () => {
  // onMount(() => {
  //   const root = document.getElementById('root')
  //   root.className = 'h-screen w-screen overflow-y-scroll'
  // })
  return (
    <>
      <FirstScreen />
      <Ranking />
      {/* <Prediction /> */}
      <Section animOnly={true}>
        <AnimatedWave type="immediate" />
        <div class="dark:bg-true-gray-8 light:bg-teal-9 transition-colors-300">
          <TakeAction />
          <Articles />
        </div>
      </Section>
      <AboutUs />
      <Footer />
    </>
  )
}
