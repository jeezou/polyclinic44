<template>
  <div class="nav-bar__wrapper">
    <div class="alert" v-if="$store.state.isAlert && $route.path === '/'">
      <img
        src="@/assets/images/main-page/close-alert.svg"
        alt="close"
        class="alert__close"
        @click="$store.commit('closeAlert')"
      />
      <div class="alert__inner container">
        <img
          src="@/assets/images/main-page/alert1.png"
          alt="alert img 1"
          class="alert__img1"
        />
        <div class="alert__content">
          <div class="alert__text" @click="onAlertClick">
            У нас есть Лечебно-Оздоровительные мероприятия восстановительного
            лечения для детей!
          </div>
          <NLink to="/rehabilitation" class="alert__btn light-btn"
          >Записаться
          </NLink>
        </div>
        <img
          src="@/assets/images/main-page/alert2.png"
          alt="alert img 2"
          class="alert__img2"
        />
        <img
          src="@/assets/images/main-page/alert3.svg"
          alt="alert img 3"
          class="alert__img3"
        />
      </div>
    </div>
    <div class="nav-bar">
      <div class="nav-bar__left">
        <nuxt-link to="/" class="nav-bar__logo">
          <img
            src="@/assets/images/logo.svg"
            alt="logo"
            class="nav-bar__logo-img"
          />
          <div class="nav-bar__logo-text">
            Детская городская поликлиника № 44
          </div>
        </nuxt-link>
      </div>
      <div class="nav-bar__right">
        <div class="nav-bar__item nav-bar__item--date">
          <div class="nav-bar__item-text">{{ currentDate }}</div>
          <img
            src="@/assets/images/icons/calendar.svg"
            alt="date"
            class="nav-bar__item-icon"
          />
        </div>
        <div
          class="nav-bar__item nav-bar__item--search"
          @click="
            isSearch = !isSearch
            isMenu = false
          "
          :class="{ 'nav-bar__item--search--active': isSearch }"
        >
          <div class="nav-bar__item-text">Поиск</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="nav-bar__item-icon"
          >
            <path
              d="M19 19L16 16"
              stroke="#176DEA"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle
              cx="11.5"
              cy="11.5"
              r="5.5"
              stroke="#176DEA"
              stroke-width="2"
            />
          </svg>
        </div>
        <div
          class="nav-bar__item nav-bar__item--bvi bvi-open"
          @click="
            isMenu = false
            isSearch = false
          "
        >
          <div class="nav-bar__item-text">Версия для слабовидящих</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="nav-bar__item-icon"
          >
            <path
              d="M4 12C4 12 6.90909 6.18182 12 6.18182C17.0909 6.18182 20 12 20 12C20 12 17.0909 17.8182 12 17.8182C6.90909 17.8182 4 12 4 12Z"
              stroke="#176DEA"
              stroke-width="1.45455"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.0002 14.1818C13.2052 14.1818 14.182 13.205 14.182 12C14.182 10.795 13.2052 9.81818 12.0002 9.81818C10.7952 9.81818 9.81836 10.795 9.81836 12C9.81836 13.205 10.7952 14.1818 12.0002 14.1818Z"
              stroke="#176DEA"
              stroke-width="1.45455"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          class="nav-bar__item nav-bar__item--menu"
          @click="
            isMenu = !isMenu
            isSearch = false
          "
          :class="{ 'nav-bar__item--menu--active': isMenu }"
        >
          <div class="nav-bar__item-text">Меню</div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="nav-bar__item-icon"
          >
            <path
              d="M5.4375 7.3125H18.5625M5.4375 17.3125H18.5625H5.4375ZM5.4375 12.3125H18.5625H5.4375Z"
              stroke="#176DEA"
              stroke-width="1.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <aside
      class="menu"
      :class="[
        { 'menu--active': isMenu || $store.state.isMetaMenu },
        { 'menu--alert': $store.state.isAlert && $route.path === '/' },
      ]"
    >
      <div class="menu__header">
        <div class="menu__header-title">
          <div
            class="menu__header-back-wrapper"
            @click="
              isRootMenu = true
              currentIndex = null
            "
            :class="{ 'menu__header-back-wrapper--hidden': isRootMenu }"
          >
            <svg
              class="menu__header-back"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 6.5L8.00001 12M8.00001 12L12.5 17.5M8.00001 12H17.0005"
                stroke="#292C33"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          {{ isRootMenu ? 'Меню' : menu[currentIndex].title }}
        </div>
        <div
          class="menu__header-close"
          @click="
            isMenu = false
            $store.commit('closeMetaMenu')
          "
        >
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
              d="M18.2567 5.74381C18.6673 6.15445 18.6674 6.82024 18.2567 7.23087L7.23114 18.2565C6.82049 18.6671 6.1547 18.6671 5.74406 18.2565C5.33341 17.8458 5.33341 17.18 5.74405 16.7694L16.7696 5.74379C17.1803 5.33315 17.8461 5.33318 18.2567 5.74381Z"
              fill="#292C33"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.2564 18.2562C17.8458 18.6669 17.18 18.6669 16.7694 18.2562L5.74378 7.23065C5.33314 6.82001 5.33314 6.15422 5.74379 5.74357C6.15443 5.33292 6.82022 5.33292 7.23087 5.74357L18.2565 16.7692C18.6671 17.1798 18.6671 17.8456 18.2564 18.2562Z"
              fill="#292C33"
            />
          </svg>
        </div>
      </div>
      <div class="menu__list">
        <div
          class="menu__list-item"
          v-for="(item, index) in currentList"
          :key="`menu-list-item-${index}`"
          @click="onMenuClick(index)"
        >
          <div class="menu__list-item-title">
            {{ item.title }}
          </div>
          <svg
            class="menu__list-item-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.29289 2.79289C5.68342 2.40237 6.31658 2.40237 6.70711 2.79289L11.2071 7.29289C11.5976 7.68342 11.5976 8.31658 11.2071 8.70711L6.70711 13.2071C6.31658 13.5976 5.68342 13.5976 5.29289 13.2071C4.90237 12.8166 4.90237 12.1834 5.29289 11.7929L9.08579 8L5.29289 4.20711C4.90237 3.81658 4.90237 3.18342 5.29289 2.79289Z"
              fill="#292C33"
            />
          </svg>
        </div>
      </div>
      <div class="menu__contacts">
        <div class="menu__contacts-title">Контакты</div>
        <div class="menu__contacts-grid">
          <div class="menu__contacts-grid-item">
            <div class="menu__contacts-grid-item-title">Телефон:</div>
            <div class="menu__contacts-grid-item-line" v-html="phone"/>
          </div>
          <div class="menu__contacts-grid-item">
            <div class="menu__contacts-grid-item-title">Почта:</div>
            <div class="menu__contacts-grid-item-line" v-html="email"/>
          </div>
          <div class="menu__contacts-grid-item">
            <div class="menu__contacts-grid-item-title">Адрес:</div>
            <div class="menu__contacts-grid-item-line" v-html="address"/>
          </div>
          <div class="menu__contacts-grid-item">
            <div class="menu__contacts-grid-item-title">График:</div>
            <div class="menu__contacts-grid-item-line" v-html="schedule"/>
          </div>
        </div>
      </div>
    </aside>
    <div
      class="search"
      :class="[
        { 'search--active': isSearch },
        { 'search--alert': $store.state.isAlert && $route.path === '/' },
      ]"
      v-if="searchLinks"
    >
      <div class="search__inner container">
        <div class="search__header">
          <div class="search__input-wrapper">
            <img
              src="@/assets/images/icons/search.svg"
              alt="srch ico"
              class="search__input-icon"
            />
            <input
              type="text"
              class="search__input"
              placeholder="Что будем искать?"
              v-model="search"
              @keyup.enter="onSearch"
            />
          </div>
          <div class="search__submit" @click="onSearch">Поиск</div>
        </div>
        <!-- <div class="search__links">
          <div class="search__links-title">Популярные запросы</div>
          <div class="search__links-grid">
            <NLink
              :to="link.link"
              class="search__link"
              v-for="(link, index) in searchLinks"
              :key="`search-link-${index}`"
            >
              <div class="search__link-title">{{ link.title }}</div>
              <img
                :src="require(`@/assets/images/${link.img}`)"
                :alt="`link img ${index}`"
                class="search__link-img"
              />
            </NLink>
          </div>
        </div> -->
      </div>
      <div class="search__close" @click="isSearch = false">
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
            d="M18.2567 5.74381C18.6673 6.15445 18.6674 6.82024 18.2567 7.23087L7.23114 18.2565C6.82049 18.6671 6.1547 18.6671 5.74406 18.2565C5.33341 17.8458 5.33341 17.18 5.74405 16.7694L16.7696 5.74379C17.1803 5.33315 17.8461 5.33318 18.2567 5.74381Z"
            fill="#292C33"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.2564 18.2562C17.8458 18.6669 17.18 18.6669 16.7694 18.2562L5.74378 7.23065C5.33314 6.82001 5.33314 6.15422 5.74379 5.74357C6.15443 5.33292 6.82022 5.33292 7.23087 5.74357L18.2565 16.7692C18.6671 17.1798 18.6671 17.8456 18.2564 18.2562Z"
            fill="#292C33"
          />
        </svg>
      </div>
    </div>
    <div
      class="blackout"
      :class="{
        'blackout--active': isMenu || isSearch || $store.state.isMetaMenu,
      }"
      @click="
        isMenu = false
        isSearch = false
        $store.commit('closeMetaMenu')
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  mounted() {
    setTimeout(() => {
      new isvek.Bvi({
        panelFixed: false,
      })
    }, 1000)

    this.getContacts()
  },
  data() {
    return {
      isMenu: false,
      isSearch: false,
      search: '',

      phone: '',
      email: '',
      address: '',
      schedule: '',

      isRootMenu: true,
      searchLinks: [
        // {
        //   title: 'Расписание врачей-педиатров',
        //   img: 'search/1.png',
        //   link: '/pediatricions-schedule',
        // },
        // {
        //   title: 'Поиск вашего участка',
        //   img: 'search/2.png',
        //   link: '/search-location',
        // },
        // {
        //   title: 'Расписание сдачи крови и анализов',
        //   img: 'search/3.png',
        //   link: '/tests-schedule',
        // },
        // {
        //   title: 'Справочная',
        //   img: 'search/4.png',
        //   link: '#',
        // },
      ],

      menu: [
        {
          title: 'О поликлинике',
          link: '#',
          sublist: [
            // {
            //   title: 'О нас',
            //   link: '#',
            // },
            {
              title: 'Сотрудники',
              link: '/about/docs',
            },
            {
              title: 'Администрация',
              link: '/about/docs/main',
            },
            {
              title: 'Целевая подготовка специалистов',
              link: '/about/target-training',
            },
            {
              title: 'Документы',
              link: '/about/documents',
            },
            {
              title: 'История',
              link: '/about/history',
            },
            {
              title: 'Галерея',
              link: '/about/gallery',
            },
          ],
        },
        {
          title: 'Пациентам',
          link: '#',
          sublist: [
            {
              title: 'Правила и сроки госпитализации',
              link: '/diagnostic-center',
            },
            {
              title: 'Права пациентов',
              link: '/patient/rights',
            },
            {
              title: 'Полис ОМС',
              link: '/patient/mhi',
            },
            {
              title: 'Отзывы',
              link: '/patient/reviews',
            },
            {
              title: 'Льготные лекарства ',
              link: '/patient/benefits',
            },
            // {
            //   title: 'Молодежная программа',
            //   link: '/patient/youth',
            // },
            {
              title: 'Диспансеризация',
              link: '/patient/dispensary',
            },
            {
              title: 'Документы',
              link: '/patient/docs',
            },
          ],
        },
        {
          title: 'Сотрудникам',
          link: '/employee',
          sublist: [
            {
              title: 'Квалификация врачей',
              link: '/employee/qualiffication',
            },
            {
              title: 'Вакансии',
              link: '/employee/vacancy',
            },
            {
              title: 'Профсоюз',
              link: '/employee/union',
            },
          ],
        },
        {
          title: 'Платные услуги',
          link: '/pay-approach',
        },
        {
          title: 'Новости',
          link: '/patient/news',
        },
        {
          title: 'Контакты',
          link: '/patient/contacts',
        },
        {
          title: 'Карта сайта',
          link: '/sitemap',
          // external: true,
        },
      ],
    }
  },
  watch: {
    isMenu(val) {
      if (val) document.body.style.overflow = 'hidden'
      else document.body.removeAttribute('style')
    },
    isSearch(val) {
      if (val) document.body.style.overflow = 'hidden'
      else document.body.removeAttribute('style')
    },
    $route() {
      this.isMenu = false
      this.isSearch = false
      this.$store.commit('closeMetaMenu')
    },
    '$store.state.isMetaMenu': function (val) {
      const dict = {
        about: 0,
        patient: 1,
        employee: 2,
      }
      if (val) {
        document.body.style.overflow = 'hidden'
        this.isRootMenu = false
        this.currentIndex = dict[this.$store.state.metaMenuType]
      } else {
        document.body.removeAttribute('style')
        this.$router.replace({query: null})
      }
    },
  },
  computed: {
    currentDate() {
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
      const days = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
      ]
      const date = new Date()
      return `${days[date.getDay() - 1]}. ${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`
    },
    currentList() {
      if (this.isRootMenu) return this.menu
      else return this.menu[this.currentIndex].sublist
    },
  },
  methods: {
    onSearch() {
      if (this.search) {
        this.$router.push({path: '/search', query: {query: this.search}})
        this.search = ''
        this.isSearch = false
      }
    },
    onAlertClick() {
      if (process.client) {
        if (window.innerWidth <= 600) this.$router.push('/rehabilitation')
      }
    },
    onMenuClick(index) {
      if (index < this.menu.length) {
        if (this.menu[index].sublist !== undefined && this.isRootMenu) {
          this.isRootMenu = false
          this.currentIndex = index
        } else if (this.menu[index].sublist === undefined && this.isRootMenu) {
          if (this.menu[index].external)
            window.location.href = this.menu[index].link
          else
            this.$router.push(this.menu[index].link)
          this.isMenu = false
        } else if (
          this.menu[this.currentIndex].sublist !== undefined &&
          !this.isRootMenu
        ) {
          this.$router.push(this.menu[this.currentIndex].sublist[index].link)
          this.isMenu = false
        }
      } else if (this.currentIndex !== null) {
        if (
          this.menu[this.currentIndex].sublist !== undefined &&
          !this.isRootMenu
        ) {
          this.$router.push(this.menu[this.currentIndex].sublist[index].link)
          this.isMenu = false
        }
      }
    },
    async getContacts() {
      let res = await this.$axios.get(`${this.$store.state.posts}/331`)
      res = res.data
      this.phone = res.acf.main.phone
      this.email = res.acf.main.email
      this.schedule = res.acf.main.schedule
      this.address = res.acf.main.address
    },
  },
}
</script>

