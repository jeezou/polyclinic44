<template>
  <div class="tests-page__wrapper container">
    <bread-crumbs />
    <div class="tests-page">
      <h1 class="tests-page__title section-title">
        Расписание прививочного кабинета
      </h1>
      <div class="tests-page__grid">
        <table class="tests-page__table table">
          <thead>
            <th>День недели</th>
            <th>Часы работы</th>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="`tests-page-table-row-${index}`"
            >
              <td
                v-for="(cell, cellIndex) in row"
                :key="`tests-page-table-row-${index}-cell-${cellIndex}`"
                v-html="cell"
              />
            </tr>
          </tbody>
        </table>
        <div
          class="tests-page__item"
          v-for="(item, index) in items"
          :key="`test-page-item-${index}`"
        >
          <div class="tests-page__item-title" v-html="item.title" />
          <div class="tests-page__item-day" v-html="item.day" />
          <div class="tests-page__item-time" v-html="item.time" />
        </div>
        <div class="tests-page__warn">
          <div class="tests-page__warn-title">
            Все прививки и проба Манту производится после осмотра врача в тот же
            день!
          </div>
          <img src="@/assets/images/tests-page/warn.png" alt="warn icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestsSchedule',
  components: {},
  meta: {
    crumb: 'Расписание прививочного кабинета',
  },
  data() {
    return {
      rows: [
        ['Понедельник', 'С 10:30 до 19:30'],
        ['Вторник', 'С 10:30 до 19:30'],
        ['Среда', 'С 10:30 до 13:00'],
        ['Четверг', 'С 10:30 до 19:30'],
        ['Пятница', 'С 10:30 до 19:30'],
      ],

      items: [
        {
          title: 'Постановка проб манту',
          day: 'Понедельник',
          time: 'С 10:30 до 19:30',
        },
        {
          title: 'Проверка проб манту',
          day: 'Четверг',
          time: 'С 10:30 до 19:30<br/>С 15:00 до 19:00',
        },
        {
          title: 'Санитарный день',
          day: 'Среда',
          time: 'С 13:00',
        },
        {
          title: 'График кварцевания',
          day: 'Понедельник',
          time: 'С 10:30 до 19:30',
        },
        {
          title: 'Прививка от туберкулеза',
          day: 'Четверг',
          time: 'С 14:00 до 15:00',
        },
      ],
    }
  },
  mounted() {},
  beforeUnmount() {},
  methods: {},
}
</script>

<style lang="scss">
.tests-page {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 40px;
  }

  &__table {
    box-shadow: none;
    border-radius: 16px;
    grid-column-start: 1;
    grid-column-end: 3;
    thead {
      background: $gray-4;
    }
    tbody {
      tr {
        > :nth-child(3) {
          white-space: pre;
        }
      }
    }

    td,
    th {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      border: none;
      padding: 24px 16px;
    }

    th {
      font-weight: 700;
      padding: 14px 16px;
    }

    .td-empty {
      position: relative;

      &:after {
        content: '';
        width: 60%;
        height: 1px;
        background: $black;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    align-items: end;
  }

  &__item {
    background: $white;
    padding: 32px;
    border-radius: 24px;
    min-height: 240px;
    height: fit-content;

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 40px;
      margin-bottom: 24px;
    }

    &-day {
      font-weight: 600;
      font-size: 20px;
      line-height: 40px;
      color: $primary;
      margin-bottom: 16px;
    }

    &-time {
      font-weight: 500;
      font-size: 16px;
      line-height: 26px;
    }
  }

  &__warn {
    background: $primary;
    border-radius: 24px;

    display: flex;
    flex-direction: column;
    row-gap: 28px;
    align-items: flex-end;

    &-title {
      padding: 32px 32px 0 32px;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      color: $white;
    }

    img {
      width: 176px;
    }
  }
}
</style>
