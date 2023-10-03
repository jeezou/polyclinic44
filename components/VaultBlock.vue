<template>
  <div class="vault">
    <div class="vault__services container">
      <h2 class="vault__services-title section-title">
        Полезные сервисы Санкт-Петербурга
      </h2>
      <div class="vault__slider">
        <client-only>
          <carousel v-bind="options">
            <slide
              v-for="(slide, index) in slides"
              :key="`main-page-slide-${index}`"
              class="slide"
            >
              <a
                :href="slide.link"
                target="_blank"
                class="slide__inner block"
                v-if="slide.link"
              >
                <div class="slide__title" v-html="slide.title" />
                <img
                  :src="slide.img"
                  :alt="`slide image ${index}`"
                  class="slide__icon"
                />
              </a>
              <div class="slide__inner block" v-else>
                <div class="slide__title" v-html="slide.title" />
                <img
                  :src="slide.img"
                  :alt="`slide image ${index}`"
                  class="slide__icon"
                />
              </div>
            </slide>
          </carousel>
        </client-only>
      </div>
    </div>
    <footer-block />
  </div>
</template>

<script>
export default {
  name: 'VaultBlock',
  props: {},
  computed: {},
  data() {
    return {
      slides: [],

      options: {
        loop: false,
        perPage: 4,
        scrollPerPage: false,
        navigationEnabled: true,
        paginationEnabled: false,
        navigationNextLabel: '→',
        navigationPrevLabel: '←',
      },

      windowWidth: 9999,
    }
  },
  mounted() {
    if (process.client) {
      this.windowWidth = window.innerWidth

      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    }

    this.getSlides()
  },
  methods: {
    async getSlides() {
      this.slides = []
      const res = await this.$axios.get(`${this.$store.state.posts}?categories=7`)
      res.data.forEach((slide) => {
        this.slides.push({
          title: slide.title.rendered,
          img: slide.acf.logo,
          link: slide.acf.link,
        })
      })
    },
  },
  watch: {
    windowWidth(val) {
      if (val > 1279) {
        this.options.perPage = 4
      }
      if (val <= 1279) {
        this.options.perPage = 3
      }
      if (val <= 990) {
        this.options.perPage = 2
      }
      if (val <= 600) {
        this.options.perPage = 1.2
      }
    },
  },
}
</script>

<style lang="scss">
.vault {
  &__slider {
    .VueCarousel {
      &-wrapper {
        padding: 40px 0;
        margin-left: -12px;
        width: calc(100% + 24px);
        position: relative;
      }

      &-navigation {
        &-button {
          font-size: 18px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: $black !important;
          color: $white !important;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 10px;
          padding-bottom: 12px !important;
          opacity: 1;
          transition: all $transition;

          &:focus {
            outline: none !important;
          }
        }

        &-next {
          transform: translateX(50%) translateY(-50%) !important;
        }

        &-prev {
          transform: translateX(-50%) translateY(-50%) !important;
        }

        &--disabled {
          opacity: 0 !important;
        }
      }
    }

    .slide {
      transition: all $transition;
      padding: 0 12px;

      &__inner {
        position: relative;
        padding: 24px;
        min-height: 334px;
        overflow: hidden;
        transition: background $transition;
        text-decoration: none;
        display: block;
        border-radius: 16px;
        background: $white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        color: $black;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 304px;
          height: 304px;
          border-radius: 50%;
          background: $gray-4;
          transform: translate(80px, 100px);
          transition: background $transition;
        }

        &:hover {
          background: $primary;

          .slide__title {
            color: $white;
          }

          &:after {
            background: $white;
          }
        }
      }

      &__title {
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        transition: color $transition;
        position: relative;
        z-index: 1;
      }

      &__icon {
        position: absolute;
        z-index: 1;
        right: 45px;
        bottom: 40px;
        width: 100px;
        height: 100px;
      }
    }
  }

  &__services {
    margin-bottom: 92px;

    &-title {
      margin-bottom: 24px;
    }
  }
}

@media screen and (max-width: 600px) {
  .vault {
    &__slider {
      margin-left: -16px;
      .VueCarousel {
        width: 100vw;

        &-navigation {
          display: none;
        }

        &-wrapper {
          padding: 40px 12px;
          margin: 0;
          width: 100%;
        }

        &-inner {
          > :first-child {
            padding-left: 4px;
          }

          > :last-child {
            padding-right: 4px;
          }
        }
      }

      .slide {
        padding: 0 12px;
      }
    }

    &__services {
      &-title {
        margin-bottom: 0 !important;
      }
    }
  }
}
</style>
