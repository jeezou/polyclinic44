<template>
  <div class="mhi-page container">
    <bread-crumbs />
    <div class="mhi-page__title">Полис ОМС</div>
    <div class="mhi-page__content">
      <div class="mhi-page__cards cards-grid">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`mhi-page-card-${index}`"
          :data="card"
          :type="card.type"
        ></hoverable-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MhiPage',
  components: {},
  meta: {
    crumb: 'Полис ОМС',
  },
  data() {
    return {
      cards: [
        {
          link: '/docs/example.docx',
          title: 'Информация по КДЦ',
          type: 'download',
          img: 'mhi-page/1.png',
        },
        {
          link: '/docs/example.docx',
          title: 'Права и обязанности',
          type: 'download',
          img: 'mhi-page/2.png',
        },
        {
          link: '/docs/example.docx',
          title: 'Информация о наличии СМО в ДГ',
          type: 'download',
          img: 'mhi-page/3.png',
        },
        {
          link: '/docs/example.docx',
          title: 'Информация по ОМА',
          type: 'download',
          img: 'mhi-page/4.png',
        },
        {
          link: '/docs/example.docx',
          title: 'ВТБ Медицинское страхование',
          type: 'download',
          img: 'mhi-page/5.png',
        },
        {
          link: '/docs/example.docx',
          title: 'ГСМК',
          type: 'download',
          img: 'mhi-page/6.png',
        },
        {
          link: '/docs/example.docx',
          title: 'Капитал МС',
          type: 'download',
          img: 'mhi-page/7.png',
        },
        {
          link: '/docs/example.docx',
          title: 'МАКС',
          type: 'download',
          img: 'mhi-page/8.png',
        },
        {
          link: '/docs/example.docx',
          title: 'РЕСО',
          type: 'download',
          img: 'mhi-page/9.png',
        },
        {
          link: '/docs/example.docx',
          title: 'СОГАЗ',
          type: 'download',
          img: 'mhi-page/10.png',
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
.mhi-page {
  padding-top: 192px;

  &__content {
    padding-bottom: 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    margin: 24px 0 40px;
  }
}
</style>
