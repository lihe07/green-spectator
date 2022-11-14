import Equation from './Equation'

import blob1l from '../../assets/images/blob1l.svg'
import blob1r from '../../assets/images/blob1r.svg'
import { For } from 'solid-js'
import Section from '../../components/Section'

const equations = [
  {
    leftBlob: blob1l,
    rightBlob: blob1r,
    left: 'Waste Classified',
    right: 'Carbon Reduced',
    leftValue: '114',
    rightValue: '514',
    leftUnit: 'kg',
    rightUnit: 'kg'
  }
]

export default () => {
  return (
    <section class="dark:bg-true-gray-8 light:bg-cyan-9 h-100">
      <h1 class="m0 text-center color-white text-10 tracking-wide md:text-15">
        Take Action
      </h1>
      {/* Equations */}
      <Section>
        <For each={equations}>{(equation) => <Equation {...equation} />}</For>
      </Section>
    </section>
  )
}
