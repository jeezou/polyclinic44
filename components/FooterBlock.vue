<template>
  <footer class="footer">
    <div class="footer__inner-wrapper container">
      <div class="footer__grid footer__grid--top">
        <div class="footer__list footer__list--about">
          <div class="footer__list-title">О поликлинике</div>
          <!-- <nuxt-link to="#" class="footer__list-item">О нас</nuxt-link> -->
          <nuxt-link to="/about/gallery" class="footer__list-item"
          >Галерея
          </nuxt-link
          >
          <nuxt-link to="/about/docs" class="footer__list-item"
          >Сотрудники
          </nuxt-link
          >
          <nuxt-link to="/about/history" class="footer__list-item"
          >История
          </nuxt-link
          >
          <nuxt-link to="/about/documents" class="footer__list-item"
          >Документы
          </nuxt-link
          >
          <nuxt-link to="/about/docs/main" class="footer__list-item"
          >Администрация
          </nuxt-link
          >
          <nuxt-link to="/about/target-training" class="footer__list-item"
          >Целевая подготовка специалистов
          </nuxt-link
          >
        </div>
        <div class="footer__list footer__list--employee">
          <div class="footer__list-title">Сотрудникам</div>
          <nuxt-link to="/employee/qualiffication" class="footer__list-item"
          >Квалификация врачей
          </nuxt-link
          >
          <nuxt-link to="/employee/vacancy" class="footer__list-item"
          >Вакансии
          </nuxt-link
          >
          <nuxt-link to="/employee/union" class="footer__list-item"
          >Профсоюз
          </nuxt-link
          >
          <div class="footer__list footer__list--feedback" @click="isFeedbackModal = true">
            <div class="footer__list-title">Обратная связь</div>
          </div>
          <!-- Yandex.Metrika informer -->
          <a href="https://metrika.yandex.ru/stat/?id=93481516&amp;from=informer"
          target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/93481516/3_0_FFFFFFFF_EFEFEFFF_0_pageviews"
          style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer" data-cid="93481516" data-lang="ru" /></a>
          <!-- /Yandex.Metrika informer -->
        </div>
        <div class="footer__list footer__list--patient">
          <div class="footer__list-title">Пациентам</div>
          <nuxt-link to="/patient/dispensary" class="footer__list-item"
          >Диспансеризация
          </nuxt-link
          >
          <!-- <nuxt-link to="/patient/youth" class="footer__list-item"
            >Молодежная программа</nuxt-link
          > -->
          <nuxt-link to="/patient/mhi" class="footer__list-item"
          >Полис ОМС
          </nuxt-link
          >
          <nuxt-link to="/patient/news" class="footer__list-item"
          >Новости
          </nuxt-link
          >
          <nuxt-link to="/patient/reviews" class="footer__list-item"
          >Отзывы
          </nuxt-link
          >
          <nuxt-link to="/patient/benefits" class="footer__list-item">
            Льготные лекарства
          </nuxt-link>
          <nuxt-link to="/patient/rights" class="footer__list-item">
            Права пациентов
          </nuxt-link>
          <!-- <nuxt-link to="#" class="footer__list-item"> Телемедицина </nuxt-link> -->
          <nuxt-link to="/diagnostic-center" class="footer__list-item">
            Правила и сроки госпитализации
          </nuxt-link>
          <nuxt-link to="/patient/docs" class="footer__list-item">
            Документы
          </nuxt-link>
        </div>
        <div class="footer__list footer__list--prices">
          <div class="footer__list-title">Платные услуги</div>
          <nuxt-link to="/pay-approach" class="footer__list-item"
          >Прайскурант
          </nuxt-link
          >
          <nuxt-link to="/pay-approach" class="footer__list-item"
          >Документация по платным услугам
          </nuxt-link
          >
        </div>
        <div class="footer__list footer__list--contacts">
          <div class="footer__list-title">Контакты</div>
          <nuxt-link to="/patient/contacts" class="footer__list-item"
          >Контакты поликлиники
          </nuxt-link
          >
        </div>
        <div class="footer__list footer__list--map">
          <nuxt-link to="/sitemap" class="footer__list-title">Карта сайта</nuxt-link>
        </div>
      </div>
      <div class="footer__grid footer__grid--bottom">
        <div class="footer__logo">
          <img
            src="@/assets/images/logo-light.svg"
            alt="logo footer"
            class="footer__logo-img"
          />
          <div class="footer__logo-text">
            Детская городская поликлиника № 44
          </div>
        </div>
        <div class="footer__rights">
          <div class="footer__rights-wrapper">
            © {{ (new Date()).getFullYear() }} СПб ГБУЗ "Детская городская поликлиника N44". All Rights
            Reserved.
          </div>
        </div>
        <div class="footer__phone">Телефон: +7 (812) 417-40-22</div>
        <div class="footer__email">Почта: pd44@zdrav.spb.ru</div>
        <div class="footer__time">
          <div class="footer__time-item">Пн-Пт: 8:00 - 20:00</div>
          <div class="footer__time-item">Сб: 09:00 - 15:00</div>
          <div class="footer__time-item">Вск: выходной</div>
        </div>
        <div class="footer__address">
          Адрес: 191144, г. Санкт-Петербург, Мытнинская ул., д.25, литер А
        </div>
      </div>
    </div>
    <div
      class="scroll-top"
      @click="onScrollTop"
      :class="{ 'scroll-top--disabled': !isScrollTop }"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 12.5L12 8.00001M12 8.00001L17.5 12.5M12 8.00001L12 17.0005"
          stroke="#292C33"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
    <modal-review :active="isFeedbackModal" @close="isFeedbackModal = false" type="feedback"/>
  </footer>
</template>

