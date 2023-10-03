<template>
  <modal-wrapper
    @close="$emit('close')"
    :title="'Запись к врачу'"
    :active="active"
  >
    <template #content>
      <div class="appointment-modal">
        <div class="appointment-modal__subtitle">
          Запись к врачам-педиатрам, врачам-специалистам проводится через:
        </div>
        <div class="appointment-modal__items" v-html="content" v-if="content">
          <!-- <div class="appointment-modal__item">
            <div class="appointment-modal__item-text">1. Сервер портала:</div>
            <a
              href="https://onlinelpu.ru/"
              target="__blank"
              class="appointment-modal__item-link"
              >OnLineLPU.RU</a
            >
          </div>
          <div class="appointment-modal__item">
            <div class="appointment-modal__item-text">
              2. Официальный сайт самозаписи:
            </div>
            <a
              href="https://gorzdrav.spb.ru/"
              target="__blank"
              class="appointment-modal__item-link"
              >WWW.GORZDRAV.SPB.RU</a
            >
          </div>
          <div class="appointment-modal__item">
            <div class="appointment-modal__item-text">
              3. Официальный сайт самозаписи:
            </div>
            <a
              href="https://www.gosuslugi.ru/"
              target="__blank"
              class="appointment-modal__item-link"
              >www.gosuslugi.ru</a
            >
          </div>
          <div class="appointment-modal__item">
            <div class="appointment-modal__item-text">
              4. Инфоматы в холлах детских поликлинических отделений по адресу
              ул. Мытнинская д. 25, лит А и ул. Чайковского, д. 73 для
              самозаписи
            </div>
          </div>
          <div class="appointment-modal__item">
            <div class="appointment-modal__item-text">
              5. Единую региональную информационно-справочную службу «122»
            </div>
          </div>
          <div class="appointment-modal__item">
            <div class="appointment-modal__item-text">
              6. Колл-центр по телефону:
            </div>
            <a
              href="tel:+7 (812)417-40-16"
              class="appointment-modal__item-phone"
              >+7 (812)417-40-16</a
            >
          </div> -->
        </div>
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
export default {
  name: 'AppointmentModal',
  meta: {
    crumb: 'Запись к врачу',
  },
  data() {
    return {
      content: '',
    }
  },
  props: {
    active: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/363`)
      res = res.data
      this.content = res.content.rendered
    },
  },
}
</script>

<style lang="scss">
.appointment-modal {
  &__subtitle {
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: $gray-1;
    margin-bottom: 32px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }

  &__item {
    padding: 24px;
    background: $gray-3;
    border-radius: 24px;

    display: flex;
    flex-direction: column;
    row-gap: 24px;

    font-weight: 500;
    font-size: 18px;
    line-height: 111%;
    color: $gray-1;

    &-link,
    &-phone {
      a {
        font-weight: 600;
        font-size: 24px;
        line-height: 120%;
        color: $primary;
      }
    }

    &-phone {
      a {
        text-decoration: none;
      }
    }
  }
}
</style>
