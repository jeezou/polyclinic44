<template>
  <modal-wrapper
    @close="$emit('close')"
    :title="'Вызвать врача на дом'"
    :active="active"
  >
    <template #content>
      <div class="call-modal" v-html="content">
        <!-- <div class="call-modal__par">
          Вызвать врача на дом можно через Единую региональную
          информационно-справочную службу
          <span class="call-modal__highlight">«122»</span>.
        </div>
        <div class="call-modal__par call-modal__highlight">
          Вызовы, поступившие с 8:00 до 14:00 (в выходные и праздничные дни до
          12:00) – учреждение отрабатывает в тот же день. Вызовы, поступившие
          после 14:00 (в выходные и праздничные дни после 12:00) – учреждение
          отрабатывает с 8:00 следующего дня.
        </div>
        <div class="call-modal__par">
          Все обращения фиксируются в электронном журнале и в режиме реального
          времени передаются в поликлиники.
        </div>
        <div class="call-modal__par">
          Статус поданной заявки отображается в СМС-уведомлениях. Первое
          сообщение информирует о том, что поликлиника взяла заявку в работу, а
          второе сообщение – о планируемой дате визита. Если мобильного телефона
          нет, то узнать статус заявки можно, позвонив со стационарного телефона
          на номер <span class="call-modal__highlight">122</span>, нажав в
          голосовом меню <span class="call-modal__highlight">*1</span> или
          озвучив цель обращения «проверить статус».
        </div>
        <div class="call-modal__par">
          Служба работает круглосуточно, в том числе в выходные дни. Звонки на
          номер <span class="call-modal__highlight">122</span> бесплатные для
          стационарных и мобильных телефонов на территории Санкт-Петербурга.
        </div> -->
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
export default {
  name: 'CallModal',
  meta: {
    crumb: 'Вызвать врача на дом',
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
      let res = await this.$axios.get(`${this.$store.state.posts}/393`)
      res = res.data
      this.content = res.content.rendered
    },
  },
}
</script>

<style lang="scss">
.call-modal {
  p {
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    color: $gray-1;
    margin-bottom: 32px;
  }

  &__highlight {
    color: $primary !important;
  }
}
</style>