<script>
export default {
  name: 'FooterBlock',
  props: {},
  computed: {},
  mounted() {
    if (process.browser) {
      window.addEventListener('scroll', this.onScroll)
    }
  },
  data() {
    return {
      isScrollTop: false,
      isFeedbackModal: false,
    }
  },
  methods: {
    onScrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    onScroll() {
      const scroll =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scroll > 400) this.isScrollTop = true
      else this.isScrollTop = false
    },
  },
}
</script>

<style lang="scss">
.footer {
  border-radius: 32px 32px 0 0;
  background: $black;

  &__inner-wrapper {
    padding: 82px 0;
  }

  &__grid {
    display: grid;
    color: $white;

    &--top {
      grid-template-areas:
        'about employee patient prices'
        'about employee patient contacts'
        'about employee patient map';

      grid-template-columns: repeat(4, 1fr);
      border-bottom: 1px solid rgba($white, 0.2);
      column-gap: 24px;
      padding-bottom: 48px;
    }

    &--bottom {
      grid-template-areas:
        'logo phone email time'
        'rights address address time';
      grid-template-columns: repeat(4, 1fr);
      margin-top: 32px;
      gap: 16px 24px;
      align-items: center;

      > * {
        padding-right: 24px;
      }
    }
  }

  &__list {
    margin-bottom: 24px;

    &-title {
      font-weight: 500;
      font-size: 20px;
      line-height: 140%;
      margin-bottom: 16px;
      text-decoration: none;
      color: $white;
    }

    &-item {
      font-weight: 500;
      font-size: 16px;
      line-height: 180%;
      opacity: 0.5;
      text-decoration: none;
      color: $white;
      transition: opacity $transition;
      cursor: pointer;
      display: block;

      &:hover {
        opacity: 1;
      }
    }

    &--about {
      grid-area: about;
    }

    &--employee {
      grid-area: employee;
    }

    &--patient {
      grid-area: patient;
    }

    &--prices {
      grid-area: prices;
    }

    &--contacts {
      grid-area: contacts;
    }

    &--map,
    &--feedback {
      grid-area: map;

      .footer__list-title {
        cursor: pointer;
        display: flex;

        &:hover {
          &:after {
            transform: rotate(-30deg);
          }
        }

        &:after {
          display: block;
          content: '';
          width: 32px;
          height: 32px;
          margin-left: 8px;
          background: url('@/assets/images/icons/arrow-blue.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          transition: all $transition;
        }
      }
    }

    &--feedback {
      margin-top: 16px;
    }
  }

  &__logo {
    display: flex;
    grid-area: logo;
    column-gap: 16px;
    border-right: 1px solid rgba($white, 0.2);

    &-text {
      font-weight: 600;
      font-size: 16px;
      line-height: 23px;
      max-width: 153px;
    }
  }

  &__rights {
    grid-area: rights;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    border-right: 1px solid rgba($white, 0.2);
    height: 100%;
    display: flex;
    align-items: flex-end;

    &-wrapper {
      max-width: 221px;
      opacity: 0.5;
    }
  }

  &__phone {
    grid-area: phone;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    border-right: 1px solid rgba($white, 0.2);
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__email {
    grid-area: email;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    border-right: 1px solid rgba($white, 0.2);
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__time {
    grid-area: time;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid rgba($white, 0.2);
    height: 100%;
  }

  &__address {
    grid-area: address;
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
    border-right: 1px solid rgba($white, 0.2);
    height: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
  }

  .scroll-top {
    position: fixed;
    bottom: 100px;
    right: 80px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: $white;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    transition: all $transition;

    &--disabled {
      transform: translateY(20px);
      opacity: 0;
    }

    &:hover {
      background: $black;

      svg path {
        stroke: $white;
      }
    }

    svg {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      path {
        transition: all $transition;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .footer {
    .scroll-top {
      bottom: 32px;
      right: 32px;
    }

    &__grid {
      &--top {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
          'about employee patient'
          'about map patient'
          'contacts prices patient';
      }

      &--bottom {
        grid-template-columns: 0.7fr 1fr 0.8fr;
        grid-template-areas:
          'logo phone time'
          'rights email time'
          'address address time';

        gap: 0;
      }
    }

    &__phone,
    &__email,
    &__time,
    &__address {
      padding: 12px 24px;
    }

    &__logo,
    &__rights {
      border: none;
    }

    &__phone,
    &__email,
    &__address {
      border-left: 1px solid rgba($white, 0.2);
    }

    &__rights {
      padding: 24px 24px 24px 0;
    }

    &__address {
      height: unset;
    }
  }
}

@media screen and (max-width: 990px) {
  .footer {
    &__inner-wrapper {
      padding: 40px 0;
    }

    &__grid {
      &--top {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
          'about patient'
          'employee patient'
          'employee contacts'
          'prices map';
      }

      &--bottom {
        grid-template-columns: 1fr;
        grid-template-areas:
          'phone'
          'email'
          'address'
          'time'
          'logo'
          'rights';
        gap: 24px;

        > * {
          border: none;
          padding: 0;
        }
      }
    }

    &__address {
      max-width: 400px;
    }

    &__phone {
      margin-top: 40px;
    }

    &__phone,
    &__email {
      margin-bottom: 24px;
    }

    &__address {
      margin-bottom: 16px;
    }

    &__time {
      margin-bottom: 24px;
      height: unset;
    }

    &__time {
      row-gap: 16px;
    }
  }
}

@media screen and (max-width: 600px) {
  .footer {
    &__grid {
      &--top {
        grid-template-columns: 1fr;
        grid-template-areas:
          'about'
          'employee'
          'patient '
          'prices'
          'contacts'
          'map';
        padding-bottom: 0;
      }

      &--bottom {
        margin-top: 0;
      }
    }
  }
}
</style>
