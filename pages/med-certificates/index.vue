<template>
  <div class="certificates container">
    <bread-crumbs/>
    <div class="certificates__title">Медицинские справки</div>
    <div class="certificates__content">
      <div
        class="certificates__content-item info-card"
        v-for="(item, index) in cards"
        :key="`certificates-item-${index}`"
      >
        <div class="info-card__title">{{ item.address }}</div>
        <div class="info-card__cab" v-if="item.cab">
          {{ item.cab }}
        </div>
        <div
          class="info-card__par"
          v-for="(par, parIndex) in item.items"
          :key="`info-card-${index}-par-${parIndex}`"
        >
          <div class="info-card__par-title">{{ par.title }}</div>
          <div class="info-card__par-content" v-html="par.content"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MedCertificates',
  components: {},
  meta: {
    crumb: 'Медицинские справки',
  },
  data() {
    return {
      cards: [
        // {
        //   address: 'ул. Кременчугская д. 13 к2',
        //   cab: '',
        //   items: [
        //     {
        //       title: 'Пн, ср, пт',
        //       content: 'С 09:30 до 15:30',
        //     },
        //     {
        //       title: 'Вт, чт',
        //       content:
        //         'С 12:00 до 19:00 <br/><li>справки об эпид. окружении</li><li>прививочные карты (ф 063)</li><li>анализы</li><li>ЭЛН(электронные листки нетрудоспособности)</li>',
        //     },
        //   ],
        // },
        // {
        //   address: 'ул. Чайковского д. 73',
        //   cab: '208',
        //   items: [
        //     {
        //       title: 'Пн, ср, пт',
        //       content: 'С 09:30 до 15:30',
        //     },
        //     {
        //       title: 'Вт, чт',
        //       content:
        //         'С 12:00 до 19:00<br/><li>справки об эпид. окружении</li><li>прививочные карты (ф 063)</li><li>анализы</li><li>ЭЛН(электронные листки нетрудоспособности)</li>',
        //     },
        //   ],
        // },
        // {
        //   address: 'ул. Мытнинская д. 25',
        //   cab: '',
        //   items: [
        //     {
        //       title: 'Регистратура',
        //       content:
        //         'С 09:00 до 19:30<br/><li>справки об эпид. окружении</li><li>прививочные карты (ф 063)</li><li>анализы</li><li>ЭЛН(электронные листки нетрудоспособности)</li>',
        //     },
        //   ],
        // },
      ],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {
  },
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/456`)
      res = res.data

      const html = document.createElement('div')
      html.innerHTML = res.acf.cards
      html.querySelectorAll('p').forEach((par) => {
        const txt = par.textContent
        const card = {}
        const arr = txt.split('#')

        card.address = arr[0]

        const cab = arr[1].split('$')[0]
        if (cab[0] === '(' && cab[cab.length - 1] === ')') {
          card.cab = cab.slice(1, -1)
          arr[1] = arr[1].slice(cab.length + 1, arr[1].length)
        }

        card.items = []
        arr[1].split('$').forEach((item) => {
          card.items.push({
            title: item.split('|')[0],
            content: item.split('|')[1],
          })
        })

        // console.log(card)

        this.cards.push(card)
      })
    },
  },
}
</script>

<style lang="scss">
.certificates {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    margin: 24px 0 40px;
  }
}

@media screen and (max-width: 1200px) {
  .certificates {
    &__content {
      grid-template-columns: 1fr 1fr;

      .info-card {
        height: 100%;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .certificates {
    &__content {
      grid-template-columns: 1fr;
    }
  }
}
</style>
