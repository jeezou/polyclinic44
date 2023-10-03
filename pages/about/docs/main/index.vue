<template>
  <div class="main-docs-page__wrapper">
    <div class="main-docs-page__header page-header">
      <div class="page-header__inner container">
        <div class="page-header__left">
          <bread-crumbs />
          <div class="page-header__title">Администрация</div>
        </div>
        <div class="page-header__right">
          <img
            src="@/assets/images/page-circle.svg"
            alt="header page circle"
            class="page-header__right-circle"
          />
          <img
            src="@/assets/images/main-docs-header.png"
            alt="header page docs image"
            class="page-header__right-image"
          />
        </div>
      </div>
    </div>
    <div class="main-docs-page container">
      <div class="main-docs-page__title page-subtitle">
        Главный врач поликлиники
      </div>
      <div class="main-docs-card main-docs-card--bigger">
        <img
          :src="main.img ? main.img : require('@/assets/images/noimage.png')"
          alt="main doc"
          class="main-docs-card__img"
          :class="{ 'main-docs-card__img--noimage': !main.img }"
        />
        <div class="main-docs-card__content">
          <div class="main-docs-card__name">
            {{ main.name }}
          </div>
          <div class="main-docs-card__post">{{ main.post }}</div>
          <div class="main-docs-card__grid">
            <span v-if="main.time">Часы приема: </span>
            <div class="main-docs-card__time" v-if="main.time">
              {{ main.time }}
            </div>
            <span v-if="main.phone">Телефон: </span>
            <div class="main-docs-card__phone" v-if="main.phone">
              {{ main.phone }}
            </div>
            <span v-if="main.cab">Кабинет: </span>
            <div class="main-docs-card__cab" v-if="main.cab">
              {{ main.cab }}
            </div>
            <span v-if="main.email">Почта: </span>
            <div class="main-docs-card__email" v-if="main.email">
              {{ main.email }}
            </div>
          </div>
        </div>
        <!-- <div class="main-docs-card__btn light-btn">Подробнее</div> -->
      </div>
      <accordion-component>
        <template #content>
          <!-- <div class="main-docs-page__article-title" v-html="article.title" /> -->
          <div class="main-docs-page__article-content" v-html="article" />
        </template>
      </accordion-component>
      <div class="main-docs-page__admins">
        <div class="main-docs-page__admins-title section-title">
          Администрация поликлиники
        </div>
        <div class="main-docs-page__admins-grid">
          <div
            class="main-docs-card"
            v-for="(card, index) in admins"
            :key="`main-docs-page-card-${index}`"
          >
            <img
              :src="
                card.img ? card.img : require('@/assets/images/noimage.png')
              "
              alt="main doc"
              class="main-docs-card__img"
              :class="{ 'main-docs-card__img--noimage': !card.img }"
            />
            <div class="main-docs-card__content">
              <div class="main-docs-card__name">{{ card.name }}</div>
              <div class="main-docs-card__post">{{ card.post }}</div>
              <div class="main-docs-card__grid">
                <span v-if="card.time">Часы приема: </span>
                <div class="main-docs-card__time" v-if="card.time">
                  {{ card.time }}
                </div>
                <span v-if="card.phone">Телефон: </span>
                <div v-if="card.phone" class="main-docs-card__phone">
                  {{ card.phone }}
                </div>
                <span v-if="card.cab">Кабинет: </span>
                <div class="main-docs-card__cab" v-if="card.cab">
                  {{ card.cab }}
                </div>
                <span v-if="card.email">Почта: </span>
                <div class="main-docs-card__email" v-if="card.email">
                  {{ card.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDocsPage',
  components: {},
  meta: {
    crumb: 'Администрация',
  },
  data() {
    return {
      opened: false,
      main: {
        // name: 'Конова Олеся Александровна',
        // post: 'Главный врач (врач-педиатр)',
        // time: ' 14.00-15-00',
        // phone: '+7(812) 417-40-05',
        // cab: '342, 3 этаж',
        // email: 'pd44@zdrav.spb.ru',
        // img: 'main-docs-page/main.png',
        // id: 0,
      },

      article: '',

      admins: [
        // {
        //   name: 'Мальцева Татьяна Викторовна',
        //   post: 'Заместитель главного врача',
        //   time: 'Среда 14.00-15-00',
        //   phone: '+7 (812) 417-40-27',
        //   cab: 'malceva@dgp44.ru',
        //   email: '3 этаж каб. 344',
        //   img: 'main-docs-page/1.png',
        //   id: 0,
        // },
        // {
        //   name: 'Мамина Дания Борисовна',
        //   post: 'Начальник отдела кадров',
        //   time: 'Пн-Пт 10.00-13.00',
        //   phone: '+7 (921) 320-96-34',
        //   cab: 'mamina@dgp44.ru',
        //   email: '3 этаж',
        //   img: 'main-docs-page/2.png',
        //   id: 0,
        // },
        // {
        //   name: 'Плаксин Олег Александрович',
        //   post: 'Заместитель по хоз. вопросам:',
        //   time: 'Пн-Пт - 10.00-17.00',
        //   phone: '+7 (812) 417-40-01',
        //   cab: 'gp25@list.ru',
        //   email: '335 ; 3 этаж',
        //   img: 'main-docs-page/3.png',
        //   id: 0,
        // },
        // {
        //   name: 'Мамина Дания Борисовна',
        //   post: 'Главная медицинская сестра',
        //   time: 'Пн-Пт 10.00-13.00',
        //   phone: '+7 (812) 274-42-40',
        //   cab: 'gronskaya@dgp44.ru ',
        //   email: '3 этаж',
        //   img: 'main-docs-page/4.png',
        //   id: 0,
        // },
      ],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/309`)
      res = res.data
      this.article = res.acf.admin.about
      let admin = await this.$axios.get(
        `${this.$store.state.posts}/${res.acf.admin.doc}`
      )
      this.main = {
        id: res.acf.admin.doc,
        name: admin.data.title.rendered,
        post: admin.data.acf.speciality,
        // time: ' 14.00-15-00',
        phone: admin.data.acf.phone,
        cab: admin.data.acf.cab,
        email: admin.data.acf.email,
        img: admin.data.acf.avatar.url,
      }

      if (res.acf.others.length) {
        res.acf.others.forEach(async (id) => {
          let doc = await this.$axios.get(`${this.$store.state.posts}/${id}`)
          doc = doc.data
          this.admins.push({
            name: doc.title.rendered,
            post: doc.acf.speciality,
            // time: 'Среда 14.00-15-00',
            phone: doc.acf.phone,
            cab: doc.acf.cab,
            email: doc.acf.email,
            img: doc.acf.avatar.url,
            id: doc.id,
          })
        })
      }
    },
  },
}
</script>

<style lang="scss">
.main-docs {
  &-page {
    margin-bottom: 100px;
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    .docs__title {
      margin: 16px 0 32px;
    }

    &__article {
      background: $white;
      padding: 32px;
      border-radius: 24px;
      margin-top: 32px;
      position: relative;
      margin-bottom: 100px;

      &-content {
        font-size: 16px;
        line-height: 24px;

        h2 {
          font-weight: 600;
          font-size: 24px;
          line-height: 28px;
          margin-bottom: 24px;
        }

        p {
          max-width: 924px;
          color: $gray-1;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

    &__admins {
      padding-top: 100px;
      border-top: 1px solid rgba($gray-2, 0.4);
      margin-top: 100px;

      &-title {
        margin-bottom: 40px;
      }

      &-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }
    }
  }

  &-card {
    padding: 32px;
    background: $white;
    border-radius: 24px;
    display: flex;
    column-gap: 48px;
    text-decoration: none;
    color: $black;
    transition: box-shadow $transition;
    position: relative;

    &:hover {
      box-shadow: 0px 8px 15px rgba(35, 35, 35, 0.05);
    }

    &--bigger {
      .main-docs-card__name {
        font-size: 32px;
        line-height: 56px;
        max-width: unset;
      }

      &:hover {
        box-shadow: none;
      }
    }

    &__btn {
      position: absolute;
      bottom: 32px;
      right: 32px;
      width: fit-content;
      padding: 14px 27px;
      height: auto;
    }

    &__img {
      width: 228px;
      object-fit: contain;

      &--noimage {
        padding: 24px;
      }
    }

    &__name {
      font-weight: 600;
      font-size: 24px;
      line-height: 40px;
      margin-bottom: 16px;
      max-width: 300px;
    }

    &__post {
      font-weight: 600;
      font-size: 20px;
      line-height: normal;
      color: $primary;
      margin-bottom: 24px;
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: fit-content;
      row-gap: 16px;

      font-weight: 500;
      font-size: 16px;
      line-height: normal;
      min-width: 150px;

      span {
        color: $gray-1;
        width: fit-content;
        display: block;
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .main-docs-page {
    &__admins {
      &-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .main-docs {
    &-card {
      &__btn {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .main-docs {
    &-card {
      padding: 16px;
      column-gap: 16px;
    }
  }
}

@media screen and (max-width: 550px) {
  .main-docs {
    &-card {
      display: grid;
      grid-auto-columns: 1fr;
      row-gap: 24px;
      width: 100%;

      &__img {
        width: 100%;
      }
    }
  }
}
</style>
