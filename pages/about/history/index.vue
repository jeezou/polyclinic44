<template>
  <div class="history-page__wrapper container">
    <bread-crumbs/>
    <div class="history-page">
      <h1 class="history-page__title section-title">История</h1>
      <iframe v-if="video" width="560" height="315" :src="`https://www.youtube.com/embed/${video}`"
              title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
      <div class="history-page__content-wrapper">
        <!-- <div class="history-page__content-title">Хронология</div> -->
        <div class="history-page__content" v-html="content" v-if="content"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  components: {},
  meta: {
    crumb: 'История',
  },
  data() {
    return {
      content: null,
      video: "",
    }
  },
  mounted() {
    this.getContent()
  },
  beforeUnmount() {
  },
  methods: {
    async getContent() {
      let res = await this.$axios.get(`${this.$store.state.posts}/307`)
      res = res.data
      console.log(res)
      this.video = this.getEmbedLink(res.acf.video)
      this.content = res.content.rendered
    },
    getEmbedLink(link) {
      return link.split('watch?v=')[link.split('watch?v=').length - 1]
    }
  },
}
</script>

<style lang="scss">
.history-page {

  iframe {
    width: 100%;
    height: 550px;
    margin-bottom: 48px;
    border-radius: 24px;
  }

  &__wrapper {
    padding: 192px 0 100px;
    margin-bottom: 100px;
    border-bottom: 1px solid rgba($gray-2, 0.4);
  }

  &__title {
    margin: 24px 0 64px;
  }

  &__content {
    &-wrapper {
      padding: 32px;
      border-radius: 24px;
      background: $white;
    }

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
}
</style>
