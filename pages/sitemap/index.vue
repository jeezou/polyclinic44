<template>
  <footer class="sitemap">
    <div class="sitemap__inner-wrapper container">
      <div class="sitemap__grid sitemap__grid--top">
        <div class="sitemap__list sitemap__list--about">
          <div class="sitemap__list-title">О поликлинике</div>
          <!-- <nuxt-link to="#" class="sitemap__list-item">О нас</nuxt-link> -->
          <nuxt-link to="/about/gallery" class="sitemap__list-item"
          >Галерея
          </nuxt-link
          >
          <nuxt-link to="/about/docs" class="sitemap__list-item"
          >Сотрудники
          </nuxt-link
          >
          <nuxt-link to="/about/history" class="sitemap__list-item"
          >История
          </nuxt-link
          >
          <nuxt-link to="/about/documents" class="sitemap__list-item"
          >Документы
          </nuxt-link
          >
          <nuxt-link to="/about/docs/main" class="sitemap__list-item"
          >Администрация
          </nuxt-link
          >
          <nuxt-link to="/about/target-training" class="sitemap__list-item"
          >Целевая подготовка специалистов
          </nuxt-link
          >
        </div>
        <div class="sitemap__list sitemap__list--employee">
          <div class="sitemap__list-title">Сотрудникам</div>
          <nuxt-link to="/employee/qualiffication" class="sitemap__list-item"
          >Квалификация врачей
          </nuxt-link
          >
          <nuxt-link to="/employee/vacancy" class="sitemap__list-item"
          >Вакансии
          </nuxt-link
          >
          <nuxt-link to="/employee/union" class="sitemap__list-item"
          >Профсоюз
          </nuxt-link
          >
        </div>
        <div class="sitemap__list sitemap__list--patient">
          <div class="sitemap__list-title">Пациентам</div>
          <nuxt-link to="/patient/dispensary" class="sitemap__list-item"
          >Диспансеризация
          </nuxt-link
          >
          <!-- <nuxt-link to="/patient/youth" class="sitemap__list-item"
            >Молодежная программа</nuxt-link
          > -->
          <nuxt-link to="/patient/mhi" class="sitemap__list-item"
          >Полис ОМС
          </nuxt-link
          >
          <nuxt-link to="/patient/news" class="sitemap__list-item"
          >Новости
          </nuxt-link
          >
          <nuxt-link to="/patient/reviews" class="sitemap__list-item"
          >Отзывы
          </nuxt-link
          >
          <nuxt-link to="/patient/benefits" class="sitemap__list-item">
            Льготные лекарства
          </nuxt-link>
          <nuxt-link to="/patient/rights" class="sitemap__list-item">
            Права пациентов
          </nuxt-link>
          <!-- <nuxt-link to="#" class="sitemap__list-item"> Телемедицина </nuxt-link> -->
          <nuxt-link to="/diagnostic-center" class="sitemap__list-item">
            Правила и сроки госпитализации
          </nuxt-link>
          <nuxt-link to="/patient/docs" class="sitemap__list-item">
            Документы
          </nuxt-link>
        </div>
        <div class="sitemap__list sitemap__list--prices">
          <div class="sitemap__list-title">Платные услуги</div>
          <nuxt-link to="/pay-approach" class="sitemap__list-item"
          >Прайскурант
          </nuxt-link
          >
          <nuxt-link to="/pay-approach" class="sitemap__list-item"
          >Документация по платным услугам
          </nuxt-link
          >
        </div>
        <div class="sitemap__list sitemap__list--contacts">
          <div class="sitemap__list-title">Контакты</div>
          <nuxt-link to="/patient/contacts" class="sitemap__list-item"
          >Контакты поликлиники
          </nuxt-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Sitemap',
  layout: 'sitemap',
  props: {},
  computed: {},
}
</script>

<style lang="scss">
.sitemap {
  padding-top: 120px;
  border-radius: 32px 32px 0 0;
  background: $gray-3;

  &__inner-wrapper {
    padding: 82px 0;
  }

  &__grid {
    display: grid;
    color: $black;

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
      font-weight: 600;
      font-size: 20px;
      line-height: 140%;
      margin-bottom: 16px;
      text-decoration: none;
      color: $black;
    }

    &-item {
      font-weight: 500;
      font-size: 16px;
      line-height: 180%;
      opacity: 0.8;
      text-decoration: none;
      color: $black;
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

      .sitemap__list-title {
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
  .sitemap {
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
  .sitemap {
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
  .sitemap {
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
