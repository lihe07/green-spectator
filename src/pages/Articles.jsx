import { For } from 'solid-js'
import map from '../.map.json'
import { Link } from '@solidjs/router'

import header from '../assets/images/ba.jpg'
import Section from '../components/Section'
import CenterTitle from '../components/CenterTitle'
import LongArticleBlock from '../components/LongArticleBlock'

const ImageHeader = () => {
  return (
    <div style={{ 'background-image': `url(${header})` }} class="h-70 bg-cover">
      <div class="bg-black w-full h-full bg-op-30 flex items-center justify-center">
        <CenterTitle title="Category" description="Category Desc" />
      </div>
    </div>
  )
}

const Category = (props) => {
  return (
    <li
      class="dark:bg-true-gray-8 light:bg-teal-7 hover:op-100 rounded-xl h-10 leading-9 px-3 my-3 transition-all"
      classList={{ '!bg-op-0 op-80 cursor-pointer': !props.active }}
    >
      Category
    </li>
  )
}

const Left = () => {
  return (
    <aside class="border-r border-white w-70 border-r-solid border-op-10">
      <div class="sticky top-30 px-10 color-white">
        <input
          type="text"
          placeholder="Search"
          class="dark:bg-true-gray-8 dark:outline-true-gray-8 light:bg-teal-7 light:outline-teal-7 color-white border-none rounded-xl h-10 w-full outline-solid outline-2 op-80 hover:op-100 dark:focus:outline-true-gray-7 light:focus:outline-teal-6 focus:bg-op-0 focus:op-100 transition-all px-3 box-border tracking-wide placeholder-white"
        />
        <ul class="list-none p0 mt-7">
          <Category active="true" />
          <Category />
        </ul>
      </div>
    </aside>
  )
}

const Right = () => {
  return (
    <div class="min-w-0 flex-1">
      <ImageHeader />
      <div class="px-10">
        <For each={map}>
          {(item, index) => (
            <LongArticleBlock cover={header} reverse={index() % 2} />
          )}
        </For>
      </div>
    </div>
  )
}

export default () => {
  return (
    <div class="pt-10">
      <Section class="pb-0">
        <div class="flex">
          <Left />
          <Right />
        </div>
      </Section>
    </div>
  )
}
