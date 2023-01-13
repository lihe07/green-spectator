import Section from '../../components/Section'
import LongArticleBlock from '../../components/LongArticleBlock'
import Title from '../../components/CenterTitle'

import placeholder from '../../assets/images/ba.jpg'
import ArticlesCarousel from './Articles/ArticlesCarousel'

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
      <LongArticleBlock cover={placeholder} />
      <LongArticleBlock reverse={true} cover={placeholder} />
      <ArticlesCarousel />
    </Section>
  )
}
