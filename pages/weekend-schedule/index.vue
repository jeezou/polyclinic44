<template>
  <div class="weekend-schedule container">
    <bread-crumbs />
    <div class="weekend-schedule__title">График работы дежурных врачей</div>
    <div class="weekend-schedule__content">
      <div class="weekend-schedule__tabs">
        <div
          class="weekend-schedule__tab"
          v-for="(tab, index) in tabs"
          :key="`weekend-schedule-tab-${index}`"
          @click="currentTab = tab.id"
          :class="{ 'weekend-schedule__tab--active': tab.id === currentTab }"
        >
          {{ tab.name }}
        </div>
      </div>
      <div class="weekend-schedule__grid">
        <client-only>
          <table class="weekend-schedule__table table" v-if="tabs.length">
            <thead v-if="table.head">
              <th v-for="(th, index) in table.head" v-html="th" />
            </thead>
            <tbody v-if="table.body.length">
              <tr
                v-for="(row, index) in table.body"
                :key="`weekend-schedule-table-row-${index}`"
              >
                <td
                  v-for="(cell, cellIndex) in row"
                  :key="`weekend-schedule-table-row-${index}-cell-${cellIndex}`"
                >
                  {{ cell }}
                </td>
              </tr>
            </tbody>
          </table>
        </client-only>
        <div class="weekend-schedule__accident">
          <div class="weekend-schedule__accident-header">
            <div class="weekend-schedule__accident-title">
              Травматологическое отделение
            </div>
            <div class="weekend-schedule__accident-info">
              <div class="weekend-schedule__accident-info-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5 5.5C13.5 4.67157 12.8284 4 12 4C11.1716 4 10.5 4.67157 10.5 5.5V12.5C10.5 13.3284 11.1716 14 12 14C12.8284 14 13.5 13.3284 13.5 12.5V5.5ZM12 20C11.1716 20 10.5 19.3284 10.5 18.5C10.5 17.6716 11.1716 17 12 17C12.8284 17 13.5 17.6716 13.5 18.5C13.5 19.3284 12.8284 20 12 20Z"
                    fill="#292C33"
                  />
                </svg>
              </div>
              <div class="weekend-schedule__accident-info-popup-wrapper">
                <div class="weekend-schedule__accident-info-popup">
                  Порядок оказания медицинской помощи населению по травма-
                  тологическому профилю в учре-ждении организован в соответствии
                  с приказом
                  <span
                    >МЗ РФ № 901н от 12.11.2012 (приложения № 11, 12, 14,
                    15).</span
                  >
                  Медицинская помощь пациентам по профилю травматологическому
                  профилю оказывается в виде первичной неотложной помощи.
                </div>
              </div>
            </div>
          </div>
          <client-only>
            <div
              class="weekend-schedule__accident-content"
              :key="`${accident.address}${accident.phone}${accident.schedule}`"
            >
              <div
                class="weekend-schedule__accident-content-item"
                v-if="accident.address !== ''"
              >
                <div class="weekend-schedule__accident-content-item-name">
                  Адрес
                </div>
                <div
                  class="weekend-schedule__accident-content-item-content weekend-schedule__accident-content-item-content--address"
                  v-html="accident.address"
                />
              </div>
              <div
                class="weekend-schedule__accident-content-item"
                v-if="accident.phone !== ''"
              >
                <div class="weekend-schedule__accident-content-item-name">
                  Номер телефона
                </div>
                <div
                  class="weekend-schedule__accident-content-item-content weekend-schedule__accident-content-item-content--phone"
                >
                  <a :href="`tel:${accident.phone}`">{{ accident.phone }}</a>
                </div>
              </div>
              <div
                class="weekend-schedule__accident-content-item"
                v-if="accident.schedule !== ''"
              >
                <div class="weekend-schedule__accident-content-item-name">
                  Режим работы
                </div>
                <div
                  class="weekend-schedule__accident-content-item-content weekend-schedule__accident-content-item-content--schedule"
                  v-html="accident.schedule"
                ></div>
              </div>
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeekendSchedule',
  components: {},
  meta: {
    crumb: 'График работы дежурных врачей',
  },
  data() {
    return {
      tabs: [],
      currentTab: 0,

      accident: {
        address: '',
        phone: '',
        schedule: '',
      },
    }
  },
  mounted() {
    if (process.client) {
      this.getData()
      this.getSchedule()
    }
  },
  beforeUnmount() {},
  methods: {
    getData() {
      this.$axios.get(`${this.$store.state.posts}/15`).then((res) => {
        const html = document.createElement('div')
        html.innerHTML = res.data.content.rendered
        this.tabs = []
        html.querySelectorAll('.wp-block-group').forEach((block, index) => {
          const table = block.querySelector('.schedule-table')
          this.tabs.push({
            id: index,
            name: block.querySelector('.schedule-table-tab').textContent,
            table: {
              head: Array.from(table.querySelectorAll('th')).map(
                (el) => el.innerHTML
              ),
              body: Array.from(table.querySelectorAll('tbody tr')).map((row) =>
                Array.from(row.querySelectorAll('td')).map((td) => td.innerHTML)
              ),
            },
          })
        })
      })
    },
    getSchedule() {
      this.$axios.get(`${this.$store.state.posts}/25`).then((res) => {
        this.accident.address = res.data.acf.address
        this.accident.phone = res.data.acf.phone
        this.accident.schedule = res.data.acf.schedule
      })
    },
  },
  computed: {
    table() {
      return this.tabs.find((el) => el.id === this.currentTab).table
    },
  },
}
</script>

