<template>
  <div class="documents-page__wrapper container">
    <bread-crumbs />
    <div class="documents-page">
      <h1 class="documents-page__title section-title">Права пациентов</h1>
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
  name: 'RightsPage',
  components: {},
  meta: {
    crumb: 'Права пациентов',
  },
  data() {
    return {
      cards: [
        // {
        //   title: 'Нормативно-правовые акты',
        //   link: '/about/documents/acts',
        //   img: 'cards-icons/cert.png',
        // },
        // {
        //   title: 'Реквизиты организации',
        //   link: '/about/documents/credentials',
        //   img: 'cards-icons/credentials.png',
        // },
        // {
        //   title: 'Учредительные документы',
        //   link: '/docs/example.docx',
        //   img: 'cards-icons/folder.png',
        //   type: 'download',
        // },
        // {
        //   title: 'Результаты специальной оценки условий труда',
        //   link: '/docs/example.docx',
        //   img: 'cards-icons/attestation.png',
        //   type: 'download',
        // },
      ],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      const res = await this.$axios.get(`${this.$store.state.posts}/301`)
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
    margin: 24px 0 40px;
  }
}
</style>
