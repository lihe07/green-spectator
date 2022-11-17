import Section from '../../components/Section'
import LongArticleBlock from './LongArticleBlock'

const Title = (props) => {
  return (
    <div class="text-center color-white">
      <h1 class="m0 text-10 tracking-wide md:text-15">{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}

export default () => {
  return (
    <Section class="h-50">
      {/* <h1 class="m0 text-center color-white text-10 tracking-wide md:text-15">
        Articles
      </h1> */}
      <Title
        title={'Articles'}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <LongArticleBlock />
      <LongArticleBlock />
    </Section>
  )
}
