import { For, createEffect, createSignal } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import map from '../.map.json'

import header from '../assets/images/ba.jpg'
import Section from '../components/Section'
import CenterTitle from '../components/CenterTitle'
import LongArticleBlock from '../components/LongArticleBlock'

const categories = [
  {
    name: {
      en: 'All',
      zh: '全部'
    },
    description: {
      en: 'All articles',
      zh: '所有文章'
    },
    cover: header,
    id: 1
  },
  {
    name: {
      en: 'Category 1',
      zh: '分类 1'
    },
    description: {
      en: 'Category 1',
      zh: '分类 1'
    },
    cover: header,
    id: 2
  }
]

const ImageHeader = (props) => {
  const [cover, setCover] = createSignal(null)

  createEffect(() => {
    if (props.src) {
      setCover(props.src)
    }
  })

  return (
    <div class="h-70 relative">
      <div
        style={{ 'background-image': `url(${cover()})` }}
        class="w-full h-full bg-cover bg-center transition-opacity"
        classList={{ 'op-0': !props.src }}
      />
      <div class="w-full h-full absolute top-0 bg-black bg-op-40 flex flex-col justify-center">
        <CenterTitle {...props} />
      </div>
    </div>
  )
}

const Category = (props) => {
  const { locale } = useI18n()[1]
  return (
    <li
      class="dark:bg-true-gray-8 light:bg-teal-7 hover:op-100 rounded-xl h-10 leading-9.5 px-3 my-3 transition cursor-pointer outline-2 outline-solid dark:outline-true-gray-8 light:outline-teal-7"
      classList={{ '!bg-op-0 op-80': !props.active }}
      onClick={() => props.onClick()}
    >
      {props.name[locale()]}
    </li>
  )
}

const Left = (props) => {
  return (
    <aside class="border-r border-white w-70 border-r-solid border-op-10 md:block hidden">
      <div class="sticky top-30 px-10 color-white">
        <input
          type="text"
          placeholder="Search"
          class="dark:bg-true-gray-8 dark:outline-true-gray-8 light:bg-teal-7 light:outline-teal-7 color-white border-none rounded-xl h-10 w-full outline-solid outline-2 op-80 hover:op-100 dark:focus:outline-true-gray-7 light:focus:outline-teal-6 focus:bg-op-0 focus:op-100 transition-all px-3 box-border tracking-wide placeholder-white"
          onInput={(e) =>
            props.setCategory({
              name: {
                en: 'Search results',
                zh: '搜索结果'
              },
              description: {
                en: `Search results for "${e.target.value}"`,
                zh: `搜索结果 "${e.target.value}"`
              },
              id: -1,
              value: e.target.value
            })
          }
        />
        <ul class="list-none p0 mt-7">
          <For each={categories}>
            {(category) => (
              <Category
                {...category}
                active={props.category.id === category.id}
                onClick={() => props.setCategory(category)}
              />
            )}
          </For>
        </ul>
      </div>
    </aside>
  )
}

const Right = (props) => {
  const { locale } = useI18n()[1]
  const articles = () => map.filter((item) => item.meta.language === locale())
  return (
    <div class="min-w-0 flex-1">
      <ImageHeader
        src={props.category.cover}
        title={props.category.name[locale()]}
        description={props.category.description[locale()]}
      />
      <div class="px-10">
        <For each={articles()}>
          {(item, index) => (
            <LongArticleBlock
              name={item.name}
              reverse={index() % 2}
              {...item.meta}
            />
          )}
        </For>
      </div>
    </div>
  )
}

export default () => {
  const [category, setCategory] = createSignal(categories[0])
  return (
    <div class="pt-10">
      <Section class="pb-0">
        <div class="flex">
          <Left category={category()} setCategory={setCategory} />
          <Right category={category()} />
        </div>
      </Section>
    </div>
  )
}
