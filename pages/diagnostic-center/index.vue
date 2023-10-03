<template>
  <div class="diagnostic container">
    <bread-crumbs />
    <div class="diagnostic__title">Консультативно-диагностический центр</div>
    <div class="diagnostic__tabs">
      <div
        class="diagnostic__tab"
        :class="{ 'diagnostic__tab--active': tab.id === currentTab }"
        v-for="(tab, index) in tabs"
        :key="`diagnostic-tab-${index}`"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="diagnostic__content" v-if="Object.keys(tabContent)">
      <div class="diagnostic__content-inner" v-html="tabContent.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiagnosticCenter',
  components: {},
  meta: {
    crumb: 'Консультативно-диагностический центр',
  },
  data() {
    return {
      currentTab: 0,
      tabs: [
        // {
        //   id: 0,
        //   name: 'Основная информация',
        //   content:
        //     '<p class="diagnostic__content-par"><span class="highlight-gray">Консультативно-диагностический центр со стационаром дневногопребывания ДПО № 8 СПб ГБУЗ <br />«Детская поликлиника №44» оказывает плановую медицинскую помощьпациентам от 0 до 18 лет <br />по профилям</span>аллергология-иммунология, гастроэнтерология, педиатрия.</p><p class="diagnostic__content-par"><span class="highlight-blue">В КДЦ возможно оказание медицинской помощи в двух режимах:</span><br />1. Обследование и лечение в условиях стационара дневногопребывания.<br />2. Консультация специалистов Консультативно-диагностического центра.</p><p class="diagnostic__content-par"><span class="highlight-gray">Запись на консультацию и обследование проводится в будние дни<span class="highlight-blue">с 11.00 до 15.00</span> часов по телефонам:</span><br /><span class="highlight-blue">579-32-43</span><span class="highlight-gray">- пациенты аллергологического профиля. </span><br /><span class="highlight-blue">579-32-42</span><span class="highlight-gray"> - пациенты аллергологического и гастроэнтерологического профиля.</span></p><p class="diagnostic__content-par"><span class="highlight-blue">Адрес Консультативно-диагностического центра: ул. Чайковского 73.</span><br /><span class="highlight-gray">Для пациентов аллергологического профиля: 3 этаж, первичноеобращение в 312 кабинет. <br />Для пациентов аллергологического и гастроэнтерологического профиля:4 этаж, первичное обращение в 412 кабинет.</span></p>',
        // },
        // {
        //   id: 1,
        //   name: 'Стационар дневного пребывания',
        //   title:
        //     'При поступлении в стационар дневного пребывания необходимо предоставить: ',
        //   content:
        //     '<p class="diagnostic__content-par highlight-blue">01</p><p class="diagnostic__content-par">Направление на обследование или госпитализацию по форме № 057/у, выданное медицинским  учреждением, к которому прикреплен пациент. Направление должно быть подписано лечащим врачом,  заведующим отделением и иметь три печати: штамп учреждения, печать для справок и личную печать врача.</p><p class="diagnostic__content-par highlight-blue">02</p><p class="diagnostic__content-par">Страховой медицинский полис пациента и двусторонняя копия.</p><p class="diagnostic__content-par highlight-blue">03</p><p class="diagnostic__content-par">Свидетельство о рождении/ паспорт пациента и ксерокопия.</p><p class="diagnostic__content-par highlight-blue">04</p><p class="diagnostic__content-par">СНИЛС пациента и ксерокопия. </p><p class="diagnostic__content-par highlight-blue">05</p><p class="diagnostic__content-par">Паспорт законного представителя пациента и ксерокопия.</p><p class="diagnostic__content-par highlight-blue">06</p><p class="diagnostic__content-par">Справка об отсутствии карантинов из детского сада/школы (взята в последний рабочий день перед госпитализацией)</p><p class="diagnostic__content-par highlight-blue">07</p><p class="diagnostic__content-par">Справка об отсутствии карантина по месту жительства (взята в последний рабочий день перед госпитализацией). </p><p class="diagnostic__content-par highlight-blue">08</p><p class="diagnostic__content-par">Справка о прививках или прививочный сертификат.</p><p class="diagnostic__content-par highlight-blue">09</p><p class="diagnostic__content-par">Справка об отсутствии карантина по месту жительства (взята в последний рабочий день перед госпитализацией).</p><p class="diagnostic__content-par highlight-blue">10</p><p class="diagnostic__content-par">Справка о прививках или прививочный сертификат. </p><p class="diagnostic__content-par highlight-blue">11</p><p class="diagnostic__content-par">Результаты предыдущих обследований и госпитализаций (если проводились)</p><p class="diagnostic__content-par highlight-blue">12</p><p class="diagnostic__content-par">Сменная обувь и пеленка для осмотра</p>',
        // },
        // {
        //   id: 2,
        //   name: 'Аллерголог-иммунолог',
        //   content:
        //     '<p class="diagnostic__content-par">Обращаем внимание, что взятие крови на аллергены возможно только в рамках госпитализации в дневной стационар. При обращении на консультацию аллерголога-иммунолога необходимо предоставить: </p><p class="diagnostic__content-par highlight-blue">01</p><p class="diagnostic__content-par">Направление на консультацию аллерголога-иммунолога по форме № 057/у, выданное медицинским учреждением, к которому прикреплен пациент. Направление должно быть подписано лечащим врачом, заведующим отделением и иметь три печати: штамп учреждения, печать для справок и личную печать врача. При повторных консультациях аллерголога-иммунолога направление необходимо обновлять 1 раз в 3 месяца. </p><p class="diagnostic__content-par highlight-blue">02</p><p class="diagnostic__content-par">Страховой медицинский полис пациента и двусторонняя копия.</p><p class="diagnostic__content-par highlight-blue">03</p><p class="diagnostic__content-par">Свидетельство о рождении/ паспорт пациента и ксерокопия.</p><p class="diagnostic__content-par highlight-blue">04</p><p class="diagnostic__content-par">СНИЛС пациента и ксерокопия. </p><p class="diagnostic__content-par highlight-blue">05</p><p class="diagnostic__content-par">Паспорт законного представителя пациента и ксерокопия.</p><p class="diagnostic__content-par highlight-blue">06</p><p class="diagnostic__content-par">История развития ребенка (форма 112/у) или выписка из нее.</p><p class="diagnostic__content-par highlight-blue">07</p><p class="diagnostic__content-par"> Справка о прививках или прививочный сертификат</p><p class="diagnostic__content-par highlight-blue">08</p><p class="diagnostic__content-par">Справка об отсутствии карантина по месту жительства (взята в последний рабочий день перед госпитализацией).</p><p class="diagnostic__content-par highlight-blue">09</p><p class="diagnostic__content-par">Для пациентов старше 3 лет: клинический анализ крови (действителен 10 дней).</p><p class="diagnostic__content-par highlight-blue">10</p><p class="diagnostic__content-par">Результаты предыдущих обследований и госпитализаций (если проводились).</p><p class="diagnostic__content-par highlight-blue">11</p><p class="diagnostic__content-par">Сменная обувь</p><p class="diagnostic__content-par highlight-blue">12</p><p class="diagnostic__content-par">Пеленка для осмотра</p>',
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
      let res = await this.$axios.get(`${this.$store.state.posts}/451`)
      res = res.data

      Object.keys(res.acf).forEach((key, index) => {
        const tab = res.acf[key]
        this.tabs.push({
          id: index,
          name: tab.name,
          content: tab.content,
        })
      })
    },
  },
  computed: {
    tabContent() {
      const ret = this.tabs.find((el) => el.id === this.currentTab)
      return ret ? ret : {}
    },
  },
}
</script>

<style lang="scss">
.diagnostic {
  padding-top: 192px;

  &__tabs {
    display: flex;
    column-gap: 8px;
    margin-bottom: 48px;
  }

  &__tab {
    padding: 14px 20px;
    background: $white;
    border-radius: 8px;
    transition: all $transition;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;

    &:hover,
    &--active {
      background: $black;
      color: $white;
    }
  }

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    &-inner {
      background: $white;
      padding: 32px;
      border-radius: 24px;

      font-size: 20px;
      font-weight: 500;
      line-height: 140%;
      color: $black;

      > :first-child {
        margin-top: 0;
      }
      > :last-child {
        margin-bottom: 0;
      }
    }

    &-par {
      margin: 32px 0;
    }

    .highlight {
      &-blue {
        color: $primary;
      }

      &-gray {
        color: $gray-1;
      }
    }
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    margin: 24px 0 40px;
  }
}

@media screen and (max-width: 768px) {
  .diagnostic {
    &__title {
      margin: 24px 0 32px;
    }
    &__content {
      &-inner {
        padding: 24px;
        font-size: 16px;

        br {
          display: none;
        }
      }
    }
  }
}
</style>
