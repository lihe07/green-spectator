import Card from '../../components/Card'
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
      <div class="flex h-150 m-t-20">
        <Legend />
        <Card class="w-50% mx-20">Middle</Card>
        <Card class="flex-grow">
          <RankingItem name="Provience Name" unit="unit" data={114} rank={1} />
        </Card>
      </div>
    </Section>
  )
}
