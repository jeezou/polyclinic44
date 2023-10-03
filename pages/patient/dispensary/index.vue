<template>
  <div class="documents-page__wrapper container">
    <bread-crumbs />
    <div class="documents-page">
      <h1 class="documents-page__title section-title">Диспансеризация</h1>
      <div class="documents-page__subtitle">
        Представляет собой проводимое с определенной периодичностью необходимое
        обследование лиц, страдающих хроническими заболеваниями, функциональными
        расстройствами, иными состояниями, в целях своевременного выявления,
        предупреждения осложнений, обострений заболеваний, иных состояний, их
        профилактики и осуществления медицинской реабилитации указанных лиц.
      </div>
      <div class="documents-page__grid cards-grid">
        <hoverable-card
          v-for="(card, index) in cards"
          :key="`documents-page-card-${index}`"
          :data="card"
          :type="card.type"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentsPage',
  components: {},
  meta: {
    crumb: 'Диспансеризация',
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
      const res = await this.$axios.get(`${this.$store.state.posts}/236`)
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
.documents-page {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 24px;
  }

  &__subtitle {
    max-width: 693px;
    margin-bottom: 64px;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
  }
}
</style>
