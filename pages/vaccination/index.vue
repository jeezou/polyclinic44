<template>
  <div class="vaccination container">
    <bread-crumbs />
    <div class="vaccination__title">Расписание прививочного кабинета</div>
    <div class="vaccination__content">
      <div class="vaccination__tabs" v-if="tabs.length">
        <div
          class="vaccination__tab"
          v-for="(tab, index) in tabs"
          :key="`vaccination-tab-${index}`"
          :class="{ 'vaccination__tab--active': current === tab.id }"
          @click="current = tab.id"
        >
          {{ tab.title }}
        </div>
      </div>
      <div
        class="vaccination__cabs"
        v-if="tabContent['cabs'] !== undefined && tabContent['cabs'].length"
      >
        <div
          class="vaccination__cab"
          v-for="(cab, index) in tabContent.cabs"
          :key="`vaccination-tab-content-cab-${index}`"
        >
          <div class="vaccination__cab-title">{{ cab.title }}</div>
          <client-only>
            <table class="vaccination__cab-hours table">
              <thead>
                <th>День недели</th>
                <th>Часы работы</th>
              </thead>
              <tbody>
                <tr
                  v-for="(day, rowIndex) in cab.hours"
                  :key="`vaccination-cab-${index}-row-${rowIndex}`"
                >
                  <td>{{ day.day }}</td>
                  <td>{{ day.time }}</td>
                </tr>
              </tbody>
            </table>
          </client-only>
        </div>
      </div>
      <div
        class="vaccination__cards-wrapper"
        v-if="tabContent['cards'] !== undefined"
      >
