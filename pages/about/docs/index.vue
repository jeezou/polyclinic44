<template>
  <div class="docs-page__wrapper">
    <div class="docs-page__header page-header">
      <div class="page-header__inner container">
        <div class="page-header__left">
          <bread-crumbs/>
          <div class="page-header__title">Сотрудники</div>
        </div>
        <div class="page-header__right">
          <img
            src="@/assets/images/page-circle.svg"
            alt="header page circle"
            class="page-header__right-circle"
          />
          <img
            src="@/assets/images/docs-header.png"
            alt="header page docs image"
            class="page-header__right-image"
          />
        </div>
      </div>
    </div>
    <div class="docs-page container">
      <div class="docs-page__title page-subtitle">Категории сотрудников</div>
      <div class="docs-page__grid cards-grid">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`docs-page-hov-card-${index}`"
          :data="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocsPage',
  components: {},
  meta: {
    crumb: 'Сотрудники',
  },
  data() {
    return {
      cards: [
        {
          title: 'Администрация',
          link: '/about/docs/main',
          img: 'docs-page/1.png',
        },
        {
          title: 'Медицинский персонал',
          link: '/about/docs/all',
          img: 'docs-page/2.png',
        },
      ],
    }
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {},
}
</script>

<style lang="scss">
.docs-page {
  margin-bottom: 100px;
  padding-bottom: 100px;
  border-bottom: 1px solid rgba($gray-2, 0.4);

  .docs__title {
    margin: 16px 0 32px;
  }
}
</style>
