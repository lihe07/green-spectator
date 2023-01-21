import { Swiper, SwiperSlide } from 'swiper/solid'
import 'swiper/css'
import './ArticlesCarousel.css'

import NarrowArticleBlock from './NarrowArticleBlock'

import cover from '../../../assets/images/ba.jpg'
import { For, Show } from 'solid-js'
import Section from '../../../components/Section'
const articles = [
  {
    cover,
    tags: ['Tag 1', 'Tag 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum, voluptatum fugit laboriosam harum, totam vero perspiciatis porro facere assumenda',
    title: 'Article 1',
    href: '#'
  },
  {
    cover,
    tags: ['Tag 1', 'Tag 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum, voluptatum fugit laboriosam harum, totam vero perspiciatis porro facere assumenda',
    title: 'Article 2',
    href: '#'
  },
  {
    cover,
    tags: ['Tag 1', 'Tag 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum, voluptatum fugit laboriosam harum, totam vero perspiciatis porro facere assumenda',
    title: 'Article 3',
    href: '#'
  }
]

const Cover = (props) => {
  return (
    <div
      class="absolute top-0 h-full z-2 swiper-cover backdrop-blur-1"
      classList={{
        'right-full': !props.right,
        'left-full rotate-180': props.right
      }}
    >
      <svg class="w-full h-full light:color-teal-9 dark:color-true-gray-8 transition-color-300">
        <defs>
          <mask id="msk">
            <linearGradient id="gdt">
              <stop offset="0" stop-color="white" stop-opacity="1" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
            <rect width="100%" height="100%" fill="url(#gdt)" />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill="currentColor" mask="url(#msk)" />
      </svg>
    </div>
  )
}

export default () => {
  return (
    <Section animOnly={true} class="relative">
      <div class="w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          // navigation={true}
          // modules={[Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 40
            }
          }}
        >
          <For each={articles}>
            {(article) => (
              <SwiperSlide>
                <NarrowArticleBlock {...article} />
              </SwiperSlide>
            )}
          </For>
        </Swiper>
      </div>
      <Cover />
      <Cover right={true} />
    </Section>
  )
}
