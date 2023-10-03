<template>
  <div class="vacancy-page">
    <div class="vacancy-page__header">
      <div class="vacancy-page__header-inner container">
        <bread-crumbs/>
        <h1 class="vacancy-page__header-title">
          Приглашаем специалистов стать частью сильной команды!
        </h1>
        <p class="vacancy-page__header-subtitle">
          Выбирайте лучшее — совершенствуйтесь, развивайтесь и открывайте новое
          с нашей сильной и дружной командой.
        </p>
        <div class="vacancy-page__header-cards">
          <div class="vacancy-page__header-card">
            <div class="vacancy-page__header-card-num">01</div>
            <div class="vacancy-page__header-card-par">
              Достойная оплата рабочего труда
            </div>
          </div>
          <div class="vacancy-page__header-card">
            <div class="vacancy-page__header-card-num">02</div>
            <div class="vacancy-page__header-card-par">
              Возможность карьерного роста
            </div>
          </div>
          <div class="vacancy-page__header-card">
            <div class="vacancy-page__header-card-num">03</div>
            <div class="vacancy-page__header-card-par">
              Сильные корпоративные традиции
            </div>
          </div>
        </div>
        <div class="vacancy-page__header-bg">
          <img
            class="vacancy-page__header-bg-img"
            src="@/assets/images/vacancy-page/header-bg.png"
            alt="bg"
          />
          <img
            class="vacancy-page__header-bg-circle"
            src="@/assets/images/page-circle.svg"
            alt="bg"
          />
        </div>
      </div>
    </div>
    <div class="vacancy-page__content container">
      <div class="vacancy-page__content-title">Список вакансий</div>
      <div class="vacancy-page__vacancies">
        <div
          class="vacancy-page__vacancy"
          v-for="(vac, index) in vacancies"
          :key="`vacancy-page-vacancy-${index}`"
        >
          <div class="vacancy-page__vacancy-title">{{ vac.title }}</div>
          <div class="vacancy-page__vacancy-li">
            Квалификация: <span>{{ vac.edu }}</span>
          </div>
          <div class="vacancy-page__vacancy-li">
            Характер работы: <span>{{ vac.char }}</span>
          </div>
          <div class="vacancy-page__vacancy-li">
            Количество свободных рабочих мест: <span>{{ vac.num }}</span>
          </div>
          <div class="vacancy-page__vacancy-footer">
            <div class="vacancy-page__vacancy-salary-title">
              Размер оплаты труда:
            </div>
            <div class="vacancy-page__vacancy-salary-num">{{ vac.salary }}</div>
          </div>
        </div>
      </div>
      <div class="vacancy-page__contacts">
        <div class="vacancy-page__contacts-title">Контакты для связи</div>
        <div class="vacancy-page__contacts-cards">
          <div
            class="vacancy-page__contacts-card"
            v-for="(card, index) in contacts"
            :key="`vacancy-page-contact-${index}`"
          >
            <div class="vacancy-page__contacts-card-img"
                 :class="{'vacancy-page__contacts-card-img--noimage' : !card.img}">
              <img :src="card.img ? card.img : require('@/assets/images/noimage.png')" :alt="`contact-img-${index}`"/>
            </div>
            <div class="vacancy-page__contacts-card-content">
              <div class="vacancy-page__contacts-card-name">
                {{ card.name }}
              </div>
              <div class="vacancy-page__contacts-card-post">
                {{ card.post }}
              </div>
              <div class="vacancy-page__contacts-card-phone" v-if="card.phone">
                <div class="vacancy-page__contacts-card-phone-title">
                  Телефон отдела кадров:
                </div>
                <a
                  :href="`tel:${card.phone}`"
                  class="vacancy-page__contacts-card-phone-btn"
                >
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.55356 6.30871C4.74261 5.87644 5.16346 5.54867 5.47588 5.21983C6.37765 4.27097 7.87314 4.40092 8.61489 5.49245L9.35287 6.57868C9.94015 7.44321 9.84717 8.62756 9.13338 9.37859L9.07088 9.44435C8.68823 9.84692 8.49179 10.4001 8.71746 10.9178C9.00461 11.576 9.62982 12.6198 10.9916 14.0529C12.3472 15.4796 13.3428 16.1447 13.9746 16.455C14.4765 16.7011 15.0168 16.4937 15.4083 16.0816L15.4563 16.0312C16.1698 15.2802 17.2947 15.1826 18.1159 15.7994L19.1354 16.5658C20.1736 17.346 20.2973 18.9208 19.3953 19.8701C19.0826 20.1992 18.7706 20.6427 18.3587 20.8402C17.3383 21.3303 13.0509 22.8732 7.83042 17.3795C2.60599 11.8815 4.08661 7.37585 4.55356 6.30871Z"
                      stroke="#176DEA"
                      stroke-width="2"
                    />
                  </svg>
                  {{ card.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vacancy-page__posters">
        <div class="vacancy-page__ticket">
          <div class="vacancy-page__ticket-title">
            Хотите откликнуться на вакансию?
          </div>
          <div class="vacancy-page__ticket-subtitle">
            Если вам стало интересна одна из наших действуйших вакансий, то вы
            можете отправить ваше резюме к нам на почту
          </div>
          <a
            :href="`mailto:${email}`"
            target="_blank"
            class="vacancy-page__ticket-btn"
          >Оставить резюме</a
          >
          <div class="vacancy-page__ticket-bg">
            <img src="@/assets/images/icons/vacancy-ticket.svg" alt="logo"/>
          </div>
        </div>
        <div class="vacancy-page__location">
          <div class="vacancy-page__location-title">
            Адрес проведения собеседований:
          </div>
          <div class="vacancy-page__location-subtitle">
            {{ place.full }}
          </div>
          <a
            :href="place.map"
            target="_blank"
            class="vacancy-page__location-btn light-btn"
          >
            Показать на карте
          </a>
          <div class="vacancy-page__location-bg">
            <img
              src="@/assets/images/vacancy-page/location.png"
              alt="location"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VacancyPage',
  components: {},
  meta: {
    crumb: 'Вакансии',
  },
  data() {
    return {
      place: {
        full: '',
        map: '',
      },
      email: '',
      vacancies: [
        // {
        //   title: 'Врач-аллерголог-иммунолог',
        //   edu: 'Высшее образование, сертификат специалиста',
        //   char: 'Постоянная',
        //   num: '1 свободное место',
        //   salary: 'от 60 тыс. рублей',
        // },
        // {
        //   title: 'Рентгенолаборант',
        //   edu: 'Среднее проф образование, сертификат специалиста',
        //   char: 'Постоянная',
        //   num: '1 свободное место',
        //   salary: 'от 35 тыс. рублей',
        // },
        // {
        //   title: 'Врач-педиатр отделения МПД',
        //   edu: 'Высшее образование, сертификат специалиста',
        //   char: 'Постоянная',
        //   num: '1 свободное место',
        //   salary: 'от 60 тыс. рублей',
        // },
        // {
        //   title: 'Медицинская сестра отделения МПД',
        //   edu: 'Среднее проф образование, сертификат специалиста',
        //   char: 'Постоянная',
        //   num: '1 свободное место',
        //   salary: 'от 40 тыс. рублей',
        // },
        // {
        //   title: 'Медицинская сестра участковая',
        //   edu: 'Среднее проф образование, сертификат специалиста',
        //   char: 'Постоянная',
        //   num: '1 свободное место',
        //   salary: 'от 40 тыс. рублей',
        // },
        // {
        //   title: 'Медицинская сестра процедурной',
        //   edu: 'Среднее проф образование, сертификат специалиста',
        //   char: 'Постоянная',
        //   num: '1 свободное место',
        //   salary: 'от 40 тыс. рублей',
        // },
      ],

      contacts: [
        // {
        //   name: 'Мамина Дания Борисовна',
        //   post: 'Заместитель главного врача по кадрам',
        //   phone: '8 (921) 320-96-34',
        //   img: 'vacancy-page/contact-1.png',
        // },
        // {
        //   name: 'Горшкова Мария Сергеевна',
        //   post: 'Специалист по кадрам',
        //   phone: '8 (812) 417-40-31',
        //   img: 'vacancy-page/contact-2.png',
        // },
      ],
    }
  },
  mounted() {
    if (process.client) {
      this.getData()
    }
  },
  beforeUnmount() {
  },
  methods: {
    getMapsLink(coords) {
      return `https://yandex.ru/maps/?pt=${coords.coords[1]},${coords.coords[0]}&z=20&l=map`
    },
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/168`)
      res = res.data
      // console.log(res)
      this.email = res.acf.email
      const table = document.createElement('div')
      table.innerHTML = res.content.rendered
      this.vacancies = []
      table.querySelectorAll('tbody tr').forEach((el) => {
        const items = Array.from(el.querySelectorAll('td')).map(
          (el) => el.textContent
        )
        this.vacancies.push({
          title: items[0],
          edu: items[1],
          char: items[2],
          num: items[3],
          salary: items[4],
        })
      })
      this.contacts = []
      Object.keys(res.acf.contacts).forEach(async (contact) => {
        let item = await this.$axios.get(
          `${this.$store.state.posts}/${res.acf.contacts[contact].doc}`
        )
        item = item.data
        this.contacts.push({
          name: item.title.rendered,
          post: item.acf.speciality,
          phone: item.acf.phone,
          img: item.acf.avatar.url,
        })
      })

      this.place.full = res.acf.place.full;
      this.place.map = this.getMapsLink(res.acf.place.map.marks[0]);
    },
  },
}
</script>

<style lang="scss">
.vacancy-page {
  margin-bottom: 100px;

  &__title {
    margin: 24px 0 64px;
  }

  &__header {
    background: #ebf3ff;
    padding-top: 192px;

    &-title {
      font-weight: 600;
      font-size: 40px;
      line-height: 56px;
      max-width: 692px;
      margin: 24px 0 32px;
    }

    &-subtitle {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: $gray-2;
      margin-bottom: 48px;
      max-width: 458px;
    }

    &-cards {
      display: flex;
      column-gap: 24px;
      position: relative;
      z-index: 10;
    }

    &-card {
      padding: 24px;
      background: rgba($white, 0.72);
      border-radius: 24px;
      max-width: 334px;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 18px;

      &-num {
        font-weight: 600;
        font-size: 32px;
        line-height: 28px;
        color: $primary;
      }

      &-par {
        font-weight: 600;
        font-size: 16px;
        line-height: 28px;
        max-width: 232px;
      }
    }

    &-inner {
      position: relative;
      padding-bottom: 96px;
      z-index: 0;
    }

    &-bg {
      &-img {
        position: absolute;
        z-index: 1;
        right: 0;
        bottom: 0;
        max-width: 900px;
        width: 46vw;
        transform: translateX(10%);
      }

      &-circle {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 0;
        max-width: 700px;
        width: 40vw;
      }
    }
  }

  &__content {
    padding-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);

    &-title {
      padding: 100px 0 40px;
      font-weight: 600;
      font-size: 32px;
      line-height: 56px;
    }
  }

  &__vacancies {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 100px;
  }

  &__vacancy {
    padding: 32px 40px;
    background: $white;
    border-radius: 16px;

    &-title {
      font-weight: 600;
      font-size: 28px;
      line-height: 160%;
      margin-bottom: 16px;
    }

    &-li {
      font-weight: 500;
      font-size: 14px;
      line-height: 32px;

      span {
        font-weight: 700;
      }
    }

    &-footer {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-salary {
      &-title {
        font-weight: 500;
        font-size: 14px;
        line-height: 32px;
      }

      &-num {
        font-weight: 700;
        font-size: 32px;
        line-height: 32px;
        color: $primary;
      }
    }
  }

  &__contacts {
    border-top: 1px solid rgba($gray-2, 0.4);

    &-title {
      font-weight: 600;
      font-size: 36px;
      line-height: 56px;
      margin: 100px 0 40px;
    }

    &-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    &-card {
      background: $white;
      display: flex;
      column-gap: 24px;
      padding: 24px;
      border-radius: 24px;

      &-img {
        max-width: 235px;
        border-radius: 24px;
        overflow: hidden;

        &--noimage {
          padding: 24px;
        }

        img {
          width: 100%;
        }
      }

      &-name {
        font-weight: 600;
        font-size: 28px;
        line-height: 40px;
        max-width: 250px;
        margin-bottom: 16px;
      }

      &-post {
        font-weight: 600;
        font-size: 20px;
        line-height: normal;
        color: $primary;
        margin-bottom: 24px;
      }

      &-phone {
        display: flex;
        flex-direction: column;
        row-gap: 16px;

        &-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
        }

        &-btn {
          padding: 14px;
          background: $secondary;
          border-radius: 12px;
          display: flex;
          align-items: center;
          column-gap: 12px;
          width: fit-content;
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          color: $primary;
          cursor: pointer;
          text-decoration: none;
          transition: all $transition;

          svg path {
            transition: all $transition;
          }

          &:hover {
            background: $primary;
            color: $white;

            svg {
              path {
                stroke: $white;
              }
            }
          }
        }
      }
    }
  }

  &__posters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 24px;
  }

  &__ticket {
    &-btn {
      padding: 14px 20px;
      color: $primary;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      border-radius: 12px;
      background: $white;
      width: fit-content;
      cursor: pointer;
      transition: all $transition;
      height: auto;
      display: flex;
      text-decoration: none;

      &:hover {
        background: rgba($white, 0.2);
        color: $white;
      }
    }

    &-subtitle {
      opacity: 0.8;
    }
  }

  &__ticket,
  &__location {
    background: $primary;
    padding: 24px;
    color: $white;
    border-radius: 24px;
    position: relative;

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      margin-bottom: 16px;
    }

    &-subtitle {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 32px;
    }

    &-bg {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  &__location {
    background: $white;
    color: $black;

    &-title,
    &-subtitle {
      max-width: calc(100% - 170px);
    }

    &-btn {
      width: fit-content;
      padding: 14px 20px;
      font-size: 16px;
      line-height: 20px;
      height: auto;
      border-radius: 12px;
    }

    &-bg {
      max-width: 226px;
      right: 0;
      top: 0;

      img {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 1280px) {
  .vacancy-page {
    &__vacancies {
      grid-template-columns: 1fr;
    }

    &__contacts {
      &-cards {
        grid-template-columns: 1fr;
      }
    }

    &__posters {
      grid-template-columns: 1fr;
    }
  }
}

@media screen and (max-width: 768px) {
  .vacancy-page {
    &__header {
      &-bg {
        &-img,
        &-circle {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .vacancy-page {
    &__header {
      &-cards {
        grid-template-columns: 1fr;
        display: grid;
        row-gap: 16px;
      }

      &-card {
        max-width: unset;
      }
    }

    &__vacancy {
      padding: 24px;

      &-footer {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 8px;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .vacancy-page {
    &__contacts {
      &-card {
        flex-direction: column;
        row-gap: 16px;

        &-img {
          max-width: unset;
          width: 100%;

          img {
            width: 100%;
          }
        }
      }
    }

    &__location {
      &-bg {
        display: none;
      }

      &-title,
      &-subtitle {
        max-width: unset;
      }
    }
  }
}
</style>
