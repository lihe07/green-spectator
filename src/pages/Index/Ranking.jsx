import { createResource, createSignal } from 'solid-js'
import { csv } from 'd3'

import dataUrl from '../../assets/data.csv?url'

import Card from '../../components/Card'
import InteractiveMap from '../../components/InteractiveMap'
import Legend from '../../components/Legend'
import Section from '../../components/Section'
import Title from '../../components/Title'
import RankingItem from './Ranking/RankingItem'
import { useI18n } from '@solid-primitives/i18n'

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
    <Section id="ranking" class="snap-start">
      <div class="h-20" />
      <Title
        title={t('index.ranking.title')}
        description={t('index.ranking.description')}
      />
      {/* Snap */}
      <div class="md:h-150 h-[calc(100vh-180px)] snap-start p-t-20">
        {/* Flex */}
        <div class="flex relative md:h-full h-[calc(100vh-180px)] md:p0 p-t-13 justify-between">
          <Legend />

          <Card class="md:w-50% md:mx-20 md:relative md:h-150 h-[calc(100vh-80px)] md:left-0 top-0 absolute w-[calc(100%+5rem)] left--10 md:!rounded-xl !rounded-none">
            <InteractiveMap defaultLevel="china" />
          </Card>

          <Card class="md:flex-grow z-1 w-30 md:!bg-opacity-100 !bg-op-70 backdrop-blur">
            <RankingItem
              name="Provience Name"
              unit="unit"
              data={114}
              rank={1}
            />
          </Card>
        </div>
      </div>
    </Section>
  )
}
