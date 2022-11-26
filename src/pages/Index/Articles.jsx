import Section from '../../components/Section'
import LongArticleBlock from './Articles/LongArticleBlock'

import Title from '../../components/CenterTitle'

export default () => {
  return (
    <Section>
      {/* <h1 class="m0 text-center color-white text-10 tracking-wide md:text-15">
        Articles
      </h1> */}
      <Title
        title={'Articles'}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
      />
      <LongArticleBlock />
      <LongArticleBlock />
      TODO
      <div class="h-100" />
    </Section>
  )
}
