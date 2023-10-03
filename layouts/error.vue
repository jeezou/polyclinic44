<template>
  <div class="error-page">
    <div class="error-page__content container">
      <img
        class="error-page__content-img"
        src="@/assets/images/404.svg"
        alt="404 img"
      />
      <div class="error-page__content-title">Ой, ошибка</div>
      <NLink class="error-page__content-btn light-btn" to="/"
        >Вернуться на главную</NLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  layout: 'err',
  components: {},
}
</script>

<style lang="scss">
.error-page {
  padding-top: 192px;

  &__content {
    background: $white;
    padding: 84px;
    margin-bottom: 71px !important;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-img {
      max-width: 576px;
      margin-bottom: 27px;
    }

    &-title {
      font-weight: 600;
      font-size: 48px;
      line-height: 57px;
      margin-bottom: 51px;
    }

    &-btn {
      width: fit-content !important;
      padding: 14px 27px !important;
    }
  }
}
</style>
