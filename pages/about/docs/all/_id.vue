<template>
  <div class="profile-page__wrapper container">
    <div class="profile-page">
      <bread-crumbs />
      <h1 class="profile-page__title section-title">Профиль врача</h1>
      <div class="profile-page__main">
        <div class="profile-page__main-info">
          <div class="profile-page__main-info-img">
            <img
              :src="doc.img ? doc.img : require(`@/assets/images/noimage.png`)"
              alt=""
              :class="{ noimage: !doc.img }"
            />
          </div>
          <div class="profile-page__main-info-right">
            <div class="profile-page__main-name">{{ doc.name }}</div>
            <div class="profile-page__main-post">{{ doc.post }}</div>
            <div class="profile-page__main-grid">
              <!-- <span>Часы приема:</span>
              {{ doc.time }} -->
              <span>Кабинет:</span>
              <div class="profile-page__main-cab">{{ doc.cab }} каб</div>
            </div>
            <div class="filler"></div>
            <a
              href="https://www.gorzdrav.spb.ru/service-free-schedule"
              target="_blank"
              class="profile-page__main-btn light-btn"
            >
              Записаться на прием к врачу
            </a>
          </div>
        </div>
        <div class="profile-page__main-exp">
          <div class="profile-page__main-exp-title">Стаж работы</div>
          <div class="profile-page__main-exp-num">
            <span>{{ doc.exp }}</span
            >лет
          </div>
        </div>
      </div>
      <!-- <div class="profile-page__schedule">
        <div class="profile-page__schedule-header">
          <div class="profile-page__schedule-title">Расписание на неделю</div> -->
      <!-- <div class="profile-page__schedule-controls"></div> -->
      <!-- </div>
        <div class="profile-page__schedule-wrapper">
          <div
            class="profile-page__schedule-item"
            v-for="(item, index) in schedule"
            :key="`profile-page-schedule-item-${index}`"
          >
            <div class="profile-page__schedule-day">{{ item.date }}</div>
            <div class="profile-page__schedule-time">{{ item.time }}</div>
          </div>
        </div>
      </div> -->
      <accordion-component :maxHeight="300" v-if="doc.edu">
        <template #content>
          <div class="profile-page__edu-content" v-html="doc.edu" />
        </template>
      </accordion-component>
      <div class="profile-page__reviews" v-if="reviews.length">
        <div class="profile-page__reviews-title">Отзывы</div>
        <div
          class="profile-page__reviews-item"
          v-for="(review, index) in reviews"
          :key="`profile-page-review-${index}`"
        >
          <div class="profile-page__reviews-item-par" v-html="review.par" />
          <div class="profile-page__reviews-item-stars">
            <div
              class="profile-page__reviews-item-star"
              v-for="(star, starIndex) in 5"
              :key="`profile-page-star-${starIndex}`"
              :class="{
                'profile-page__reviews-item-star--active':
                  starIndex + 1 <= review.score,
              }"
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.17517 0.536594C9.57238 -0.0429788 10.4277 -0.0429777 10.8249 0.536595L13.5608 4.52864C13.6909 4.71837 13.8823 4.85748 14.103 4.92251L18.7451 6.29092C19.419 6.48959 19.6833 7.30306 19.2549 7.85992L16.3036 11.6956C16.1634 11.8778 16.0903 12.1029 16.0966 12.3329L16.2296 17.1706C16.249 17.873 15.557 18.3757 14.895 18.1403L10.3351 16.5188C10.1184 16.4418 9.88171 16.4418 9.66499 16.5188L5.10512 18.1403C4.4431 18.3757 3.75113 17.873 3.77045 17.1706L3.9035 12.3328C3.90983 12.1029 3.83669 11.8778 3.69643 11.6956L0.745217 7.85992C0.316755 7.30306 0.581067 6.48959 1.25502 6.29092L5.89713 4.92251C6.11775 4.85748 6.30921 4.71837 6.43924 4.52864L9.17517 0.536594Z"
                  fill="#BBBCC4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-page__add-review light-btn" @click="isModal = true">
        Добавить отзыв
        <svg
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0143 0C10.4399 0 10.7857 0.345857 10.7857 0.771429V7.71429H17.7286C18.1541 7.71429 18.5 8.06014 18.5 8.48571V9.51429C18.5 9.93986 18.1541 10.2857 17.7286 10.2857H10.7857V17.2286C10.7857 17.6541 10.4399 18 10.0143 18H8.98571C8.56014 18 8.21429 17.6541 8.21429 17.2286V10.2857H1.27143C0.845857 10.2857 0.5 9.93986 0.5 9.51429V8.48571C0.5 8.06014 0.845857 7.71429 1.27143 7.71429H8.21429V0.771429C8.21429 0.345857 8.56014 0 8.98571 0H10.0143V0Z"
            fill="#176DEA"
          />
        </svg>
      </div>
    </div>
    <modal-review
      @close="isModal = false"
      :active="isModal"
      :docID="parseInt($route.params.id)"
    ></modal-review>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  components: {},
  meta: {
    crumb: 'Профиль врача',
  },
  data() {
    return {
      opened: false,
      isModal: false,
      reviews: [],
      doc: {
        // img: 'doc-page/1.png',
        // name: 'Стебус Борис Александрович',
        // post: 'Врач ЛФК',
        // time: '14.00-15-00',
        // cab: '202',
        // exp: '8',
        // schedule: [
        //   '15:00 - 21:00',
        //   '15:00 - 21:00',
        //   '15:00 - 21:00',
        //   '15:00 - 21:00',
        //   '15:00 - 21:00',
        //   '15:00 - 21:00',
        //   '15:00 - 21:00',
        // ],
        // edu: '<h3>2001</h3><p>С отличием окончила медицинский факультет Кабардино-Балкарского Государственного университета. С 1998 по 2001 проходила обучение в ординатуре и аспирантуре в Российском Государственном Медицинском Университете.</p><h3>2007</h3><p>ФГБУ "Национальный медицинский исследовательский центр психиатрии и неврологии им. В.М. Бехтерева", специальность "Клиническая (медицинская) психология"</p><h3>2007</h3><p>ФГБУ "Национальный медицинский исследовательский центр психиатрии и неврологии им. В.М. Бехтерева", специальность "Клиническая (медицинская) психология"</p>',
        // reviews: [
        //   {
        //     par: 'Татьяна Викторовна - самый внимательный и лучший доктор!',
        //     score: 4,
        //   },
        //   {
        //     par: 'Безумно благодарна Татьяне Викторовне за решенную проблему с нашим ребенком!',
        //     score: 5,
        //   },
        // ],
      },
    }
  },
  computed: {
    schedule() {
      const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
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
      const schedule = []
      for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        schedule.push({
          date: `${days[date.getDay()]}, ${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
          } ${months[date.getMonth() + 1]}`,
          time: this.doc.schedule[date.getDay()],
        })
      }
      return schedule
    },
  },
  mounted() {
    this.getData()
    this.getComments()
  },
  beforeUnmount() {},
  methods: {
    async getComments() {
      const res = await this.$axios.get(
        `${this.$store.state.api}/comments?post=${this.$route.params.id}`
      )
      if (res.data.length) {
        res.data.forEach((rev) => {
          this.reviews.push({
            par: rev.content.rendered,
            score: rev.meta.stars,
          })
        })
      }
    },
    async getData() {
      const res = await this.$axios.get(
        `${this.$store.state.posts}/${this.$route.params.id}`
      )
      this.doc = {
        img: res.data.acf.avatar.url,
        name: res.data.title.rendered,
        post: res.data.acf.speciality,
        cab: res.data.acf.cab,
        exp: res.data.acf.experience,
        edu: res.data.content.rendered,
        // reviews: [
        //   {
        //     par: 'Татьяна Викторовна - самый внимательный и лучший доктор!',
        //     score: 4,
        //   },
        //   {
        //     par: 'Безумно благодарна Татьяне Викторовне за решенную проблему с нашим ребенком!',
        //     score: 5,
        //   },
        // ],
      }
    },
  },
}
</script>

