<template>
  <div id="app">
    <nav-bar />
    <div class="cookies" :class="{ 'cookies--active': isCookies }">
      <div class="cookies__text">
        Мы здесь не только детей лечим, но и собираем куки
      </div>
      <div
        class="cookies__btn"
        @click="
          $cookies.set('cookies', true, { expires: getNextMonthDate })
          isCookies = false
        "
      >
        Хорошо
      </div>
    </div>
    <Nuxt />
    <!-- <vault-block /> -->
    <div
      class="popup"
      :class="[
        { 'popup--active': $store.state.isPopup },
        `popup--${$store.state.popupStatus}`,
      ]"
    >
      <div class="popup__icon">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 8.99902L9.52205 16.499L6.5 13.499"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="popup__text">{{ $store.state.popupText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sitemap',
  components: {},
  data() {
    return {
      isCookies: false,
    }
  },
  mounted() {
    if (process.client) {
      if (!this.$cookies.get('cookies')) this.isCookies = true
    }

    window.addEventListener('resize', this.appHeight)
    this.appHeight()

    // if (this.$route.path[this.$route.path.length - 1] === '/')
    //   this.$router.push(this.$route.path.slice(0, -1))
  },
  methods: {
    appHeight() {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    },
  },
  computed: {
    getNextMonthDate() {
      const d = new Date()
      return new Date(d.setMonth(d.getMonth() + 1))
    },
  },
}
</script>

<style lang="scss" scoped>
#app{
  height: 100vh;
  box-sizing: border-box;
}

:root {
  --app-height: 100%;
}

.popup {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 24px;
  background: $green;
  border-radius: 8px;
  padding: 0 24px;

  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 20px);

  transition: all $transition;

  &--error {
    background: $red;

    .popup {
      &__icon {
        display: none;
      }
    }
  }

  &__text {
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    color: $white;
  }

  &__icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--active {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0);
  }
}

.cookies {
  position: fixed;
  bottom: 25px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 16px;
  height: 86px;
  background: $white;
  padding: 19px 24px;
  border-radius: 16px;
  box-shadow: 0px 8px 15px rgba(35, 35, 35, 0.15);
  z-index: 3;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, calc(100% + 25px));
  transition: all 0.4s ease;

  &--active {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, 0px);
  }

  &__text {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    white-space: nowrap;
  }

  &__btn {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding: 14px 20px;
    background: $secondary;
    color: $primary;
    transition: all $transition;
    cursor: pointer;
    border-radius: 12px;

    &:hover {
      color: $white;
      background: $primary;
    }
  }
}

@media screen and (max-width: 768px) {
  .cookies {
    width: 90%;
    &__text {
      white-space: unset;
    }
  }
}

@media screen and (max-width: 480px) {
  .cookies {
    width: calc(100% - 32px);
    bottom: 16px;
    height: auto;
    padding: 16px;
    &__text {
      font-size: 14px;
      line-height: 20px;
    }

    &__btn {
      padding: 12px;
      font-size: 14px;
    }
  }
}
</style>
