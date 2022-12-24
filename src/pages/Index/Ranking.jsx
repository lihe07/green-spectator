import { For, Show, createResource, createSignal } from 'solid-js'
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
// import Loading from '../../components/Loading'

async function fetcher () {
  const data = await csv(dataUrl)
  console.log(data)

  // Find the max value and min value
  let max = 0
  let min = 0

  for (const row of data) {
    if (row.Total > max) max = row.Total
    if (row.Total < min) min = row.Total
  }

  function numberToHexColor (number) {}

  return { data, numberToHexColor, max, min }
}

export default () => {
  const [t] = useI18n()

  const [collapseId, setCollapseId] = createSignal(0)

  const res = createResource(fetcher)[0]

  return (
    <Section id="ranking">
      <div class="h-20" />
      <Title
        title={t('index.ranking.title')}
        description={t('index.ranking.description')}
      />

      <div class="mt-20 md:h-170 h-[calc(100vh-130px)] flex md:flex-row flex-col justify-between">
        <Show when={res()}>
          <Card class="relative md:w-[calc(50%-10px)] md:h-full h-[calc(50%-10px)]">
            <div class="absolute left-5 h-80% top-10%">
              <Legend max={res().max} min={res().min} />
            </div>

            <InteractiveMap
              defaultLevel="china"
              onChangeLevel={(level) => {
                console.log('Change Level:', level)
              }}
              data={res().data}
              numberToHexColor={res().numberToHexColor}
            />
          </Card>

          <div class="flex flex-col justify-between md:w-[calc(50%-10px)] md:h-full h-[calc(50%-10px)]">
            <CollapseCard
              id={0}
              current={collapseId()}
              set={setCollapseId}
              title="Ranking Title"
            >
              {/* <RankingItem name="Provi Name" unit="unit" data={114} rank={1} /> */}
              <For each={res().data}>
                {(row, index) => (
                  <RankingItem
                    name={row.Code}
                    unit="unit"
                    data={row.Total}
                    rank={index() + 1}
                  />
                )}
              </For>
            </CollapseCard>
            <CollapseCard
              id={1}
              current={collapseId()}
              set={setCollapseId}
              title="Chart Title"
            >
              <h1 class="color-white text-center">CHART</h1>
            </CollapseCard>
          </div>
        </Show>
      </div>
    </Section>
  )
}
