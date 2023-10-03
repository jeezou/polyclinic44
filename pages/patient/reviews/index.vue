<template>
  <div class="reviews-page container">
    <bread-crumbs/>
    <div class="reviews-page__title">Отзывы</div>
    <div class="reviews-page__content">
      <div class="reviews-page__reviews">
        <div
          class="reviews-page__review"
          v-for="(review, index) in reviews"
          :key="`reviews-page-review-${index}`"
        >
          <div class="reviews-page__review-date">{{ review.date }}</div>
          <div class="reviews-page__review-rev" v-html="review.rev"/>
          <div class="reviews-page__review-score">
            <div
              class="reviews-page__review-star"
              v-for="(star, starIndex) in 5"
              :key="`reviews-page-rev-${index}-star-${starIndex}`"
              :class="{
                'reviews-page__review-star--active':
                  starIndex + 1 <= parseInt(review.score),
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
          <div class="reviews-page__review-doc" v-if="review.doc">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9999 3L14.2249 5.15239L17.29 4.71885L17.8249 7.76795L20.5594 9.21885L19.1999 12L20.5594 14.7812L17.8249 16.2321L17.29 19.2812L14.2249 18.8476L11.9999 21L9.77502 18.8476L6.70987 19.2812L6.17502 16.2321L3.44043 14.7812L4.79994 12L3.44043 9.21885L6.17502 7.76795L6.70987 4.71885L9.77502 5.15239L11.9999 3Z"
                fill="#0DC268"
              />
              <path
                d="M9 13L11 15L15 10"
                stroke="white"
                stroke-linecap="round"
              />
            </svg>
            <a
              :href="`/about/docs/all/${review.doc.id}`"
              class="reviews-page__review-doc-name"
            >{{ review.doc.name }}</a
            >
            /
            <span class="reviews-page__review-doc-speciality">{{
                review.doc.speciality
              }}</span>
          </div>
        </div>
      </div>
      <div class="reviews-page__leave-rev">
        <div class="reviews-page__leave-rev-title">
          Вам есть что сказать про нас?
        </div>
        <div class="reviews-page__leave-rev-par">
          Мы часто читаем ваши отзывы и пытаемся прислушаться к каждому из вас!
        </div>
        <div class="reviews-page__leave-rev-btn" @click="isModal = true">
          Оставить отзыв
        </div>
        <img
          src="@/assets/images/reviews-page/leave-rev.png"
          alt="star"
          class="reviews-page__leave-rev-img"
        />
      </div>
    </div>
    <modal-review @close="isModal = false" :active="isModal"></modal-review>
  </div>
</template>

<script>
export default {
  name: 'ReviewsPage',
  components: {},
  meta: {
    crumb: 'Отзывы',
  },
  data() {
    return {
      isModal: false,
      reviews: [
        // {
        //   date: '02 авг 2022',
        //   rev: 'Татьяна Викторовна - самый внимательный и лучший доктор!',
        //   score: '4',
        // },
        // {
        //   date: '27 июл 2022',
        //   rev: 'Районная поликлиника, очень-очень радушный и квалифицированный персонал, замечательные и внимательные врачи!',
        //   score: '5',
        // },
        // {
        //   date: '27 июл 2022',
        //   rev: 'Большое спасибо доктору Лобжанидзе Г. Ф. и его медицинской сестре за их высокий профессионализм и доброе отношение к пациентам. Спасибо большое!',
        //   score: '4',
        // },
        // {
        //   date: '27 июл 2022',
        //   rev: 'Отношение врачей, внимательность к проблеме и поиск способов их решения.',
        //   score: '5',
        // },
      ],
    }
  },
  mounted() {
    this.getReviews()
  },
  beforeUnmount() {
  },
  methods: {
    parseDate(date) {
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
      const d = new Date(date)
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    },
    async getReviews() {
      let res = await this.$axios.get(`${this.$store.state.api}/comments`)
      res = res.data
      res.forEach((el) => {
        const obj = {
          date: this.parseDate(el.date),
          rev: el.content.rendered,
          score: el.meta.stars,
        }

        if (el.post !== 162) {
          this.$axios
            .get(`${this.$store.state.posts}/${el.post}`)
            .then((res) => {
              Object.defineProperty(obj, 'doc', {
                value: {
                  id: res.data.id,
                  name: res.data.title.rendered,
                  speciality: res.data.acf.speciality,
                },
              })
              this.reviews.push(obj)
            })
        } else this.reviews.push(obj)

        // console.log(el)
        // console.log(obj)
      })
    },
  },
}
</script>

<style lang="scss">
.reviews-page {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 24px;
    position: relative;
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    margin: 24px 0 40px;
  }

  &__reviews {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
  }

  &__review {
    padding: 32px;
    background: $white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;

    &-doc {
      margin-top: 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 12px;
      background: $gray-3;
      border-radius: 12px;

      font-weight: 500;
      font-size: 14px;
      line-height: 140%;

      > * {
        display: flex;
      }

      svg {
        margin-right: 8px;
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
      }

      &-name {
        margin-right: 4px;
        text-decoration: none;
        color: $primary;
      }

      &-speciality {
        margin-left: 4px;
      }
    }

    &-date {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: $gray-2;
      margin-bottom: 16px;
    }

    &-rev {
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      max-width: 800px;
      margin-bottom: 24px;
    }

    &-score {
      margin-top: 4px;
      display: flex;
      column-gap: 8px;
    }

    &-star {
      &--active {
        svg path {
          fill: $primary;
        }
      }
    }
  }

  &__leave-rev {
    padding: 32px 32px 0 32px;
    background: $primary;
    color: $white;
    border-radius: 24px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: 150px;
    min-width: 350px;

    &-title {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 16px;
    }

    &-par {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 32px;
    }

    &-btn {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: $primary;
      background: $white;
      padding: 14px 0;
      width: 100%;
      text-align: center;
      border-radius: 12px;
      cursor: pointer;
      transition: all $transition;
      margin-bottom: 32px;

      &:hover {
        background: rgba($white, 0.2);
        color: $white;
      }
    }

    &-img {
      max-width: 176px;
    }
  }
}

@media screen and (max-width: 991px) {
  .reviews-page {
    &__content {
      display: flex;
      flex-direction: column-reverse;
    }

    &__leave-rev {
      position: static;
    }
  }
}
</style>