<style lang="scss">
.alert {
  width: 100%;
  height: 80px;
  background: $primary;
  width: 100vw;
  margin-left: -50px;
  position: relative;

  &__inner {
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  &__img1,
  &__img2 {
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }

  &__img1 {
    margin-left: -80px;
  }

  &__img2 {
    margin-right: -80px;
  }

  &__img3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 100%;
  }

  &__content {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    column-gap: 16px;
  }

  &__btn {
    font-weight: 600;
    font-size: 16px;
    padding: 14px 33px;
    border-radius: 12px;
    width: fit-content;
    height: auto;
    position: relative;
    z-index: 1;

    &:hover {
      background: rgba($white, 0.4);
      // color: $primary;
    }
  }

  &__text {
    font-weight: 600;
    font-size: 20px;
    color: $white;
    position: relative;
    z-index: 1;
  }

  &__close {
    position: absolute;
    right: 59px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all $transition;
    z-index: 2;

    &:hover {
      transform: translateY(-50%) rotate(-180deg);
    }
  }
}

.nav-bar {
  max-width: 1420px;
  width: 100%;
  margin: 0 auto;

  &__wrapper {
    width: 100%;
    background: $white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    padding: 0 50px;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;

    .menu {
      position: fixed;
      right: 0;
      top: 0;
      width: 590px;
      height: var(--app-height);
      padding: 48px 32px;
      background: $white;
      border-radius: 32px 0 0 32px;
      z-index: 10;
      transform: translateX(100%);
      transition: all 0.35s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: scroll;

      &--active {
        transform: translateX(0);
      }

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 24px;
        margin-bottom: 24px;

        &-title {
          font-weight: 600;
          font-size: 28px;
          line-height: 40px;
          display: flex;
          align-items: center;
        }

        &-back {
          &-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            margin-right: 16px;

            cursor: pointer;
            transition: all $transition;

            &:hover {
              background: $gray-3;
              border-radius: 8px;
            }

            &--hidden {
              width: 0;
              margin-right: 0;
            }
          }
        }

        &-close {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: $gray-4;
          border-radius: 8px;
          transition: all $transition;
          cursor: pointer;

          svg {
            transition: all $transition;

            path {
              transition: all $transition;
            }
          }

          &:hover {
            background: $black;

            svg {
              transform: rotate(-90deg);

              path {
                fill: $white;
              }
            }
          }
        }
      }

      &__contacts {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        flex-direction: column;
        justify-content: flex-end;

        &-title {
          font-weight: 600;
          font-size: 28px;
          line-height: 40px;
          margin-bottom: 24px;
        }

        &-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;

          &-item {
            padding: 21px 23px 21px 32px;
            background: $gray-3;
            border-radius: 16px;

            font-weight: 600;
            font-size: 16px;
            line-height: 30px;

            &-title {
              color: $primary;
            }
          }
        }
      }

      &__list {
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
        margin-bottom: 32px;

        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: all $transition;

          &:hover {
            background: $gray-3;
            border-radius: 16px;

            .menu__list-item-icon {
              transform: translateX(-5px);
            }
          }

          &-title {
            font-weight: 600;
            font-size: 18px;
            line-height: 40px;
          }

          &-icon {
            transition: all $transition;
          }
        }
      }
    }

    .search {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      z-index: 11;
      background: $white;
      padding: 40px 0 40px;
      // margin-top: -50px;
      transform: translateY(-100%);
      transition: all 0.6s cubic-bezier(0.42, 0.97, 0.52, 1.2);
      transition: all 0.35s ease;
      border-radius: 0 0 16px 16px;

      &__close {
        position: absolute;
        top: 40px;
        right: 40px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $gray-4;
        border-radius: 8px;
        transition: all $transition;
        cursor: pointer;

        svg {
          width: 24px;
          height: 24px;
          transition: all $transition;

          path {
            transition: all $transition;
          }
        }

        &:hover {
          background: $black;

          svg {
            transform: rotate(180deg);
          }

          svg path {
            fill: $white;
          }
        }
      }

      &--active {
        transform: translateY(0);
      }

      &__header {
        display: flex;
        align-items: center;
        column-gap: 24px;
        // margin-bottom: 32px;
      }

      &__input {
        outline: none;
        border: none;
        background: transparent;
        width: 100%;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        font-family: 'Gilroy';

        &::placeholder {
          color: $gray-2;
        }

        &-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 16px;
          padding: 12px 16px;
          box-shadow: inset 0 0 0 1px $gray-2;
          border-radius: 12px;
        }
      }

      &__submit {
        padding: 14px 54px;
        background: $black;
        border-radius: 12px;
        color: $white;
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        transition: all $transition;
        cursor: pointer;

        &:hover {
          background: rgba($black, 0.9);
        }
      }

      &__links {
        display: flex;
        flex-direction: column;
        row-gap: 24px;

        &-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
        }

        &-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
      }

      &__link {
        background: $sea;
        border-radius: 24px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        transition: all $transition;
        height: 124px;
        cursor: pointer;
        text-decoration: none;
        color: $black;

        &:hover {
          background: $primary;

          .search__link-title {
            color: $white;
          }
        }

        &-img {
          height: 100%;
        }

        &-title {
          padding: 0 0 24px 24px;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          transition: all $transition;
        }
      }
    }

    .blackout {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9;
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s ease;
      cursor: pointer;

      &--active {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  display: flex;
  justify-content: space-between;
  padding: 36px 0;

  &__logo {
    display: flex;
    column-gap: 16px;
    align-items: center;
    text-decoration: none;
    color: $black;

    &-text {
      max-width: 153px;
      font-weight: 600;
      font-size: 16px;
    }
  }

  &__right {
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
  }

  &__item {
    display: flex;
    align-items: center;
    column-gap: 12px;
    font-size: 16px;
    font-weight: 600;
    padding: 12px 20px;
    border-radius: 12px;
    color: $primary;
    background: $secondary;
    transition: all $transition;
    cursor: pointer;

    &:hover {
      background: $primary;
      color: $white;

      .nav-bar__item-icon {
        > * {
          stroke: $white;
        }
      }
    }

    &-icon {
      > * {
        transition: all $transition;
      }
    }

    &--date {
      font-size: 14px;
      background: $gray-3;
      color: $black;
      pointer-events: none;

      &:before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $green;
      }
    }

    &--search,
    &--menu {
      &--active {
        background: $black;

        svg {
          path,
          circle {
            stroke: $white;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1700px) {
  .nav-bar {
    &__wrapper {
      .search {
        &__close {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 1279px) {
  .nav-bar {
    &__item {
      &--date {
        display: none;
      }
    }

    &__wrapper {
      .search {
        border-radius: 0 0 24px 24px;

        &__links {
          display: none;
        }

        &__header {
          margin-bottom: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 990px) {
  .alert {
    &__img1,
    &__img2 {
      position: absolute;
      top: 0;
      margin: 0;
      z-index: 0;
    }

    &__img1 {
      left: -150px;
    }

    &__img2 {
      right: -100px;
    }

    &__close {
      right: 15px;
    }
  }

  .nav-bar {
    padding: 24px 0;

    &__item {
      padding: 12px;
      width: 50px;
      height: 50px;

      &-text {
        display: none;
      }

      &-icon {
        width: 24px;
        height: 24px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .alert {
    &__text {
      font-size: 15px;
      line-height: 120%;
      text-align: left;
    }

    &__btn {
      font-size: 15px;
      padding: 12px 24px;
    }
  }
}

@media screen and (max-width: 600px) {
  .alert {
    margin-left: 0;

    &__img1 {
      left: -150px;
    }

    &__btn {
      display: none;
    }

    &__text {
      text-align: center;
    }

    &__inner {
      max-width: calc(100% - 80px);
    }
  }
  .nav-bar {
    background: $white;
    padding: 24px 16px;

    &__wrapper {
      padding: 0;
      z-index: 9999;

      .blackout {
        top: 98px;
        height: calc(100vh - 98px);
        z-index: -2;
      }

      .search {
        transition: transform 0.35s ease, box-shadow 2s ease;
        box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.1);
        z-index: -1;
        top: 98px;
        background: $gray-3;

        &--alert {
          top: 178px !important;
        }

        &__input {
          &-wrapper {
            background: $white;
          }
        }
      }

      .menu {
        box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.1);
        top: 98px;
        width: 100%;
        height: calc(var(--app-height) - 98px);
        border-radius: 0;
        padding: 24px 16px;

        &--alert {
          height: calc(var(--app-height) - 178px);
          top: 178px;
        }

        &__header {
          &-close {
            display: none;
          }
        }

        &__contacts {
          &-grid {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 478px) {
  .nav-bar {
    &__wrapper {
      .search {
        top: 88px;
        padding: 24px 16px;

        &--alert {
          top: 168px !important;
        }

        &__submit {
          width: 100%;
          text-align: center;
        }

        &__inner {
          margin: 0;
          width: 100%;
          max-width: unset;
        }

        &__header {
          column-gap: 8px;
          flex-direction: column;
          row-gap: 12px;
        }
      }

      .menu {
        top: 88px;
        height: calc(var(--app-height) - 88px);

        &--alert {
          height: calc(var(--app-height) - 168px);
          top: 168px;
        }
      }

      .blackout {
        top: 88px;
        height: calc(var(--app-height) - 88px);
      }
    }

    &__right {
      align-items: center;
      column-gap: 8px;
    }

    &__item {
      width: 40px;
      height: 40px;
      padding: 0;
      justify-content: center;
      align-items: center;

      &-icon {
        width: 24px;
        height: 24px;
      }
    }

    &__logo {
      &-img {
        height: 40px;
      }

      &-text {
        font-weight: 600;
        font-size: 11.2356px;
        line-height: 16px;
      }
    }
  }
}
</style>
