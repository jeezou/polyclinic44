<template>
  <div class="news-page container">
    <bread-crumbs />
    <div class="news-page__header">
      <div class="news-page__title">Новости</div>
      <div class="news-page__sort">
        <div class="news-page__sort-title">Сортировать</div>
        <div class="news-page__sort-dps">
          <client-only>
            <date-picker
              format="D MMM YYYY"
              v-model="from"
              placeholder="Начало"
              class="news-page__sort-dp news-page__sort-dp--from"
            ></date-picker>
            <date-picker
              format="D MMM YYYY"
              v-model="to"
              placeholder="Конец"
              class="news-page__sort-dp news-page__sort-dp--to"
            ></date-picker>
          </client-only>
        </div>
        <div
          class="news-page__sort-reset"
          v-if="from || to"
          @click="
            from = null
            to = null
          "
        >
          Сбросить
        </div>
      </div>
    </div>
    <div class="news-page__content">
      <div class="news-page__cards">
        <news-card
          @click.native="onNewsClick(card)"
          v-for="(card, index) in news"
          :key="`news-page-card-${index}`"
          :data="card"
        ></news-card>
      </div>
      <div
        class="news-page__show-more light-btn"
        v-if="!noMore"
        @click="getNews"
        :class="{ 'light-btn--loading': loading }"
      >
        Показать еще
      </div>
      <modal-news :active="isModal" :data="current"></modal-news>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  components: {},
  meta: {
    crumb: 'Новости',
  },
  data() {
    return {
      isModal: false,
      loaded: false,
      loading: false,
      current: {},
      page: 1,
      noMore: false,
      news: [],

      from: null,
      to: null,
    }
  },
  mounted() {
    this.news = []
    this.getNews()
    const i = setInterval(() => {
      if (this.$route.query.id && this.loaded) {
        this.current = this.news.find((el) => el.id == this.$route.query.id)
        if (this.current) this.isModal = true
        else {
          this.$router.replace({
            name: this.$route.name,
            query: '',
          })
        }
        clearInterval(i)
      }
    }, 100)
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
    calculateTime(node) {
      const html = document.createElement('div')
      html.innerHTML = node
      const rawText = html.innerText || html.textContent
      return Math.ceil(
        rawText.length / 1500 +
          Array.from(html.querySelectorAll('img')).length * 0.2
      )
    },
    getTags(post, tags) {
      const arr = []
      post.tags.forEach((tag) => {
        const found = tags.data.find((el) => el.id === tag)
        if (found) arr.push(found.name)
      })
      return arr
    },
    validDate(param, date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}T${
        param === 'from' ? '00:00:00' : '23:59:59'
      }`
    },
    getFilteredNews() {
      this.news = []
      this.$axios
        .get(
          `${this.$store.state.posts}?categories=4${
            this.from ? `&after=${this.validDate('from', this.from)}` : ''
          }${this.to ? `&before=${this.validDate('to', this.to)}` : ''}`,
          {
            params: {
              order: 'desc',
              orderby: 'date',
            },
          }
        )
        .then((res) => {
          this.$axios.get(`${this.$store.state.tags}`).then((tags) => {
            res.data.forEach((post, index) => {
              this.news.push({
                id: post.id,
                title: post.title.rendered,
                content: post.acf.content,
                date: this.getDate(post.date),
                time: `${this.calculateTime(post.acf.content)} мин`,
                tags: this.getTags(post, tags),
              })
            })
          })
        })
    },
    getNews() {
      this.loading = true
      this.$axios
        .get(
          `${this.$store.state.posts}?categories=4&per_page=4&page=${this.page}`,
          {
            params: {
              order: 'desc',
              orderby: 'date',
            },
          }
        )
        .then((res) => {
          this.$axios.get(`${this.$store.state.tags}`).then((tags) => {
            res.data.forEach((post, index) => {
              this.news.push({
                id: post.id,
                title: post.title.rendered,
                content: post.acf.content || post.content.rendered,
                date: this.getDate(post.date),
                time: `${this.calculateTime(post.acf.content || post.content.rendered)} мин`,
                tags: this.getTags(post, tags),
              })

              if (index === res.data.length - 1) {
                this.loading = false
                if (!this.loaded) this.loaded = true
              }
            })
            this.page += 1
          })
        })
        .catch((e) => {
          this.noMore = true
        })
    },
    onNewsClick(card) {
      this.$router
        .replace({
          name: this.$route.name,
          query: { ...this.$route.query, id: card.id },
        })
        .catch(() => {})
      this.isModal = true
      this.current = card
    },
  },
  watch: {
    '$route.query.id': {
      handler(val) {
        val ? (this.isModal = true) : (this.isModal = false)
      },
    },
    from(val) {
      if (val === null && this.to === null) {
        this.news = []
        this.page = 1
        this.getNews()
        this.noMore = false
      } else {
        this.noMore = true
        this.getFilteredNews()
      }
    },
    to(val) {
      if (val === null && this.from === null) {
        this.news = []
        this.page = 1
        this.getNews()
        this.noMore = false
      } else {
        this.noMore = true
        this.getFilteredNews()
      }
    },
  },
}
</script>

<style lang="scss">
.news-page {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__header {
    margin: 24px 0 40px;
    display: flex;
    justify-content: space-between;
    column-gap: 32px;
  }

  &__sort {
    display: flex;
    column-gap: 28px;
    align-items: center;

    &-title,
    &-reset {
      font-weight: 600;
      font-size: 16px;
    }

    &-reset {
      color: $primary;
      transition: all $transition;
      cursor: pointer;

      &:hover {
        color: rgba($primary, 0.8);
      }
    }

    &-dps {
      display: flex;
      column-gap: 16px;
    }

    .mx {
      &-datepicker-main {
        border-radius: 12px;
      }

      &-input {
        padding: 12px 16px 12px 48px;
        border: none;
        box-shadow: none;
        height: 48px;
        border-radius: 12px;

        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: $gray-1;

        &::placeholder {
          font-family: 'Gilroy';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          color: $gray-1;
        }

        &-wrapper {
          &:before {
            content: '';
            position: absolute;
            left: 16px;
            top: 12px;
            width: 24px;
            height: 24px;
            background: url(@/assets/images/icons/calendar.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            opacity: 0.8;
          }
        }
      }

      &-icon-calendar {
        display: none;
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
  }

  &__card {
    min-height: 300px;
    background: $white;
    border-radius: 24px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all $transition;
    cursor: pointer;
    text-decoration: none;
    color: $black;

    &:hover {
      background: $primary;
      .news-page__card {
        &-title {
          color: $white;
        }

        &-date,
        &-time {
          color: $white;

          svg path {
            stroke: $white;
          }
        }
      }
    }

    &-title {
      font-weight: 500;
      font-size: 24px;
      line-height: 140%;
      max-width: 550px;
      transition: all $transition;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      &-left,
      &-right {
        display: flex;
        column-gap: 16px;
      }
    }

    &-date,
    &-time {
      display: flex;
      align-items: center;
      column-gap: 8px;

      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: $gray-2;
      transition: all $transition;

      svg {
        width: 24px;
        height: 24px;

        path {
          stroke: $gray-2;
          stroke-width: 1.1px;
          transition: stroke $transition;
        }
      }
    }

    &-time {
      svg path {
        stroke-width: 1.6px;
      }
    }

    &-tag {
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      padding: 6px 23px;
      border-radius: 29px;
      background: $gray-3;
    }
  }
}

@media screen and (max-width: 991px) {
  .news-page {
    &__cards {
      grid-template-columns: 1fr;
    }

    &__header {
      flex-direction: column;
      row-gap: 32px;
    }
  }
}

@media screen and (max-width: 768px) {
  .news-page {
    &__sort {
      flex-direction: column;
      row-gap: 24px;
      align-items: flex-start;

      &-title {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .news-page {
    &__sort {
      &-dps {
        flex-direction: column;
        width: 100%;
        row-gap: 12px;
      }

      &-dp {
        width: 100%;
      }
    }
  }
}
</style>