<style lang="scss">
.profile-page {
  margin-bottom: 100px;
  padding-bottom: 100px;
  border-bottom: 1px solid rgba($gray-2, 0.4);

  &__wrapper {
    padding-top: 192px;
  }

  &__title {
    margin: 24px 0 64px;
  }

  &__main {
    display: grid;
    grid-template-columns: 5fr 3fr;
    gap: 24px;
    margin-bottom: 32px;

    &-info,
    &-exp {
      background: $white;
      border-radius: 24px;
      padding: 32px;
    }

    &-cab {
      padding: 8px 14px;
      border-radius: 1000px;
      background: $gray-3;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
    }

    &-info {
      display: flex;
      column-gap: 48px;

      &-img {
        max-width: 228px;
        min-width: 228px;
        max-height: 240px;
        min-height: 240px;
        border-radius: 24px;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: $gray-4;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;

          &.noimage {
            object-fit: contain;
            width: 70%;
          }
        }
      }

      &-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 16px;

        .filler {
          height: 100%;
          display: none;
        }
      }
    }

    &-name {
      font-weight: 600;
      font-size: 32px;
      line-height: normal;
      // margin-bottom: 16px;
    }

    &-post {
      font-weight: 600;
      font-size: 20px;
      line-height: normal;
      color: $primary;
      // margin-bottom: 24px;
    }

    &-grid {
      display: flex;
      align-items: center;
      width: fit-content;
      gap: 20px 16px;
      // margin-bottom: 24px;

      font-weight: 500;
      font-size: 16px;

      span {
        color: $gray-1;
      }
    }

    &-btn {
      padding: 22px 47px;
      width: fit-content;
      display: flex;
    }

    &-exp {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-title {
        font-weight: 600;
      }

      font-weight: 500;
      font-size: 24px;
      line-height: 28px;

      span {
        font-weight: 600;
        font-size: 96px;
        color: $primary;
        margin-right: 16px;
        position: relative;
        bottom: -5px;
      }
    }
  }

  &__schedule {
    padding: 32px;
    background: $white;
    border-radius: 24px;
    margin-bottom: 32px;

    &-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 24px;
    }

    &-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &-item {
      padding: 16px 20px;
      box-shadow: inset 0 0 0 2px $gray-3;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      row-gap: 12px;
    }

    &-day {
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: $primary;
      text-align: center;
    }

    &-time {
      text-align: center;
      font-weight: 500;
      font-size: 12px;
      line-height: 28px;
      padding: 5px 28px;
      background: $gray-3;
      border-radius: 8px;
    }
  }

  &__edu {
    background: $white;
    padding: 32px;
    border-radius: 24px;
    margin-bottom: 32px;

    &-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 32px;
    }

    &-content {
      h3 {
        color: $primary;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        margin-bottom: 24px;
      }

      p {
        font-weight: 500;
        font-size: 18px;
        line-height: 32px;
        margin-bottom: 24px;
      }
    }

    &-btn {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: $primary;
      cursor: pointer;
      transition: all $transition;
      text-align: right;

      &:hover {
        color: rgba($primary, 0.9);
      }
    }
  }

  &__reviews {
    background: $white;
    padding: 32px;
    border-radius: 24px;
    margin-bottom: 32px;
    margin-top: 32px;

    &-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 32px;
    }

    &-item {
      padding: 32px;
      background: $gray-3;
      border-radius: 16px;
      margin-bottom: 24px;

      display: flex;
      flex-direction: column;
      row-gap: 24px;

      &-par {
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
      }

      &-stars {
        display: flex;
        column-gap: 10px;
      }

      &-star {
        &--active {
          svg {
            path {
              fill: $primary;
            }
          }
        }
      }
    }
  }

  &__add-review {
    display: flex;
    column-gap: 16px;
    justify-content: center;
    align-items: center;
    margin-top: 32px;

    svg {
      width: 18px;
      height: 18px;

      path {
        transition: all $transition;
      }
    }

    &:hover {
      svg {
        path {
          fill: $white;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .profile-page {
    &__main {
      grid-template-columns: 1fr;

      &-exp {
        min-height: 250px;
      }

      &-btn {
        white-space: normal;
        padding: 22px 12px;
        width: 100%;
      }

      &-info {
        column-gap: 24px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .profile-page {
    &__main {
      &-name {
        font-size: 24px;
        line-height: 120%;
      }

      &-post {
        font-size: 16px;
        line-height: 120%;
      }

      &-cab {
        padding: 1px 12px;
        font-size: 14px;
      }

      &-info {
        padding: 16px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .profile-page {
    &__title {
      font-size: 40px;
      margin: 32px 0 !important;
    }
    &__main {
      .filler {
        display: none;
      }

      &-info {
        &-img {
          min-width: 170px;
        }
      }

      &-name {
        font-size: 26px;
      }

      &-post {
        font-size: 16px;
      }
    }

    &__reviews {
      padding: 24px;

      &-item {
        padding: 24px;

        &-par {
          font-size: 18px;
          line-height: 140%;
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .profile-page {
    &__main {
      &-info {
        flex-direction: column;
        row-gap: 32px;

        &-img {
          max-width: unset;
          min-width: unset;
          max-height: unset;
          min-height: unset;
        }
      }
    }

    &__reviews {
      padding: 24px 16px;

      &-item {
        padding: 24px 16px;
      }
    }
  }
}
</style>
