<template>
  <div
    class="main-page container"
    :class="{ 'main-page--alert': $store.state.isAlert }"
  >
    <div class="main-page__slider" v-if="windowWidth <= 768">
      <client-only>
        <carousel v-bind="options">
          <slide
            v-for="(slide, index) in slides"
            :key="`main-page-slide-${index}`"
            class="slide"
          >
            <div
              @click="slide.handler"
              v-if="slide.type === 'modal'"
              class="slide__inner"
            >
              <div class="slide__title">{{ slide.title }}</div>
              <img
                :src="require(`@/assets/images/main-header/${slide.img}`)"
                class="slide__icon"
              />
            </div>
            <nuxt-link :to="slide.link" class="slide__inner block" v-else>
              <div class="slide__title">{{ slide.title }}</div>
              <img
                :src="require(`@/assets/images/main-header/${slide.img}`)"
                :alt="`slide image ${index}`"
                class="slide__icon"
              />
            </nuxt-link>
          </slide>
        </carousel>
      </client-only>
    </div>
    <div class="main-page__header">
      <div
        class="main-page__header-item-wrapper"
        v-for="(card, index) in slides"
        :key="`main-page-header-${index}`"
      >
        <div
          @click="card.handler"
          v-if="card.type === 'modal'"
          class="main-page__header-item"
        >
          <div class="main-page__header-item-title">{{ card.title }}</div>
          <img
            :src="require(`@/assets/images/main-header/${card.img}`)"
            class="main-page__header-item-icon"
          />
        </div>
        <nuxt-link :to="card.link" v-else class="main-page__header-item">
          <div class="main-page__header-item-title">{{ card.title }}</div>
          <img
            :src="require(`@/assets/images/main-header/${card.img}`)"
            class="main-page__header-item-icon"
          />
        </nuxt-link>
      </div>
    </div>
    <div
      class="main-page__intro"
      v-if="Object.keys(article).length && last.length"
    >
      <div class="main-page__imp block">
        <div class="main-page__imp-title">Важные новости</div>
        <nuxt-link :to="article.link" class="main-page__imp-article">
          <div class="main-page__imp-article-tag">{{ article.tag }}</div>
          <div class="main-page__imp-article-title" v-html="article.title" />
          <div class="main-page__imp-article-par" v-html="article.par" />
        </nuxt-link>
      </div>
      <div class="main-page__last block">
        <div class="main-page__last-header">
          <div class="main-page__last-title">Последние события</div>
          <nuxt-link to="/patient/news" class="main-page__last-link link"
            >Посмотреть все
          </nuxt-link>
        </div>
        <div class="main-page__last-list">
          <nuxt-link
            :to="item.link"
            class="main-page__last-item"
            v-for="(item, index) in last"
            :key="`main-page-last-list-item-${index}`"
          >
            <div class="main-page__last-item-title" v-html="item.title" />
            <div class="main-page__last-item-date">{{ item.date }}</div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- <div class="main-page__dirs">
      <div class="main-page__dirs-title section-title">Направления</div>
      <div class="main-page__dirs-blocks">
        <div class="main-page__dirs-alph-wrapper">
          <div class="main-page__dirs-alph-title">
            Выберите специалиста по алфавиту
          </div>
          <div class="main-page__dirs-alph">
            <div
              class="main-page__dirs-alph-item"
              v-for="(symbol, index) in Object.keys(alph)"
              :key="`main-page-alph-symbol-${index}`"
              :class="{
                'main-page__dirs-alph-item--active': symbol === activeAlph,
              }"
              @click="onAlphClick(symbol)"
            >
              {{ symbol }}
            </div>
          </div>
        </div>
        <div
          class="main-page__dirs-list-wrapper"
          :class="[
            {
              'main-page__dirs-list-wrapper--mobile': windowWidth <= 600,
            },
            {
              'main-page__dirs-list-wrapper--active': isList,
            },
          ]"
        >
          <div class="main-page__dirs-list-header">
            <div class="main-page__dirs-list-title">Список специалистов</div>
            <div class="main-page__dirs-list-close" @click="isList = false">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.2567 5.74381C18.6673 6.15445 18.6674 6.82024 18.2567 7.23087L7.23114 18.2565C6.82049 18.6671 6.1547 18.6671 5.74406 18.2565C5.33341 17.8458 5.33341 17.18 5.74405 16.7694L16.7696 5.74379C17.1803 5.33315 17.8461 5.33318 18.2567 5.74381Z"
                  fill="#292C33"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.2564 18.2562C17.8458 18.6669 17.18 18.6669 16.7694 18.2562L5.74378 7.23065C5.33314 6.82001 5.33314 6.15422 5.74379 5.74357C6.15443 5.33292 6.82022 5.33292 7.23087 5.74357L18.2565 16.7692C18.6671 17.1798 18.6671 17.8456 18.2564 18.2562Z"
                  fill="#292C33"
                />
              </svg>
            </div>
          </div>
          <div
            class="main-page__dirs-letter"
            v-if="windowWidth <= 600"
            @click="isList = false"
          >
            {{ activeAlph }}
          </div>
          <div class="main-page__dirs-list">
            <div
              class="main-page__dirs-list-item"
              v-for="(item, index) in Object.keys(alph[activeAlph])"
              :key="`main-page-alph-list-item-${index}`"
            >
              <div
                class="main-page__dirs-list-item-header"
                @click="onAccordClick"
              >
                <div class="main-page__dirs-list-item-num">
                  {{ index + 1 >= 10 ? index + 1 : `0${index + 1}` }}
                </div>
                <div class="main-page__dirs-list-item-title">{{ item }}</div>
                <img
                  src="@/assets/images/icons/accordion-arrow.svg"
                  alt="accord-icon"
                  class="main-page__dirs-list-item-arrow"
                />
              </div>
              <div class="sublist">
                <div
                  class="sublist__item"
                  v-for="(subItem, subIndex) in alph[activeAlph][item]"
                  :key="`main-page-alph-list-sub-item-${subIndex}`"
                >
                  <img
                    :src="require(`@/assets/images/alph/${subItem.img}`)"
                    alt=""
                    class="sublist__item-image"
                  />
                  <div class="sublist__item-name">{{ subItem.name }}</div>
                  <div class="sublist__item-cabinet">
                    <span>{{ subItem.cabinet }}</span
                    >кабинет
                  </div>
                  <div class="sublist__item-more">Подробнее</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="main-page__dirs-change"
            v-if="windowWidth <= 600"
            @click="isList = false"
          >
            Изменить букву
          </div>
        </div>
      </div>
    </div> -->
    <!-- <docs-block :isSearch="false" /> -->
    <div class="main-page__poster">
      <div class="main-page__poster-content">
        <img
          src="@/assets/images/gosuslugi-logo.png"
          alt="gosuslugi logo"
          class="main-page__poster-content-logo"
        />
        <div class="main-page__poster-content-title">
          Не убран мусор, яма на дороге, не горит фонарь?
        </div>
        <div class="main-page__poster-content-subtitle">
          Столкнулись с проблемой - сообщите о ней!
        </div>
        <a
          href="https://www.gosuslugi.ru/"
          target="_blank"
          class="main-page__poster-content-btn dark-btn"
        >
          Сообщить о проблеме
        </a>
      </div>
      <img
        src="@/assets/images/main-poster.png"
        alt="main-poster"
        class="main-page__poster-img"
      />
    </div>
    <div
      class="list-blackout"
      :class="{ 'list-blackout--active': isList }"
      @click="isList = false"
    ></div>
    <modal-appointment
      :active="isAppointmentModal"
      @close="isAppointmentModal = false"
    />
    <modal-call :active="isCallModal" @close="isCallModal = false" />
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  meta: {
    crumb: 'Главная',
  },
  components: {},
  data() {
    return {
      slides: [
        {
          title: 'Записаться к врачу',
          img: '1.png',
          type: 'modal',
          link: '',
          handler: () => {
            this.isAppointmentModal = true
          },
        },
        {
          title: 'Расписание работы врачей',
          img: '2.png',
          link: '/schedule',
        },
        {
          title: 'Вызов врача на дом',
          img: '3.png',
          link: '#',
          type: 'modal',
          handler: () => {
            this.isCallModal = true
          },
        },
        {
          title: 'График работы дежурных врачей и травматология',
          img: '4.png',
          link: '/weekend-schedule',
        },
        {
          title: 'Режим работы прививочного и процедурного кабинета',
          img: '5.png',
          link: '/vaccination',
        },
        {
          title: 'Медицинские справки',
          img: '7.png',
          link: '/med-certificates',
        },
        {
          title: 'Консультативно-диагностический центр',
          img: '6.png',
          link: '/diagnostic-center',
        },
        {
          title: 'Отделение медицинской реабилитации',
          img: '8.png',
          link: '/rehabilitation',
        },
      ],

      article: {
        // tag: 'Важно',
        // title: 'Доводим до Вашего внимания информацию!',
        // par: 'Наша поликлиника переходит на ведение медицинской документации в электронной форме.Врачи на приёмах вносят запись осмотра в электронный медицинский документ и необходимости в медицинских картах на бумажном носителе НЕТ! В связи с этим, при посещении нашего учреждения, подходить за медицинской картой в регистратуру НЕ НУЖНО. Для Вашего удобства в холле (рядом с регистратурой) расположено электронное табло',
        // link: '/patient/news?id=3',
        // external: false,
      },

      last: [
        // {
        //   title: 'Закон СПб от 26.12.2014 N 715-134',
        //   date: '25 июн 2022',
        //   // link: 'https://peterburg-pravo.ru/zakon/2014/12/26/n-715-134/',
        //   link: '/patient/news?id=0',
        //   external: false,
        // },
        // {
        //   title: 'Распоряжение Правительства РФ N2782-р',
        //   date: '25 июн 2022',
        //   // link: 'http://www.consultant.ru/document/cons_doc_LAW_173220/',
        //   link: '/patient/news?id=1',
        //   external: false,
        // },
      ],

      options: {
        loop: false,
        perPage: 4,
        scrollPerPage: false,
        navigationEnabled: true,
        paginationEnabled: false,
        navigationNextLabel: '→',
        navigationPrevLabel: '←',
      },

      alph: {
        а: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        д: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        з: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        л: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        м: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        н: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        о: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        р: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
        у: {
          Невролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          'Невролог (невропатолог)': [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
          Нефролог: [
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
            {
              name: 'Трусова Евгения Вальеревна',
              cabinet: '303',
              img: '1.png',
            },
          ],
        },
      },

      activeAlph: 'н',

      windowWidth: 9999,

      isList: false,
      isAppointmentModal: false,
      isCallModal: false,
    }
  },
  mounted() {
    if (process.client) {
      this.windowWidth = window.innerWidth

      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })

      this.getLastNews()
      this.getImportant()

      if (this.$route.query.menu) {
        this.$store.commit('openMetaMenu', this.$route.query.menu)
      }
    }
  },
  beforeUnmount() {},
  methods: {
    getDate(d) {
      const months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'мая',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
      ]
      const date = new Date(d)
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`
    },
    async getImportant() {
      const impRes = await this.$axios.get(`${this.$store.state.posts}/64`)
      const impId = impRes.data.acf.post[0]
      const important = await this.$axios.get(
        `${this.$store.state.posts}/${impId}`
      )

      this.article = {
        tag: 'Важно',
        title: impRes.data.acf.title
          ? impRes.data.acf.title
          : important.data.title.rendered,
        par: impRes.data.acf.text
          ? impRes.data.acf.text
          : important.data.acf.content,
        link: `/patient/news?id=${important.data.id}`,
        external: false,
      }
    },
    async getLastNews() {
      this.last = []
      const res = await this.$axios.get(
        `${this.$store.state.posts}?categories=4&per_page=3&page=1`,
        {
          params: {
            order: 'desc',
            orderby: 'date',
          },
        }
      )
      const important = await this.$axios.get(`${this.$store.state.posts}/64`)
      res.data.forEach((post, index) => {
        if (post.id !== important.data.acf.post[0] && this.last.length < 2) {
          this.last.push({
            title: post.title.rendered,
            date: this.getDate(post.date),
            // link: 'http://www.consultant.ru/document/cons_doc_LAW_173220/',
            link: `/patient/news?id=${post.id}`,
            external: false,
          })
        }
      })
    },
    onAlphClick(symbol) {
      if (this.windowWidth <= 600) {
        this.isList = true
      }
      this.activeAlph = symbol
    },
    onAccordClick(e) {
      document
        .querySelectorAll('.main-page__dirs-list-item--active')
        .forEach((el) => {
          if (e.target.closest('.main-page__dirs-list-item') !== el)
            el.classList.remove('main-page__dirs-list-item--active')
        })
      e.target
        .closest('.main-page__dirs-list-item')
        .classList.toggle('main-page__dirs-list-item--active')
    },
  },
  watch: {
    windowWidth(val) {
      if (val <= 768) {
        this.options.perPage = 2.2
      }
      if (val <= 600) {
        this.options.perPage = 1.2
      }

      if (val > 600) {
        this.isList = false
      }
    },
    isList(val) {
      if (val) {
        document.body.style.cssText = 'overflow: hidden;'
      } else {
        document.body.removeAttribute('style')
      }
    },
  },
}
</script>

<style lang="scss">
.main-page {
  padding-top: 120px;

  &--alert {
    padding-top: 200px;
  }

  &__slider {
    .VueCarousel {
      &-wrapper {
        padding: 40px 0;
        margin-left: -12px;
        width: calc(100% + 24px);
      }

      &-navigation {
        &-button {
          font-size: 18px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: $black;
          color: $white;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 10px;
          padding-bottom: 12px !important;
          opacity: 1;
          transition: all $transition;

          &:focus {
            outline: none;
          }
        }

        &-next {
          transform: translateX(50%) translateY(-50%);
        }

        &-prev {
          transform: translateX(-50%) translateY(-50%);
        }

        &--disabled {
          opacity: 0;
        }
      }
    }

    .slide {
      transition: all $transition;
      padding: 0 12px;

      &__inner {
        position: relative;
        padding: 24px;
        min-height: 211px;
        overflow: hidden;
        transition: background $transition;
        cursor: pointer;
        text-decoration: none;
        display: block;
        border-radius: 16px;
        background: $white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        color: $black;

        &:hover {
          background: $primary;

          .slide__title {
            color: $white;
          }
        }
      }

      &__title {
        font-weight: 600;
        font-size: 18px;
        line-height: 23px;
        transition: color $transition;
      }

      &__icon {
        position: absolute;
        width: 50%;
        max-width: 200px;
        right: 0;
        bottom: 0;
        // transform: translate(-10%, 25%);
      }
    }
  }

  &__header {
    padding-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    &-item {
      color: $black;
      text-decoration: none;
      transition: all $transition;
      padding: 24px 24px 0 24px;
      width: 100%;
      height: 100%;
      display: block;
      cursor: pointer;
      position: relative;
      z-index: 2;

      &:after {
        content: '';
        width: 300px;
        height: 300px;
        position: absolute;
        right: -90px;
        bottom: -170px;
        background: $white;
        border-radius: 50%;
        z-index: 0;
      }

      &-wrapper {
        width: 100%;
        height: 211px;
        position: relative;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        overflow: hidden;
        background: $white;
      }

      &:hover {
        background: $primary;
        color: $white;
      }

      &-icon {
        position: absolute;
        bottom: 0;
        right: 24px;
        z-index: 1;
      }

      &-title {
        font-weight: 600;
        font-size: 18px;
        line-height: 128%;
        letter-spacing: 0.39px;
        position: relative;
        z-index: 3;
      }
    }
  }

  &__intro {
    display: grid;
    grid-template-columns: 5fr 3fr;
    column-gap: 24px;
    padding-bottom: 90px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    padding-top: 80px;
    // margin-top: 90px;
    // border-top: 1px solid rgba($gray-2, 0.4);
  }

  &__imp {
    &-article {
      margin-top: 32px;
      padding: 24px;
      background: $gray-3;
      border-radius: 16px;

      &-tag {
        color: $red;
        background: $secondary-red;
        width: fit-content;
        border-radius: 100px;
        padding: 6px 24px;
        margin-bottom: 24px;
      }

      &-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 16px;
      }

      &-par {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: $gray-1;
        min-height: 125px;
        max-height: 125px;

        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        p {
          max-width: 100%;
          img {
            max-width: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  &__last {
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      justify-content: space-between;
      column-gap: 24px;
      margin-bottom: 32px;
      align-items: flex-end;

      a {
        margin-bottom: 4px;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      row-gap: 24px;
      height: 100%;
    }

    &-item {
      padding: 24px;
      height: 100%;
      background: $gray-3;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-title {
        font-weight: 600;
        font-size: 16px;
        line-height: 28px;
      }

      &-date {
        font-weight: 500;
        font-size: 12px;
        line-height: 28px;
        color: $gray-2;
      }
    }
  }

  &__imp,
  &__last {
    padding: 36px 32px;
    background: $white;
    border-radius: 24px;

    &-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
    }

    &-item {
      text-decoration: none;
      color: $black;
    }

    &-article {
      display: block;
      text-decoration: none;
      color: $black;
    }
  }

  &__dirs {
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      margin: 100px 0 64px;
    }

    &-blocks {
      display: grid;
      grid-template-columns: 3fr 5fr;
      column-gap: 24px;
    }

    &-alph,
    &-list {
      &-wrapper {
        background: $white;
        padding: 32px;
        border-radius: 24px;
      }
    }

    &-alph {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;

      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 24px;
      }

      &-item {
        height: 100px;
        background: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        font-weight: 600;
        font-size: 32px;
        line-height: 32px;
        text-transform: uppercase;
        transition: all $transition;
        cursor: pointer;

        &:hover,
        &--active {
          background: $primary;
          color: $white;
        }
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      row-gap: 24px;

      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      &-close {
        display: none;
        align-items: center;
        justify-content: center;
        padding: 4px;
        background: $gray-4;
        border-radius: 8px;

        svg {
          width: 24px;
          height: 24px;
        }
      }

      &-wrapper {
        max-height: 468px;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          display: none;
        }

        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      &-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 32px;
      }

      &-item {
        padding: 20px;
        border-radius: 16px;
        background: #f0f0f0;
        display: flex;
        flex-direction: column;
        row-gap: 24px;
        max-height: 64px;
        overflow: hidden;
        transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

        &--active {
          max-height: 2000px;
          transition: max-height 1s ease-in-out;

          .main-page__dirs-list-item-arrow {
            transform: rotate(180deg);
          }
        }

        &-header {
          display: flex;
          justify-content: space-between;
          column-gap: 16px;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        &-title {
          width: 100%;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
        }

        &-num {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: $primary;
        }

        &-arrow {
          transition: all $transition;
        }

        .sublist {
          display: flex;
          flex-direction: column;
          row-gap: 16px;

          &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            column-gap: 16px;
            padding: 12px 16px;
            background: $black;
            color: $white;
            border-radius: 16px;

            &-cabinet {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: flex-end;

              span {
                font-weight: 600;
                font-size: 24px;
                line-height: 22px;
                margin-right: 8px;
              }
            }

            &-image {
              width: 48px;
              height: 48px;
              border-radius: 8px;
            }

            &-name {
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
              min-width: 200px;
            }

            &-more {
              background: $white;
              color: $black;
              padding: 14px 30px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  &__poster {
    margin: 100px 0;
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    column-gap: 24px;
    background: linear-gradient(95.42deg, #36b0f5 2.56%, #0f7ab6 113.82%);
    overflow: hidden;

    &-content {
      padding: 48px;
      color: $white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-logo {
        display: none;
      }

      &-title {
        font-weight: 600;
        font-size: 40px;
        line-height: 48px;
        max-width: 640px;
      }

      &-subtitle {
        font-weight: 400;
        font-size: 24px;
        line-height: 48px;
      }

      &-btn {
        max-width: 286px;
      }
    }

    &-img {
      max-height: 350px;
      object-fit: contain;
    }
  }
}

.list-blackout {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);

  opacity: 0;
  visibility: hidden;

  transition: all $transition;

  &--active {
    opacity: 1;
    visibility: visible;
  }
}

@media screen and (max-width: 1279px) {
  .main-page {
    &__header {
      &-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &:after {
          bottom: -190px;
          right: -120px;
        }

        &-title {
          font-size: 16px;
        }

        &-icon {
          width: 148px;
          align-self: flex-end;
          position: relative;
          right: -24px;
        }
      }
    }

    &__intro {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    &__dirs {
      &-blocks {
        grid-template-columns: 1fr 1fr;
      }

      &-list {
        &-item {
          .sublist {
            &__item {
              justify-content: flex-start;

              &-cabinet {
                display: none;
              }

              &-more {
                display: none;
              }
            }
          }
        }
      }
    }

    &__poster {
      &-content {
        display: flex;
        flex-direction: column;
        row-gap: 32px;

        &-title {
          max-width: unset;
        }

        &-btn {
          margin-top: 8px;
        }

        &-logo {
          display: block;
          max-width: 300px;
        }
      }

      &-img {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 990px) {
  .main-page {
    &__header {
      gap: 16px;

      &-item {
        padding: 16px 16px 0 16px;
        row-gap: 32px;

        &:after {
          width: 250px;
          height: 250px;
          right: -100px;
          bottom: -150px;
        }

        &-wrapper {
          height: unset;
        }

        &-title {
          font-size: 13px;
        }

        &-icon {
          width: 110px;
          right: 0;
        }
      }
    }

    &__dirs {
      &-blocks {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      &-list {
        &-item {
          .sublist {
            &__item {
              &-cabinet {
                display: flex;
              }

              &-name {
                min-width: unset;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .main-page {
    &__slider {
      width: 100vw;
      margin-left: -50px;

      .VueCarousel {
        width: 100vw;

        &-navigation {
          display: none;
        }

        &-wrapper {
          padding: 40px 50px 10px;
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

        &__inner {
          min-height: 180px;
          display: flex;
          flex-direction: column;
          row-gap: 24px;
        }

        &__icon {
          max-width: 121px;
        }
      }
    }

    &__header {
      display: none;
    }

    &__dirs {
      &-blocks {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      &-list {
        &-item {
          .sublist {
            &__item {
              justify-content: flex-start;

              &-cabinet {
                display: none;
              }

              &-more {
                display: none;
              }

              &-name {
                min-width: unset;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .main-page {
    padding-top: 100px;

    &--alert {
      padding-top: 180px;
    }

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

        &__inner {
          min-height: 160px;
        }

        &__icon {
          max-width: 121px;
        }
      }
    }

    &__intro {
      border: none;
      margin-bottom: 48px;
      padding-bottom: 0;
      padding-top: 0;
    }

    &__imp,
    &__last {
      padding: 24px;

      &-title {
        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
      }

      &-header {
        margin-bottom: 16px;
      }
    }

    &__last {
      &-link {
        display: none;
      }
    }

    &__imp {
      &-article {
        margin-top: 16px;
        padding: 16px;

        &-tag {
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          padding: 6px 24px;
        }

        &-title {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 16px;
        }

        &-par {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          min-height: 88px;
          max-height: 88px;
          -webkit-line-clamp: 4;
        }
      }
    }

    &__dirs {
      border-bottom: none;
      padding-bottom: 48px;

      &-alph {
        gap: 16px;

        &-wrapper {
          padding: 24px;
        }

        &-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
        }

        &-item {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          height: 88px;
        }
      }

      &-list {
        &-wrapper {
          &--mobile {
            z-index: 999999999;
            position: fixed;
            top: 16px;
            left: 16px;
            width: calc(100vw - 32px);
            height: calc(100vh - 16px);
            max-height: unset;
            border-radius: 24px 24px 0 0;
            transform: translateY(100%);
            visibility: hidden;
            transition: all 0.35s ease;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;

            .main-page__dirs-list {
              margin-bottom: 24px;
            }
          }

          &--active {
            visibility: visible;
            transform: translateY(0);
          }
        }

        &-close {
          display: flex;
        }
      }

      &-letter {
        font-weight: 600;
        font-size: 40px;
        line-height: 32px;
        background: $gray-4;
        border-radius: 16px;
        width: fit-content;
        margin: 0px auto 40px;
        min-width: 100px;
        min-height: 100px;
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
      }

      &-change {
        width: 100%;
        padding: 22px 0;
        background: $primary;
        color: $white;

        font-weight: 600;
        font-size: 16px;
        line-height: 20px;

        border-radius: 16px;
        text-align: center;
        margin-top: 24px;
        margin: auto 0 0 0;
      }
    }

    &__poster {
      margin: 48px 0;
      padding: 24px;

      &-content {
        padding: 0;
        align-items: flex-start;
        row-gap: 0;

        &-logo {
          height: 24px;
          object-fit: contain;
          margin-bottom: 56px;
        }

        &-title {
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          margin-bottom: 16px;
        }

        &-subtitle {
          font-weight: 400;
          font-size: 18px;
          line-height: 32px;
          margin-bottom: 24px;
        }
      }
    }
  }
}
</style>