<style lang="scss">
.weekend-schedule {
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
  }

  &__tab {
    font-weight: 600;
    font-size: 14px;
    line-height: 140%;
    padding: 14px 28px;
    border-radius: 8px;
    color: $black;
    background: $white;
    transition: all $transition;
    user-select: none;
    cursor: pointer;

    &:hover {
      background: $gray-4;
    }

    &--active {
      color: $white;
      background: $black;

      &:hover {
        color: $white;
        background: $black;
      }
    }
  }

  &__table {
    border: none;
    box-shadow: none;
    thead {
      background: $gray-4;
      th {
        font-size: 16px;
        font-weight: 700;
        padding: 14px 16px;
        border: none;

        strong {
          font-weight: 700;
        }
      }
    }

    tbody {
      tr {
        td {
          font-weight: 500;
          font-size: 14px;
          padding: 24px 16px;
          border: none;
        }
      }
    }
  }

  &__grid {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  &__accident {
    padding: 32px;
    background: $white;
    border-radius: 24px;
    height: fit-content;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      font-weight: 600;
      font-size: 28px;
    }

    &-info {
      position: relative;
      width: 48px;
      height: 48px;
      min-width: 48px;
      min-height: 48px;

      &:hover,
      &:focus {
        .weekend-schedule__accident-info {
          &-icon {
            background: $black;

            svg path {
              fill: $white;
            }
          }

          &-popup {
            &-wrapper {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }

      &-icon {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        background: $gray-4;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all $transition;

        svg path {
          transition: all $transition;
        }
      }

      &-popup {
        background: $black;
        border-radius: 16px;
        color: $white;
        font-weight: 500;
        font-size: 12px;
        line-height: 140%;
        padding: 6px 19px 8px;
        position: relative;

        &:after {
          content: '';
          display: inline-block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 7px 0 7px 7px;
          border-color: transparent transparent transparent $black;
          position: absolute;
          top: 22px;
          right: 0;
          transform: translateX(100%);
        }

        span {
          color: $primary;
        }

        &-wrapper {
          position: absolute;
          width: 250px;
          bottom: 0;
          left: 0;
          padding-right: 15px;
          transform: translate(-100%, calc(100% - 48px));
          opacity: 0;
          visibility: hidden;
          transition: all $transition;
        }
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      border-radius: 16px;
      overflow: hidden;
      margin-top: 24px;

      &-item {
        display: flex;

        &-name {
          padding: 14px 16px 21px;
          background: $gray-4;
          min-width: 150px;

          font-weight: 600;
          font-size: 14px;
          line-height: 140%;
        }

        &-content {
          padding: 14px 16px;
          background: $gray-3;
          width: 100%;

          font-weight: 500;
          font-size: 16px;

          &--phone {
            a {
              color: $primary;
              text-decoration: none;
            }
          }

          &--schedule {
            color: $gray-1;
            display: flex;
            flex-direction: column;
            row-gap: 16px;

            a {
              color: $primary;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .weekend-schedule {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}

@media screen and (max-width: 768px) {
  .weekend-schedule {
    &__title {
      font-size: 26px;
      margin: 16px 0 24px;
    }
    &__table {
      thead th,
      tbody tr td {
        font-size: 12px;
        padding: 14px 12px;
      }
    }

    &__grid {
      margin-top: 24px;
    }

    &__tab {
      font-size: 12px;
      padding: 12px 14px;
    }

    &__accident {
      padding: 16px;

      &-title {
        font-size: 22px;
      }

      &-content {
        &-item {
          &-name {
            padding: 12px;
            min-width: 100px;
            max-width: 100px;
          }

          &-content {
            padding: 12px;

            &--phone {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
