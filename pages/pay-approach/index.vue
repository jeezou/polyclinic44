<template>
  <div class="pay-approach__wrapper container">
    <bread-crumbs />
    <div class="pay-approach">
      <h1 class="pay-approach__title section-title">Платные услуги</h1>
      <div class="pay-approach__content" v-html="content" v-if="content" />
      <div class="pay-approach__docs">
        <div class="pay-approach__docs-title">Документы для ознакомления</div>
        <div class="pay-approach__docs-grid cards-grid">
          <hoverable-card
            class="pay-approach__docs-grid-item"
            :type="`download`"
            :data="card"
            v-for="(card, index) in docs"
            :key="`pay-approach-card-${index}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayApproach',
  components: {},
  meta: {
    crumb: 'Платные услуги',
  },
  data() {
    return {
      content: null,
      docs: [
        // {
        //   title: 'Постановление Правительства РФ от 4 окт 2012 г.',
        //   img: 'cards-icons/folder.png',
        //   link: '/docs/example.docx',
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
      const res = await this.$axios.get(`${this.$store.state.posts}/240`)
      const content = document.createElement('div')
      content.innerHTML = res.data.content.rendered

      Array.from(content.querySelectorAll('.wp-block-file a'))
        .filter((el) => !el.classList.contains('wp-block-file__button'))
        .forEach((file) => {
          const filename = file.href.split('/')[file.href.split('/').length - 1]
          const extension = /(?:\.([^.]+))?$/.exec(filename)
          this.docs.push({
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

      content.querySelectorAll('.wp-block-file').forEach((el) => el.remove())
      this.content = content.innerHTML
    },
  },
}
</script>

<style lang="scss">
.pay-approach {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 40px;
  }

  &__content {
    background: $white;
    padding: 32px;
    border-radius: 24px;

    h2 {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      margin-bottom: 32px;
    }

    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: $primary;
      margin-bottom: 24px;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      line-height: 32px;
      margin-bottom: 24px;
    }
  }

  &__docs {
    margin-top: 100px;
    padding-top: 100px;
    border-top: 1px solid rgba($gray-2, 0.4);

    &-title {
      font-weight: 600;
      font-size: 36px;
      line-height: 56px;
      margin-bottom: 40px;
    }
  }
}
</style>
