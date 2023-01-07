import { Swiper, SwiperSlide } from 'swiper/solid'
import { Navigation } from 'swiper'
import 'swiper/css'
// import 'swiper/css/navigation'

import NarrowArticleBlock from './NarrowArticleBlock'

import cover from '../../../assets/images/ba.jpg'
import { For } from 'solid-js'
const articles = [
  {
    cover,
    tags: ['Tag 1', 'Tag 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum, voluptatum fugit laboriosam harum, totam vero perspiciatis porro facere assumenda',
    title: 'Article 1'
  },
  {
    cover,
    tags: ['Tag 1', 'Tag 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum, voluptatum fugit laboriosam harum, totam vero perspiciatis porro facere assumenda',
    title: 'Article 2'
  },
  {
    cover,
    tags: ['Tag 1', 'Tag 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rerum, voluptatum fugit laboriosam harum, totam vero perspiciatis porro facere assumenda',
    title: 'Article 3'
  }
]

export default () => {
  return (
    <div class="w-full h-70">
      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        navigation={true}
        modules={[Navigation]}
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
  )
}