<!--        <div class="vaccination__cards-title">Справочная информация</div>-->
        <masonry-wall
          :items="tabContent.cards"
          :gap="24"
          :column-width="300"
          :ssr-columns="columns"
          class="vaccination__cards"
          v-if="tabContent.cards.length"
          :key="`${tabContent.title}-${columns}`"
        >
          <template #default="{ item, index }">
            <div
              class="vaccination__card--highlight"
              :class="{ 'vaccination__card--collapsed': item.collapsed }"
              v-if="item.highlight"
              v-html="item.content"
            />
            <div class="vaccination__card" v-else>
              <div class="vaccination__card-title">{{ item.title }}</div>
              <div class="vaccination__card-cab" v-if="item.cab">
                {{ item.cab }}
              </div>
              <div class="vaccination__card-items">
                <div
                  class="vaccination__card-item"
                  v-for="(el, elIndex) in item.items"
                  :key="`vaccination-card-${index}-item-${elIndex}`"
                >
                  <div class="vaccination__card-item-title">{{ el.title }}</div>
                  <div
                    class="vaccination__card-item-content"
                    v-html="el.content"
                  />
                </div>
              </div>
            </div>
          </template>
        </masonry-wall>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vaccination',
  components: {},
  meta: {
    crumb: 'Расписание прививочного кабинета',
  },
  data() {
    return {
      columns: 4,
      current: 0,
      windowWidth: null,
      tabs: [
        // {
        //   id: 0,
        //   title: 'ул. Мытнинская, д.25',
        //   cabs: [
        //     {
        //       title: 'Прививочный кабинет №415',
        //       hours: [
        //         {
        //           day: 'Понедельник',
        //           time: 'С 10:30 до 19:30',
        //         },
        //         {
        //           day: 'Вторник',
        //           time: 'С 10:30 до 19:30',
        //         },
        //         {
        //           day: 'Среда',
        //           time: 'С 10:30 до 14:00',
        //         },
        //         {
        //           day: 'Четверг',
        //           time: 'С 10:30 до 14:00 с  15:00 до 19:30',
        //         },
        //         {
        //           day: 'Пятница',
        //           time: 'С 10:30 до 19:30',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Процедурный кабинет №420',
        //       hours: [
        //         {
        //           day: 'Понедельник',
        //           time: 'С 10:30 до 19:30',
        //         },
        //         {
        //           day: 'Вторник',
        //           time: 'С 10:30 до 19:30',
        //         },
        //         {
        //           day: 'Среда',
        //           time: 'С 10:30 до 14:00',
        //         },
        //         {
        //           day: 'Четверг',
        //           time: 'С 10:30 до 19:30',
        //         },
        //         {
        //           day: 'Пятница',
        //           time: 'С 10:30 до 19:30',
        //         },
        //         {
        //           day: 'Суббота',
        //           time: 'С 09:30 до 14:00',
        //         },
        //       ],
        //     },
        //   ],
        //   cards: [
        //     {
        //       title: 'Постановка проб манту',
        //       cab: '416',
        //       items: [
        //         {
        //           title: 'Понедельник',
        //           content: 'С 10:30 до 19:00',
        //         },
        //         {
        //           title: 'Суббота',
        //           content: 'С 09:00 до 14:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Проверка проб манту',
        //       cab: '416',
        //       items: [
        //         {
        //           title: 'Вторник',
        //           content: 'С 10:30 до 19:00',
        //         },
        //         {
        //           title: 'Четверг',
        //           content: 'С 09:00 до 14:00 / С 15:00 до 19:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Кабинет забора биологического материала',
        //       cab: '110',
        //       items: [
        //         {
        //           title: 'Режим работы',
        //           content:
        //             'С 08:10 до 08:30 энтеробиоз<br/>С 09:10 до 09:15 дизгруппа<br/>С 09:10 до 09:20 мазки',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Забор крови из вены',
        //       cab: '106',
        //       items: [
        //         {
        //           title: 'Каждый день',
        //           content: 'С 08:00 до 10:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Забор крови из вены',
        //       cab: '416',
        //       items: [
        //         {
        //           title: 'Только по понедельникам',
        //           content: 'С 10:30 до 19:30',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Прививка БЦЖ (против туберкулеза)',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Только по четвергам',
        //           content: 'С 14:00 до 15:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Забор крови из пальца',
        //       cab: '109',
        //       items: [
        //         {
        //           title: 'Каждый день',
        //           content: 'С 08:00 до 10:00',
        //         },
        //       ],
        //     },
        //     {
        //       highlight: true,
        //       content:
        //         'Все прививки и проба Манту производятся после осмотра врача в тот же день!',
        //     },
        //   ],
        // },
        // {
        //   id: 1,
        //   title: 'ул.Чайковского, д.73, лит. А',
        //   cabs: [
        //     {
        //       title: 'Прививочный кабинет №209',
        //       hours: [
        //         {
        //           day: 'Понедельник',
        //           time: 'С 09:30 до 16:00',
        //         },
        //         {
        //           day: 'Вторник',
        //           time: 'С 09:00 до 16:00',
        //         },
        //         {
        //           day: 'Среда',
        //           time: 'С 09:00 до 16:00',
        //         },
        //         {
        //           day: 'Четверг',
        //           time: 'С 11:00 до 17:30',
        //         },
        //         {
        //           day: 'Пятница',
        //           time: 'С 09:00 до 16:00',
        //         },
        //       ],
        //     },
        //   ],
        //   cards: [
        //     {
        //       title: 'Постановка проб манту',
        //       cab: '208',
        //       items: [
        //         {
        //           title: 'Понедельник',
        //           content: 'С 09:00 до 16:00',
        //         },
        //         {
        //           title: 'Четверг',
        //           content: 'С 09:00 до 16:00 ',
        //         },
        //         {
        //           title: 'Пятница',
        //           content: 'С 09:00 до 16:00 ',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Проверка проб манту',
        //       cab: '208',
        //       items: [
        //         {
        //           title: 'Понедельник',
        //           content: 'С 09:00 до 16:00',
        //         },
        //         {
        //           title: 'Четверг',
        //           content: 'С 11:00 до 17:30',
        //         },
        //         {
        //           title: 'Пятница',
        //           content: 'С 09:00 до 16:00',
        //         },
        //       ],
        //     },
        //     {
        //       title:
        //         'Забор материала для проведения анализов (мазки) проводится',
        //       cab: '113',
        //       items: [
        //         {
        //           title: 'Кроме выходных и праздничных дней',
        //           content: 'С 08:30 до 10:30',
        //         },
        //       ],
        //     },
        //     {
        //       highlight: true,
        //       content:
        //         'Все прививки и проба Манту производятся после осмотра врача в тот же день!',
        //     },
        //     {
        //       title: 'Диаксин тест',
        //       cab: '208',
        //       items: [
        //         {
        //           title: 'Только по пятницам',
        //           content: 'С 14:00 до 16:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Прививка БЦЖ (против туберкулеза)',
        //       cab: '208',
        //       items: [
        //         {
        //           title: 'Только по четвергам',
        //           content: 'С 14:00 до 15:00',
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 2,
        //   title: 'ул.Кременчугская, д.13, корп. 2',
        //   cabs: [],
        //   cards: [
        //     {
        //       title: 'Процедурный кабинет',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Взятие крови',
        //           content: '',
        //         },
        //         {
        //           title: 'Понедельник',
        //           content: 'С 08:00 до 10:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Постановка проб манту',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Понедельник',
        //           content: 'С 10:00 до 15:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Проверка проб манту',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Четверг',
        //           content: 'С 12:00 до 19:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Забор крови',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Понедельник',
        //           content: 'С 08:00 до 10:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Процедурный кабинет',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Выполнение прививок',
        //           content: '',
        //         },
        //         {
        //           title: 'Понедельник',
        //           content: 'С 10:00 до 15:00',
        //         },
        //         {
        //           title: 'Четверг',
        //           content: 'С 12:00 до 19:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Диаскин тест',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Понедельник',
        //           content: 'С 10:00 до 15:00',
        //         },
        //       ],
        //     },
        //     {
        //       title: 'Проверка Диаскин теста',
        //       cab: '',
        //       items: [
        //         {
        //           title: 'Четверг',
        //           content: 'С 12:00 до 19:00',
        //         },
        //       ],
        //     },
        //     {
        //       highlight: true,
        //       collapsed: true,
        //       content:
        //         'Все прививки и проба Манту производятся после осмотра врача в тот же день!',
        //     },
        //   ],
        // },
      ],
    }
  },
  mounted() {
    if (process.client) this.windowWidth = window.innerWidth
    window.addEventListener(
      'resize',
      () => (this.windowWidth = window.innerWidth)
    )

    this.getData()
  },
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/395`)
      res = res.data

      Object.keys(res.acf).forEach(async (id, index) => {
        const content = res.acf[id]
        const tab = {}
        tab.id = index
        tab.title = content.address
        tab.cabs = []
        if (content.cab1.number && content.cab1.schedule) {
          const html = document.createElement('div')
          html.innerHTML = content.cab1.schedule
          const schedule = []
          html.querySelectorAll('p').forEach((par) => {
            const arr = par.textContent.split('|')
            schedule.push({ day: arr[0], time: arr[1] })
          })

          tab.cabs.push({
            title: `Процедурный кабинет №${content.cab1.number}`,
            hours: schedule,
          })
        }
        if (content.cab2.number && content.cab2.schedule) {
          const html = document.createElement('div')
          html.innerHTML = content.cab2.schedule
          const schedule = []
          html.querySelectorAll('p').forEach((par) => {
            const arr = par.textContent.split('|')
            schedule.push({ day: arr[0], time: arr[1] })
          })

          tab.cabs.push({
            title: `Процедурный кабинет №${content.cab2.number}`,
            hours: schedule,
          })
        }

        tab.cards = []
        const html = document.createElement('div')
        html.innerHTML = content.ref
        html.querySelectorAll('p').forEach((par) => {
          const txt = par.textContent
          const card = {}
          const arr = txt.split('#')

          card.title = arr[0]

          const cab = arr[1].split('/')[0]
          if (cab[0] === '(' && cab[cab.length - 1] === ')') {
            card.cab = cab.slice(1, -1)
            arr[1] = arr[1].slice(cab.length + 1, arr[1].length)
          }

          card.items = []
          arr[1].split('/').forEach((item) => {
            card.items.push({
              title: item.split('|')[0],
              content: item.split('|')[1],
            })
          })

          tab.cards.push(card)
        })

        if (id === 'third') {
          tab.cards.push({
            highlight: true,
            collapsed: true,
            content:
              'Все прививки и проба Манту производятся после осмотра врача в тот же день!',
          })
        } else {
          tab.cards.push({
            highlight: true,
            content:
              'Все прививки и проба Манту производятся после осмотра врача в тот же день!',
          })
        }
        this.tabs.push(tab)
      })
    },
  },
  watch: {
    windowWidth(val) {
      if (val >= 1300) this.columns = 4
      if (val < 1300) this.columns = 3
      if (val < 991) this.columns = 2
      if (val < 768) this.columns = 1
    },
  },
  computed: {
    tabContent() {
      const ret = this.tabs.filter((el) => el.id === this.current)[0]
      return ret ? ret : {}
    },
  },
}
</script>

<style lang="scss">
.vaccination {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    margin: 24px 0 40px;
  }

  &__tabs {
    display: flex;
    column-gap: 8px;
    margin-bottom: 48px;
  }

  &__tab {
    background: $white;
    padding: 14px 20px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    cursor: pointer;
    transition: all $transition;

    &--active,
    &:hover {
      color: $white;
      background: $black;
    }
  }

  &__cabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 100px;
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__cab {
    &-title {
      font-weight: 600;
      font-size: 28px;
      line-height: 140%;
      margin-bottom: 24px;
    }

    &-hours {
      border: none;
      box-shadow: none;
      thead th,
      tbody tr td {
        border: none;
        font-size: 16px;
        line-height: 140%;
      }

      thead th {
        padding: 14px 16px;
        background: $gray-4;
      }

      tbody tr td {
        padding: 24px 16px;
        font-weight: 500;
      }
    }
  }

  &__cards {
    &-title {
      font-weight: 600;
      font-size: 40px;
      line-height: 140%;
      margin-bottom: 40px;
    }
  }

  &__card {
    padding: 32px;
    border-radius: 24px;
    background: $white;

    &--highlight {
      padding: 32px;
      background: $primary;
      color: $white;
      position: relative;
      border-radius: 24px;

      font-weight: 600;
      font-size: 24px;
      line-height: 140%;
      min-height: 354px;

      &.vaccination__card--collapsed {
        min-height: unset;
        &:after {
          display: none;
        }
      }

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 247px;
        height: 217px;
        background: url(@/assets/images/vaccination/highlight.png);
      }
    }

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      margin-bottom: 24px;
    }

    &-cab {
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      padding: 12px;
      background: $gray-3;
      border-radius: 16px;
      width: fit-content;
      margin-bottom: 32px;
    }

    &-items {
      display: flex;
      flex-direction: column;
      row-gap: 32px;
    }

    &-item {
      &-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 140%;
        margin-bottom: 16px;
      }

      &-content {
        font-weight: 500;
        font-size: 16px;
        line-height: 180%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .vaccination {
    &__tabs {
      flex-wrap: wrap;
      row-gap: 12px;
    }
    &__cabs {
      grid-template-columns: 1fr;
    }
  }
}
</style>
