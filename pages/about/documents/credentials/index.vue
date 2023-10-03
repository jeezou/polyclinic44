<template>
  <div class="cred-page__wrapper container">
    <bread-crumbs />
    <div class="cred-page">
      <h1 class="cred-page__title section-title">
        Основные реквизиты организации по данным и Росстат
      </h1>
      <div class="cred-page__content">
        <div class="cred-page__content-block">
          <div class="cred-page__content-block-title">Основные реквизиты</div>
          <div class="cred-page__content-block-content">
            <div
              class="cred-page__content-block-item"
              v-for="(item, index) in main"
              :key="`cred-page-main-item-${index}`"
            >
              <div class="left">{{ item.name }}</div>
              <div class="center"></div>
              <div class="right">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <div class="cred-page__content-block">
          <div class="cred-page__content-block-title">Сведения Росстата</div>
          <div class="cred-page__content-block-content">
            <div
              class="cred-page__content-block-item"
              v-for="(item, index) in rosstat"
              :key="`cred-page-rosstat-item-${index}`"
            >
              <div class="left">{{ item.name }}</div>
              <div class="center"></div>
              <div class="right">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <a :href="doc" target="_blank" class="cred-page__download light-btn">
        Скачать реквизиты
        <div class="light-btn__icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.294 19.7975C18.5219 19.7979 18.7412 19.8847 18.9076 20.0405C19.074 20.1963 19.1751 20.4094 19.1905 20.6368C19.2059 20.8642 19.1344 21.0889 18.9905 21.2657C18.8466 21.4425 18.641 21.558 18.4152 21.5891L18.294 21.5975H5.69999C5.47196 21.5974 5.25246 21.5108 5.08584 21.3551C4.91922 21.1995 4.8179 20.9863 4.80236 20.7588C4.78681 20.5313 4.85821 20.3064 5.00211 20.1295C5.14601 19.9527 5.35169 19.837 5.57759 19.8059L5.69999 19.7975H18.294ZM12.0048 2.3999C12.2223 2.39991 12.4324 2.47867 12.5963 2.62162C12.7602 2.76457 12.8668 2.96204 12.8964 3.1775L12.9048 3.2999L12.9036 15.5315L16.4628 11.9675C16.6151 11.8146 16.8173 11.7215 17.0325 11.7052C17.2477 11.6889 17.4616 11.7505 17.6352 11.8787L17.736 11.9651C17.8887 12.1176 17.9816 12.3198 17.9977 12.535C18.0138 12.7502 17.952 12.964 17.8236 13.1375L17.7372 13.2383L12.6456 18.3383L12.5616 18.4139L12.4512 18.4847L12.408 18.5099L12.2988 18.5555L12.1548 18.5915L12.0708 18.6011L11.9988 18.6035C11.9383 18.6034 11.878 18.5969 11.8188 18.5843L11.7204 18.5567C11.6068 18.5198 11.5019 18.4602 11.412 18.3815L6.26399 13.2395C6.10254 13.0791 6.00785 12.8635 5.99897 12.6361C5.9901 12.4087 6.06769 12.1864 6.21615 12.0139C6.3646 11.8414 6.57288 11.7316 6.79907 11.7065C7.02525 11.6814 7.25255 11.7429 7.43519 11.8787L7.53599 11.9663L11.1036 15.5267V3.2999C11.1036 3.06121 11.1984 2.83229 11.3672 2.66351C11.536 2.49472 11.7649 2.3999 12.0036 2.3999H12.0048Z"
              fill="#176DEA"
            />
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CredentialsPage',
  components: {},
  meta: {
    crumb: 'Реквизиты организации',
  },
  data() {
    return {
      doc: null,
      main: [
        {
          name: 'ОГРН',
          content: '',
        },
        {
          name: 'ИНН',
          content: '',
        },
        {
          name: 'Дата поставки на учет',
          content: '',
        },
        {
          name: 'Налоговый орган',
          content: '',
        },
      ],

      rosstat: [
        {
          name: 'ОКПО',
          content: '',
        },
        {
          name: 'ОКАТО',
          content: '',
        },
        {
          name: 'ОКТМО',
          content: '',
        },
        {
          name: 'ОКФС',
          content: '',
        },
      ],
    }
  },
  mounted() {
    this.getData()
  },
  beforeUnmount() {},
  methods: {
    async getData() {
      let res = await this.$axios.get(`${this.$store.state.posts}/275`)
      res = res.data
      this.main[0].content = res.acf.details.ogrn
      this.main[1].content = res.acf.details.inn
      this.main[2].content = res.acf.details.date
      this.main[3].content = res.acf.details.tax

      this.rosstat[0].content = res.acf.details.okpo
      this.rosstat[1].content = res.acf.details.okato
      this.rosstat[2].content = res.acf.details.oktmo
      this.rosstat[3].content = res.acf.details.okfc

      this.doc = res.acf.file
    },
  },
}
</script>

<style lang="scss">
.cred-page {
  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 64px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    margin-bottom: 40px;

    &-block {
      padding: 24px;
      background: $white;
      border-radius: 24px;

      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 24px;
      }

      &-content {
        display: flex;
        flex-direction: column;
        row-gap: 16px;
      }

      &-item {
        display: flex;
        column-gap: 8px;

        .left,
        .right {
          white-space: nowrap;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
        }

        .left {
          color: $gray-1;
        }

        .center {
          width: 100%;
          border-bottom: 1px dashed $gray-2;
          margin-bottom: 6px;
        }
      }
    }
  }

  &__download {
    padding: 14px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 12px;
  }
}
</style>
