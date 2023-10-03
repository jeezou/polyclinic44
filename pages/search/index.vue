<template>
  <div class="search container">
    <bread-crumbs />
    <div class="search__title">Результаты поиска</div>
    <div class="search__header">
      <div class="search__input-wrapper">
        <img
          src="@/assets/images/icons/search.svg"
          alt="srch ico"
          class="search__input-icon"
        />
        <input
          type="text"
          class="search__input"
          placeholder="Что будем искать?"
          v-model="search"
          @keyup.enter="onSearch"
        />
      </div>
      <div class="search__submit" @click="onSearch">Начать поиск</div>
    </div>
    <docs-block
      class="search__docs"
      :title="'Врачи'"
      :extDocs="docs"
      :extOptions="options"
      :isSearch="false"
      :isPage="true"
      :isMore="false"
      :isNum="true"
      v-if="docs.length"
    />
    <div class="search__news" v-if="news.length">
      <div class="search__news-title">Новости</div>
      <div class="search__news-num">Результаты поиска: {{ news.length }}</div>
      <div class="search__news-grid">
        <news-card
          v-for="(card, index) in news"
          :key="`search-page-news-${index}`"
          :data="card"
          @click.native="
            $router.push({ path: '/patient/news', query: { id: card.id } })
          "
        />
      </div>
    </div>
    <div class="search__empty" v-if="!news.length && !docs.length">
      Сожалеем, но по-вашему запросу ничего не найдено
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  components: {},
  meta: {
    crumb: 'Поиск',
  },
  data() {
    return {
      docs: [],
      news: [],
      options: [],

      search: '',
    }
  },
  mounted() {
    this.search = this.$route.query.query
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    onSearch() {
      if (this.search) {
        this.$router.push({ path: '/search', query: { query: this.search } })
      }
    },
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
    async getData() {
      let res = await this.$axios.get(
        `${this.$store.state.posts}?categories=4,8&search=${this.$route.query.query}`
      )
      res = res.data

      res.forEach((post) => {
        if (post.categories.find((el) => el === 8)) {
          this.docs.push({
            img: post.acf.avatar.url,
            name: post.title.rendered,
            post: post.acf.speciality,
            cab: post.acf.cab,
            id: post.id,
          })

          if (!this.options.find((el) => el === post.acf.speciality))
            this.options.push(post.acf.speciality)
        }

        if (post.categories.find((el) => el === 4)) {
          this.$axios.get(`${this.$store.state.tags}`).then((tags) => {
            this.news.push({
              id: post.id,
              title: post.title.rendered,
              content: post.acf.content,
              date: this.getDate(post.date),
              time: `${this.calculateTime(post.acf.content)} мин`,
              tags: this.getTags(post, tags),
            })
          })
        }
      })

      this.options.sort()
    },
  },
  watch: {
    '$route.query.query': {
      handler() {
        this.docs = []
        this.news = []
        this.getData()
      },
    },
  },
}
</script>

<style lang="scss">
.search {
  padding-top: 192px;

  &__header {
    display: flex;
    align-items: center;
    column-gap: 24px;
  }

  &__input {
    border: none;
    outline: none;
    width: 100%;
    background: transparent;

    font-weight: 500;
    font-size: 16px;

    &::placeholder {
      font-weight: 500;
      font-size: 16px;
      font-family: 'Gilroy';
    }
    &-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      column-gap: 16px;
      padding: 12px 16px;
      border-radius: 12px;
      background: $white;
    }
  }

  &__submit {
    padding: 14px 26px;
    font-weight: 600;
    font-size: 16px;
    color: $white;
    border-radius: 12px;
    background: $black;
    white-space: nowrap;
    text-align: center;
    transition: all $transition;
    cursor: pointer;

    &:hover {
      background: rgba($black, 0.9);
    }
  }

  &__empty {
    height: 50vh;
    min-height: 300px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    padding-bottom: 40px;

    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    color: $gray-1;
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    margin: 24px 0 40px;
  }

  &__docs {
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    margin-bottom: 100px;

    .docs {
      &__title {
        margin: 48px 0 24px;
        font-size: 28px;
        line-height: 120%;
      }
    }
  }

  &__news {
    margin-bottom: 100px;
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    &-title {
      margin-bottom: 24px;
      font-weight: 600;
      font-size: 28px;
      line-height: 120%;
    }

    &-num {
      font-weight: 400;
      font-size: 16px;
      color: $gray-1;
      margin-bottom: 32px;
    }

    &-grid {
      display: grid;
      gap: 24px;
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media screen and (max-width: 991px) {
  .search {
    &__news {
      &-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .search {
    &__docs {
      margin-top: 40px;
    }
  }
}

@media screen and (max-width: 480px) {
  .search {
    &__header {
      flex-direction: column;
      row-gap: 12px;
    }

    &__submit {
      width: 100%;
    }
  }
}
</style>
