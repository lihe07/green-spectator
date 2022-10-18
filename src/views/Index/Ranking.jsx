import Card from '../../components/Card'
import Section from '../../components/Section'
import Title from '../../components/Title'

export default () => {
  return (
    <Section id="ranking">
      <Title
        title="THE TITLE"
        description="From the data we collected, .....Lorem ipsum dolor sit amet, consectetur adipiscing elit, This sentence can not be too long (max 50%)"
      />
      <div class="flex h-150 m-t-20">
        <Card class="w-18">LEFT</Card>
        <Card class="w-50% mx-20">Middle</Card>
        <Card class="flex-grow">RIGHT</Card>
      </div>
    </Section>
  )
}
