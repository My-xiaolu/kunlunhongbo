import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules'

// 導入Swiper樣式
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 導出Swiper組件和模塊
export { Swiper, SwiperSlide }

// 導出常用模塊
export const swiperModules = {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination
}

// 默認配置
export const defaultSwiperConfig = {
  modules: [Autoplay, EffectCreative, Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
}

// 創意效果配置
export const creativeEffectConfig = {
  prev: {
    shadow: false,
    translate: ['-20%', 0, -1]
  },
  next: {
    translate: ['100%', 0, 0]
  }
} 