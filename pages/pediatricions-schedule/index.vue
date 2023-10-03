<template>
  <div class="ped-page__wrapper container">
    <bread-crumbs />
    <div class="ped-page">
      <h1 class="ped-page__title section-title">
        График работы врачей-педиатров
      </h1>
      <table class="ped-page__table table">
        <thead>
          <th>Дата</th>
          <th>Дежурное учреждение</th>
          <th>Прием ( с 9:00 до 15:00 )</th>
          <th>Вызовы ( с 9:00 до 15:00 )</th>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="`ped-page-table-row-${index}`">
            <td
              v-for="(cell, cellIndex) in row"
              :key="`ped-page-table-row-${index}-cell-${cellIndex}`"
              v-html="cell"
              :class="{ 'td-empty': !cell }"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PediatricionsSchedule',
  components: {},
  meta: {
    crumb: 'График работы врачей-педиатров',
  },
  data() {
    return {
      rows: [
        [
          '30.04.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Мытинская, д.25',
          'Врач-педиатр',
          'Врач-педиатр',
        ],
        [
          '01.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Мытинская, д.25',
          'Врач-педиатр ( каб. 347 )<br/>Врач-хирург ( каб. 424 )<br/>Врач-отолоринголог ( каб. 435 )',
          'Врач-педиатр',
        ],
        [
          '02.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Чайковского, д.73',
          '',
          'Врач-педиатр',
        ],
        [
          '03.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Загородный пр.29',
          '',
          'Врач-педиатр',
        ],
        [
          '07.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Мытинская, д.25',
          'Врач-педиатр ( каб. 343 )',
          'Врач-педиатр',
        ],
        [
          '08.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Чайковского, д.73',
          'Лаборатория:<br/>9:00-14:00 ( каб. 507)<br/>Врач-отолоринголог<br/>9:00-14:00 ( каб. 435 )',
          'Врач-педиатр',
        ],
        [
          '09.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Загородный пр.29',
          '',
          'Врач-педиатры',
        ],
        [
          '10.05.2022',
          'Дежурная поликлиника СПБ ГБУЗ “Городская Поликлиника №44, ДПО” ул.Мытинская, д.25',
          'Врач-педиатр ( каб. 343 )',
          'Врач-педиатр',
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
.ped-page {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 40px;
  }

  &__table {
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
      font-size: 14.0801px;
      line-height: 20px;
    }

    th {
      font-weight: 700;
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
}
</style>
