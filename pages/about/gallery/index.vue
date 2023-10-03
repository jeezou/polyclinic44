<template>
  <div class="gallery-page__wrapper container">
    <bread-crumbs />
    <div class="gallery-page">
      <h1 class="gallery-page__title section-title">Фотогалерея</h1>
      <div class="gallery-page__content">
        <div class="gallery-page__content-item">
          <!-- <div class="gallery-page__content-item-title">{{ item.title }}</div> -->
          <div class="gallery-page__content-item-grid cards-grid">
            <div
              class="gallery-page__content-photo"
              v-for="(photo, index) in photos"
              :key="`gallery-page-item-photo-${index}`"
              @click="
                current = photo
                isModal = true
              "
            >
              <img :src="photo.full_image_url" :alt="`photo-${index}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="gallery-page__modal"
      :class="{ 'gallery-page__modal--active': isModal }"
    >
      <div class="gallery-page__modal-blackout" @click="isModal = false"></div>
      <div class="gallery-page__modal-img-wrapper">
        <div class="gallery-page__modal-img" v-if="current">
          <img :src="current.full_image_url" alt="" />
        </div>
        <div class="gallery-page__modal-close" @click="isModal = false">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6488 12.9772L25.4787 3.14732C25.817 2.79706 26.0042 2.32794 25.9999 1.84101C25.9957 1.35407 25.8004 0.888274 25.4561 0.543944C25.1117 0.199615 24.6459 0.00430155 24.159 7.02049e-05C23.6721 -0.00416115 23.2029 0.183028 22.8527 0.521322L13.0228 10.3512L3.19296 0.521322C2.8427 0.183028 2.37358 -0.00416115 1.88665 7.02049e-05C1.39971 0.00430155 0.933916 0.199615 0.589586 0.543944C0.245257 0.888274 0.0499434 1.35407 0.0457121 1.84101C0.0414807 2.32794 0.22867 2.79706 0.566964 3.14732L10.3968 12.9772L0.566964 22.807C0.389588 22.9784 0.248106 23.1833 0.150775 23.4099C0.0534444 23.6364 0.00221292 23.8801 7.01196e-05 24.1267C-0.00207268 24.3733 0.0449162 24.6179 0.138295 24.8461C0.231674 25.0743 0.369572 25.2817 0.543944 25.4561C0.718317 25.6304 0.92567 25.7683 1.15391 25.8617C1.38214 25.9551 1.62669 26.0021 1.87328 25.9999C2.11987 25.9978 2.36356 25.9466 2.59014 25.8492C2.81672 25.7519 3.02165 25.6104 3.19296 25.433L13.0228 15.6032L22.8527 25.433C23.2029 25.7713 23.6721 25.9585 24.159 25.9543C24.6459 25.9501 25.1117 25.7547 25.4561 25.4104C25.8004 25.0661 25.9957 24.6003 25.9999 24.1134C26.0042 23.6264 25.817 23.1573 25.4787 22.807L15.6488 12.9772Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryPage',
  components: {},
  meta: {
    crumb: 'Фотогалерея',
  },
  data() {
    return {
      current: 'gallery/2020/1.png',
      isModal: false,
      photos: [
        // {
        //   year: 'ДП44',
        //   title: 'ДП44',
        //   photos: [
        //     require('@/assets/images/gallery/dp44/1.png'),
        //     require('@/assets/images/gallery/dp44/2.png'),
        //     require('@/assets/images/gallery/dp44/3.png'),
        //     require('@/assets/images/gallery/dp44/4.png'),
        //     require('@/assets/images/gallery/dp44/5.png'),
        //     require('@/assets/images/gallery/dp44/6.png'),
        //     require('@/assets/images/gallery/dp44/7.png'),
        //     require('@/assets/images/gallery/dp44/8.png'),
        //     require('@/assets/images/gallery/dp44/9.png'),
        //     require('@/assets/images/gallery/dp44/10.png'),
        //     require('@/assets/images/gallery/dp44/11.png'),
        //     require('@/assets/images/gallery/dp44/12.png'),
        //     require('@/assets/images/gallery/dp44/13.png'),
        //     require('@/assets/images/gallery/dp44/14.png'),
        //   ],
        // },
        // {
        //   year: '2020',
        //   title: 'Конкурс новогодней игрушки 2020',
        //   photos: [
        //     require('@/assets/images/gallery/2020/1.png'),
        //     require('@/assets/images/gallery/2020/2.png'),
        //     require('@/assets/images/gallery/2020/3.png'),
        //     require('@/assets/images/gallery/2020/4.png'),
        //   ],
        // },
        // {
        //   year: '2018',
        //   title: '24 декабря 2018 г.',
        //   photos: [
        //     require('@/assets/images/gallery/2018/1.png'),
        //     require('@/assets/images/gallery/2018/2.png'),
        //     require('@/assets/images/gallery/2018/3.png'),
        //     require('@/assets/images/gallery/2018/4.png'),
        //     require('@/assets/images/gallery/2018/5.png'),
        //   ],
        // },
      ],
    }
  },
  mounted() {
    this.getPhotos()
  },
  beforeUnmount() {},
  methods: {
    async getPhotos() {
      try {
        const res = await this.$axios.get(`${this.$store.state.posts}/1052`)
        console.log(res)
        this.photos = res.data.acf.gallery
      } catch {}
    },
  },
}
</script>

<style lang="scss">
.gallery-page {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 64px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    &-item {
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: $gray-2;
        margin-bottom: 32px;
      }
    }

    &-photo {
      border-radius: 16px;
      overflow: hidden;
      transition: all $transition;
      cursor: pointer;
      min-height: 300px;
      max-height: 300px;

      img {
        width: 100%;
        object-fit: cover;
        min-height: 100%;
      }

      &:hover {
        box-shadow: 0px 8px 15px rgba(35, 35, 35, 0.2);
      }
    }
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all $transition;

    &--active {
      opacity: 1;
      visibility: visible;
    }

    &-blackout {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
    }

    &-img {
      max-height: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &-wrapper {
        position: relative;
        z-index: 2;
        height: 100%;
        max-height: 60%;
        width: fit-content;
      }

      img {
        object-fit: contain;
        height: 100%;
        border-radius: 24px;
      }
    }

    &-close {
      position: absolute;
      top: 10px;
      right: 0;
      transform: translateX(calc(100% + 29px));
      cursor: pointer;
      transition: all $transition;

      &:hover {
        transform: translateX(calc(100% + 29px)) scale(1.05);
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .gallery-page {
    &__content {
      &-item {
        &-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .gallery-page {
    &__modal {
      z-index: 999999;
      &-img {
        width: calc(100% - 32px);
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-wrapper {
          height: auto;
          width: 100%;
          max-height: unset;
          display: flex;
          justify-content: center;
        }

        img {
          width: 100%;
        }
      }

      &-close {
        transform: translate(calc(-100% - 8px), 4px);
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .gallery-page {
    &__title {
      margin: 16px 0 !important;
      font-size: 32px;
      line-height: 140%;
    }

    &__content {
      &-item {
        &-grid {
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
      }

      &-photo {
        border-radius: 12px;
      }
    }
  }
}
</style>
