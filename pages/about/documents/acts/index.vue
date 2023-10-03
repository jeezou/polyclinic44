<template>
  <div class="acts-page__wrapper container">
    <bread-crumbs />
    <div class="acts-page">
      <h1 class="acts-page__title section-title">Нормативные акты</h1>
      <div class="acts-page__grid cards-grid">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`acts-page-card-${index}`"
          :data="card"
          :type="card.type"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActsPage',
  components: {},
  meta: {
    crumb: 'Нормативные акты',
  },
  data() {
    return {
      cards: [
        {
          title: 'Противодействие коррупции',
          link: '/docs/example.docx',
          img: 'cards-icons/money-bag.png',
          type: 'download',
        },
        {
          title: 'Противодействие терроризму',
          link: '/docs/example.docx',
          img: 'cards-icons/mask.png',
          type: 'download',
        },
      ],
    }
  },
  mounted() {},
  beforeUnmount() {},
  methods: {},
}
</script>

<style lang="scss">
.acts-page {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 40px;
  }
}
</style>
