import { createResource, createSignal } from 'solid-js'
import { csv } from 'd3'

import dataUrl from '../../assets/data.csv?url'
import { useI18n } from '@solid-primitives/i18n'

import Card from '../../components/Card'
import InteractiveMap from '../../components/InteractiveMap'
import Legend from '../../components/Legend'
import Section from '../../components/Section'
import Title from '../../components/Title'

import RankingItem from './Ranking/RankingItem'
import CollapseCard from './Ranking/CollapseCard'

async function fetcher () {
  const data = await csv(dataUrl)
  console.log(data)
  return data
}

export default () => {
  const [t] = useI18n()

  const [mode, setMode] = createSignal('listing') // listing, chart
  const showChart = () => mode() === 'chart'
  const showListing = () => mode() === 'listing'

  const data = createResource(fetcher)

  return (
    <Section id="ranking">
      <div class="h-20" />
      <Title
        title={t('index.ranking.title')}
        description={t('index.ranking.description')}
      />

      <div class="mt-20 md:h-170 h-[calc(100vh-130px)] flex md:flex-row flex-col justify-between">
        <Card class="relative md:w-[calc(50%-10px)] md:h-full h-[calc(50%-10px)]">
          <div class="absolute left-5 h-80% top-10%">
            <Legend />
          </div>

          <InteractiveMap
            defaultLevel="china"
            onChangeLevel={(level) => {
              console.log('Change Level:', level)
            }}
          />
        </Card>

        <div class="flex flex-col justify-between md:w-[calc(50%-10px)] md:h-full h-[calc(50%-10px)]">
          <CollapseCard>
            <RankingItem
              name="Provience Name"
              unit="unit"
              data={114}
              rank={1}
            />
          </CollapseCard>
          <CollapseCard>CHART</CollapseCard>
        </div>
      </div>
    </Section>
  )
}
