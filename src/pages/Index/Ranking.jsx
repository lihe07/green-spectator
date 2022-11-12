import Card from '../../components/Card'
import InteractiveMap from '../../components/InteractiveMap'
import Legend from '../../components/Legend'
import Section from '../../components/Section'
import Title from '../../components/Title'
import RankingItem from './RankingItem'

export default () => {
  return (
    <Section id="ranking">
      <div class="h-20" />
      <Title
        title="THE TITLE"
        description="From the data we collected, .....Lorem ipsum dolor sit amet, consectetur adipiscing elit, This sentence can not be too long (max 50%)"
      />
      <div class="flex relative h-150 md:m-t-20 justify-between m-t-30">
        <Legend />
        <Card class="md:w-50% md:mx-20 md:relative md:h-150 md:left-0 md:top-0 absolute w-[calc(100%+5rem)] left--10 top--10 h-170">
          <InteractiveMap defaultLevel="china" />
        </Card>
        <Card class="md:flex-grow z-1 w-30 md:!bg-opacity-100 !bg-op-70 backdrop-blur">
          <RankingItem name="Provience Name" unit="unit" data={114} rank={1} />
        </Card>
      </div>
    </Section>
  )
}
