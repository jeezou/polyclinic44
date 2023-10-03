<template>
  <div class="union-page container">
    <bread-crumbs />
    <div class="union-page__title section-title">Профсоюз</div>
    <div class="union-page__cards cards-grid">
      <hoverable-card
        class="union-page__card"
        v-for="(card, index) in cards"
        :key="`union-page-card-${index}`"
        :data="card"
        :type="card.type"
      ></hoverable-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnionPage',
  components: {},
  meta: {
    crumb: 'Профсоюз',
  },
  data() {
    return {
      cards: [],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      const res = await this.$axios.get(`${this.$store.state.posts}/255`)
      const content = document.createElement('div')
      content.innerHTML = res.data.content.rendered
      Array.from(content.querySelectorAll('.wp-block-file a'))
        .filter((el) => !el.classList.contains('wp-block-file__button'))
        .forEach((file) => {
          const filename = file.href.split('/')[file.href.split('/').length - 1]
          const extension = /(?:\.([^.]+))?$/.exec(filename)
          this.cards.push({
            title: file.textContent,
            link: file.href,
            img:
              extension.find((el) => el === 'odt') ||
              extension.find((el) => el === 'doc') ||
              extension.find((el) => el === 'docx')
                ? 'cards-icons/word.png'
                : extension.find((el) => el === 'ods') ||
                  extension.find((el) => el === 'xls') ||
                  extension.find((el) => el === 'xlsx') ||
                  extension.find((el) => el === 'xlsm') ||
                  extension.find((el) => el === 'xlsb') ||
                  extension.find((el) => el === 'xltx')
                ? 'cards-icons/excel.png'
                : extension.find((el) => el === 'pdf')
                ? 'cards-icons/pdf.png'
                : extension.find((el) => el === 'ppt') ||
                  extension.find((el) => el === 'pptx')
                ? 'cards-icons/ppt.png'
                : 'cards-icons/folder.png',
            type: 'ext',
          })
        })
    },
  },
}
</script>

<style lang="scss">
.union-page {
  padding: 192px 0 100px;
  margin-bottom: 100px;
  border-bottom: 1px solid rgba($gray-2, 0.4);

  &__title {
    margin: 24px 0 64px;
  }
}
</style>
