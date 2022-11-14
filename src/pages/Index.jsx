import FirstScreen from './Index/FirstScreen'
import Ranking from './Index/Ranking'
import Prediction from './Index/Prediction'
import AnimatedWave from './Index/AnimatedWave'
import TakeAction from './Index/TakeAction'
import Articles from './Index/Articles'
import Section from '../components/Section'

export default () => {
  return (
    <>
      <FirstScreen />
      <Ranking />
      <Prediction />
      <Section animOnly={true}>
        <AnimatedWave type="immediate" />
        <TakeAction />
        <Articles />
      </Section>
    </>
  )
}
