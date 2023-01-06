import background from '../../assets/images/ba.jpg'
import Section from '../../components/Section'
import AnimatedWave from './AnimatedWave'

export default () => {
  return (
    <div
      class="bg-cover bg-center h-200"
      style={{
        'background-image': `url(${background})`
      }}
    >
      <div class="bg-black bg-op-50 h-full">
        <AnimatedWave reverse={true} type="asScroll" />
        <Section>
          <h1 class="color-white md:text-15 text-10 text-center mt--10">
            About US
          </h1>
          <p class="color-white">
            TODO Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            quisquam quidem fugit ullam officiis porro, ducimus et! Molestias
            fugit voluptatum sequi inventore, aperiam tenetur obcaecati dolore
            temporibus adipisci, rerum eius.
          </p>
        </Section>
      </div>
    </div>
  )
}
