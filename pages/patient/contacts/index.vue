<template>
  <div class="contacts-page container">
    <bread-crumbs />
    <div class="contacts-page__title">Контакты</div>
    <div class="contacts-page__content">
      <div class="contacts-page__main">
        <div class="contacts-page__main-left">
          <div class="contacts-page__main-title">Основные контакты</div>
          <div class="contacts-page__main-content">
            <div
              class="contacts-page__main-item contacts-page__main-item--location contact-item contact-item--location"
            >
              {{ main.address }}
            </div>
            <div
              class="contacts-page__main-item contacts-page__main-item--phone contact-item contact-item--phone"
            >
              {{ main.phone }}
            </div>
            <div
              class="contacts-page__main-item contacts-page__main-item--email contact-item contact-item--email"
            >
              {{ main.email }}
            </div>
          </div>
        </div>
        <div class="contacts-page__main-right">
          <div style="position: relative; overflow: hidden">
            <a
              href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps"
              style="color: #eee; font-size: 12px; position: absolute; top: 0px"
              >Санкт‑Петербург</a
            ><a
              href="https://yandex.ru/maps/2/saint-petersburg/house/mytninskaya_ulitsa_25a/Z0kYdQ9hS0IDQFtjfXVydHtjYQ==/?ll=30.381274%2C59.935705&utm_medium=mapframe&utm_source=maps&z=17.09"
              :style="`color: #eee;
                font-size: 12px;
                position: absolute;
                top: 14px;`"
              >Поликлиника 44</a
            ><iframe
              src="https://yandex.ru/map-widget/v1/-/CCU6qMbcTD"
              width="560"
              height="400"
              frameborder="1"
              allowfullscreen="true"
              style="position: relative"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="contacts-page__table-wrapper">
        <table class="contacts-page__table table">
          <thead>
            <th
              v-for="(th, index) in table.head"
              :key="`contacts-page-table-${index}`"
            >
              {{ th }}
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in table.body"
              :key="`contacts-page-table-row-${index}`"
            >
              <td
                v-for="(cell, cellIndex) in row"
                :key="`contacts-page-table-row-${index}-cell-${cellIndex}`"
              >
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="contacts-page__orgs">
        <div class="contacts-page__orgs-title">
          Контакты организаций в сфере охраны здоровья граждан
        </div>
        <div class="contacts-page__orgs-items">
          <div
            class="contacts-page__orgs-item"
            v-for="(item, index) in orgs"
            :key="`contacts-page-org-${index}`"
          >
            <div class="contacts-page__orgs-item-title">{{ item.title }}</div>
            <div class="contacts-page__orgs-item-contacts">
              <div
                class="contact-item contact-item--location"
                v-if="item.location"
              >
                {{ item.location }}
              </div>
              <div
                :href="`tel:${item.phone}`"
                class="contact-item contact-item--phone"
                v-if="item.phone"
                target="_blank"
              >
                {{ item.phone }}
              </div>
              <a
                :href="`mailto:${item.email}`"
                class="contact-item contact-item--email"
                v-if="item.email"
                target="_blank"
              >
                {{ item.email }}
              </a>
              <a
                class="contact-item contact-item--website"
                :href="`https://www.${item.website}`"
                target="_blank"
                v-if="item.website"
              >
                {{ item.website }}
              </a>
              <div class="contact-item contact-item--person" v-if="item.person">
                {{ item.person }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <accordion-component :maxHeight="200">
        <template #content>
          <div v-html="rospotr" class="contacts-page__acc"></div>
        </template>
      </accordion-component>
      <accordion-component :maxHeight="200">
        <template #content>
          <div v-html="ref" class="contacts-page__acc"></div>
        </template>
      </accordion-component>
      <accordion-component :maxHeight="200" class="contacts-page__acc--last">
        <template #content>
          <div v-html="med" class="contacts-page__acc"></div>
        </template>
      </accordion-component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsPage',
  components: {},
  meta: {
    crumb: 'Контакты',
  },
  data() {
    return {
      main: {
        address: '',
        phone: '',
        email: '',
      },

      rospotr: '',
      ref: '',
      med: '',

      table: {},

      orgs: [],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/331`)
      res = res.data

      this.main.address = res.acf.main.address
      this.main.phone = res.acf.main.phone
      this.main.email = res.acf.main.email

      this.rospotr = res.acf.rospotr
      this.ref = res.acf.ref
      this.med = res.acf.med

      const html = document.createElement('div')
      html.innerHTML = res.content.rendered

      this.table.head = Array.from(
        html.querySelectorAll('#tablepress-5 thead th')
      ).map((el) => el.textContent)

      this.table.body = Array.from(
        html.querySelectorAll('#tablepress-5 tbody tr')
      ).map((el) =>
        Array.from(el.querySelectorAll('td')).map((e) => e.textContent)
      )

      // {
      //     title: 'Единый консультационный центр Роспотребнадзора',
      //     location: '190005, Санкт-Петербург, ул. 3-я Красноармейская, д. 18',
      //     phone: '8-800-555-49-43',
      //     person: 'Кужель Александр Михайлович',
      //   },

      html.querySelectorAll('#tablepress-6 tbody tr').forEach((row) => {
        this.orgs.push({
          title: row.querySelector('.column-1').textContent,
          location: row.querySelector('.column-2').textContent,
          phone: row.querySelector('.column-3').textContent,
          email: row.querySelector('.column-4').textContent,
          website: row.querySelector('.column-5').textContent,
          person: row.querySelector('.column-6').textContent,
        })
      })
    },
  },
}
</script>

<style lang="scss">
.contacts-page {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    margin: 24px 0 40px;
  }

  &__main {
    background: $white;
    border-radius: 24px;
    min-height: 344px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 24px;

    &-content {
      > :last-child {
        margin-bottom: 0;
      }
    }

    &-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 32px;
    }

    &-right {
      border-radius: 24px;
      overflow: hidden;
      > div {
        height: 100%;
      }
      iframe {
        width: 100% !important;
        height: 100% !important;
      }
    }

    &-title {
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
      color: $gray-1;
    }
  }

  &__table {
    margin-bottom: 100px;
    thead {
      // > * {
      //   width: 33.33%;
      // }

      // > :first-child {
      //   width: 45%;
      // }

      // > :nth-child(2),
      // > :nth-child(3) {
      //   width: 27.5%;
      // }
    }

    td {
      border: none;
    }

    tbody {
      > *:not(:last-child) {
        border-bottom: 1px solid rgba(187, 188, 196, 0.5);
      }
    }
  }

  &__orgs {
    &-title {
      margin-bottom: 40px;
      font-weight: 600;
      font-size: 32px;
      line-height: 56px;
    }

    &-items {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    &-item {
      padding: 32px;
      background: $white;
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      row-gap: 32px;

      &-title {
        font-weight: 400;
        font-size: 20px;
        line-height: 32px;
        color: $gray-1;
      }
    }
  }

  &__acc {
    h2,
    h3 {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 24px;
    }

    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    max-width: 832px;
    a {
      display: block;
      text-decoration: none;
      color: $primary;
      margin-bottom: 16px;
    }
    p {
      margin-bottom: 20px;
      color: $gray-1;
      font-weight: 500;
    }
  }
}

@media screen and (max-width: 991px) {
  .contacts-page {
    &__main {
      grid-template-columns: 1fr;

      &-left {
        row-gap: 32px;
      }

      &-right {
        min-height: 250px;
      }
    }

    &__orgs {
      &-items {
        grid-template-columns: 1fr;
      }
    }

    &__table {
      min-width: 700px;
      &-wrapper {
        width: 100%;
        overflow-x: scroll;

        &::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      thead {
        > :first-child {
          width: 25%;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .contacts-page {
    &__main {
      &-left {
        padding: 16px;
      }
    }

    &__orgs {
      &-item {
        padding: 16px;
      }
    }
  }
}
</style>
