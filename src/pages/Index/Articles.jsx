import { For } from 'solid-js'
import Section from '../../components/Section'
import LongArticleBlock from '../../components/LongArticleBlock'
import Title from '../../components/CenterTitle'

import placeholder from '../../assets/images/ba.jpg'
import ArticlesCarousel from './Articles/ArticlesCarousel'

import map from '../../.map.json'
import { useI18n } from '@solid-primitives/i18n'

export default () => {
  const [t, { locale }] = useI18n()

  const withOrg = () =>
    map.filter(
      (item) => item.meta.language === locale() && item.meta.orgnization
    )

  return (
    <Section>
      {/* <h1 class="m0 text-center color-white text-10 tracking-wide md:text-15">
        Articles
      </h1> */}
      <Title
        title={t('index.articles.title')}
        description={t('index.articles.description')}
      />
      <For each={withOrg()}>
        {(item, index) => (
          <LongArticleBlock {...item.meta} reverse={index() % 2} />
        )}
      </For>
      <ArticlesCarousel />
    </Section>
  )
}
