<template>
  <div class="youth-page__wrapper">
    <div class="youth-page__header page-header">
      <div class="page-header__inner container">
        <div class="page-header__left">
          <bread-crumbs />
          <div class="page-header__title">Молодежная программа</div>
        </div>
        <div class="page-header__right">
          <img
            src="@/assets/images/page-circle.svg"
            alt="header page circle"
            class="page-header__right-circle"
          />
          <img
            src="@/assets/images/youth-header.png"
            alt="header page docs image"
            class="page-header__right-image"
          />
        </div>
      </div>
    </div>
    <div class="youth-page__content container">
      <div class="youth-page__title">Мы предлагаем</div>
      <div class="youth-page__cards">
        <div
          class="youth-page__card"
          v-for="(card, index) in cards"
          :key="`youth-page-card-${index}`"
        >
          <div class="youth-page__card-title" v-html="card.title" />
          <img
            :src="require(`@/assets/images/${card.img}`)"
            alt=""
            class="youth-page__card-img"
          />
        </div>
      </div>
      <div class="youth-page__schedule">
        <div class="youth-page__schedule-title">
          Расписание работы молодежной консультации
        </div>
        <table class="youth-page__schedule-table table">
          <thead>
            <th>Название</th>
            <th>День посещений</th>
            <th>Время посещения</th>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="`youth-page-table-row-${index}`"
            >
              <td
                v-for="(cell, cellIndex) in row"
                :key="`youth-page-table-row-${index}-cell-${cellIndex}`"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="youth-page__questions">
        <div class="youth-page__questions-title">Остались вопросы?</div>
        <div class="youth-page__questions-par">
          Если у вас есть вопросы например по расписаниию, часам приему и тд, то
          можете связаться с нами по-телефону
        </div>
        <a
          href="tel:+7(812)417-41-63"
          class="youth-page__questions-btn light-btn"
          >+7 (812) 417-41-63</a
        >
        <img
          src="@/assets/images/youth-page/questions.png"
          alt="phone"
          class="youth-page__questions-img"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YouthPage',
  components: {},
  meta: {
    crumb: 'Молодежная программа',
  },
  data() {
    return {
      cards: [
        {
          title: 'Обследование </br> и рекомендации',
          img: 'youth-page/1.png',
        },
        {
          title: 'Диагностика </br> и лечение',
          img: 'youth-page/2.png',
        },
        {
          title: 'Консультация по методам </br> планирования семьи',
          img: 'youth-page/3.png',
        },
        {
          title: 'Диагностика </br> беременности',
          img: 'youth-page/4.png',
        },
        {
          title: 'Психологическое </br> консультирование',
          img: 'youth-page/5.png',
        },
        {
          title: 'Профессиональные </br> осмотры',
          img: 'youth-page/6.png',
        },
      ],

      rows: [
        ['Регистратура', 'ежедневно', '09.00-20.00'],
        ['Зав. консультацией', 'ежедневно', '16.00-19.30'],
        ['Медицинская сестра', 'ежедневно', '16.00-19.30'],
        ['Социальный работник', 'ежедневно', '16.00-19.30'],
        ['Врач уролог-андролог', 'вторник', '09.00-12.00'],
        ['Врач акушер-гинеколог', 'вторник, среда', '09.00-12.00, 15.00-18.00'],
        [
          'Психолог',
          'понедельник, вторник, четверг',
          '14.00-18.00, 09.00-15.00',
        ],
      ],
    }
  },
  mounted() {},
  beforeUnmount() {},
  methods: {},
}
</script>

<style lang="scss">
.youth-page {
  margin-bottom: 100px;
  padding-bottom: 100px;
  border-bottom: 1px solid rgba($gray-2, 0.4);

  &__content {
    padding: 100px 0;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    width: 100%;
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    margin-bottom: 40px;
  }

  &__cards {
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
    margin-bottom: 100px;
  }

  &__card {
    padding: 28px 24px;
    background: $white;
    border-radius: 16px;
    position: relative;

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      max-width: 250px;
    }

    &-img {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 100%;
    }
  }

  &__schedule {
    &-title {
      font-weight: 600;
      font-size: 32px;
      line-height: 56px;
      margin-bottom: 40px;
    }

    &-table {
      margin-bottom: 32px;
    }
  }

  &__questions {
    width: 50%;
    background: $white;
    padding: 24px;
    border-radius: 24px;
    position: relative;

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 16px;
    }

    &-par {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 32px;
      max-width: 490px;
    }

    &-btn {
      width: fit-content;
      padding: 14px 20px;
      border-radius: 12px;
      height: auto;
    }

    &-img {
      position: absolute;
      right: 0;
      height: 100%;
      bottom: 0;
    }
  }
}

@media screen and (max-width: 1400px) {
  .youth-page {
    &__questions {
      max-width: 650px;
      width: 100%;
    }
  }
}

@media screen and (max-width: 991px) {
  .youth-page {
    &__cards {
      grid-template-columns: 1fr;
    }
  }
}

@media screen and (max-width: 768px) {
  .youth-page {
    &__questions {
      &-img {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .youth-page {
    &__schedule {
      &-table {
        tbody tr td,
        thead th {
          padding: 12px;
          font-size: 14px;
        }
      }
    }

    &__card {
      &-title {
        width: calc(100% - 60px);
        font-size: 18px;
        line-height: 130%;
      }
      &-img {
        width: 130px;
        height: unset;
        object-fit: cover;
      }
    }
  }
}
</style>
